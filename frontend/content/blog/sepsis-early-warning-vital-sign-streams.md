---
title: "Building a Sepsis Early-Warning Signal from Vital-Sign Streams"
excerpt: "A builder's notebook for turning the noisy fire-hose of bedside monitors into a single, sober alert — the features that earned their keep, the ones that didn't, and the part nobody warns you about."
date: "2026-03-14"
author: "Lloyd Dela Cruz"
category: "data-science"
tags: ["Data Science", "Healthcare", "Sepsis", "Time Series", "Python"]
readTime: "13 min read"
featured: false
image: "/images/blog/sepsis-signal.jpg"
video: false
interactive: false
gradient: "from-emerald-600 via-teal-600 to-cyan-800"
published: true
---

# Building a Sepsis Early-Warning Signal from Vital-Sign Streams

Sepsis is the boring failure mode that kills people. By the time the patient is obviously septic, the window where intervention is cheap is closed. Every paper on early-warning scores is trying to push that window back by hours, not days — and the hours matter.

This is a notebook from a project I worked on quietly through the back end of last year: a sepsis early-warning model trained on multi-parameter bedside streams. I'm not going to publish the model. I am going to walk through the parts that were genuinely useful and the parts that looked useful in slides and weren't.

<figure>
<svg viewBox="0 0 720 270" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vital signs streams with rising risk score crossing a warning threshold">
  <defs>
    <linearGradient id="riskShade" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#f87060" stop-opacity="0.25"/>
      <stop offset="1" stop-color="#f87060" stop-opacity="0.0"/>
    </linearGradient>
  </defs>

  <text x="20" y="24" font-family="ui-sans-serif,system-ui" font-size="13" font-weight="700" fill="#1f1a2e">Bedside streams &amp; sepsis risk score (24 h window)</text>

  <!-- axes -->
  <line x1="50" y1="60" x2="50" y2="240" stroke="rgba(28,22,46,0.14)"/>
  <line x1="50" y1="240" x2="700" y2="240" stroke="rgba(28,22,46,0.14)"/>

  <!-- threshold band -->
  <rect x="50" y="80" width="650" height="40" fill="url(#riskShade)"/>
  <line x1="50" y1="100" x2="700" y2="100" stroke="#f87060" stroke-dasharray="4 4" opacity="0.8"/>
  <text x="56" y="76" font-family="ui-sans-serif,system-ui" font-size="11" font-weight="700" fill="#f87060">Alert threshold</text>

  <!-- heart rate (blue) -->
  <polyline fill="none" stroke="#3b82f6" stroke-width="2"
    points="50,200 110,198 170,192 230,188 290,176 350,160 410,148 470,134 530,128 590,124 650,120 700,118"/>
  <text x="60" y="216" font-family="ui-sans-serif,system-ui" font-size="11" fill="#3b82f6">HR</text>

  <!-- respiratory rate (green) -->
  <polyline fill="none" stroke="#10b981" stroke-width="2"
    points="50,222 110,220 170,216 230,212 290,202 350,190 410,178 470,168 530,160 590,154 650,150 700,148"/>
  <text x="60" y="232" font-family="ui-sans-serif,system-ui" font-size="11" fill="#10b981">RR</text>

  <!-- risk score (plum) -->
  <polyline fill="none" stroke="#6d28d9" stroke-width="3"
    points="50,225 110,220 170,210 230,196 290,178 350,156 410,134 470,116 530,98 590,86 650,78 700,72"/>

  <!-- alert marker -->
  <circle cx="530" cy="98" r="6" fill="#6d28d9"/>
  <text x="540" y="94" font-family="ui-sans-serif,system-ui" font-size="11" font-weight="700" fill="#6d28d9">alert · 4–6 h before clinical recognition</text>

  <!-- x labels -->
  <text x="50"  y="258" font-family="ui-sans-serif,system-ui" font-size="11" fill="#8a849b">t-24h</text>
  <text x="370" y="258" font-family="ui-sans-serif,system-ui" font-size="11" fill="#8a849b">t-12h</text>
  <text x="690" y="258" font-family="ui-sans-serif,system-ui" font-size="11" fill="#8a849b">now</text>
</svg>
<figcaption><em>The risk curve, not any single vital, is what crosses the alert line. Individual streams almost never do — that's the whole point.</em></figcaption>
</figure>

## The naive baseline

Every sepsis project starts the same way: pull SIRS, pull qSOFA, pull early-warning scores like NEWS2, and see what you get. The honest answer is: not bad. NEWS2 alone catches a meaningful share of cases with no machine learning at all. If your project can't beat NEWS2 by a clear margin, you don't have a project — you have a worse version of NEWS2 with more dependencies.

I anchored the whole effort to that baseline. It kept the team grounded every time a fancy feature got proposed.

## The data, honestly

The reality of vital-sign data is that it is a lie until you clean it.

- Half the temperature readings are oral thermometers logged thirty seconds after the patient drank water.
- Heart rate from finger pulse oximeters is wrong any time the patient moved.
- Blood pressure is missing for hours and then taken three times in five minutes because someone was worried.
- Manual entries lag the event by anywhere from one to forty minutes.

You cannot model your way out of this. You have to build a cleaning layer that knows what each device's failure mode looks like and refuses to feed garbage forward.

```python
def clean_vitals(stream: VitalsStream) -> VitalsStream:
    return (
        stream
        .drop_where(device_artifact=True)            # spo2 dropouts, BP cuff inflation noise
        .clip_to_physiological_range()               # HR 30–220, RR 4–60, etc.
        .smooth(window="5min", method="median")      # noise, not signal
        .resample_to("1min")                         # one cadence everywhere
        .impute(strategy="last_observation_carried", max_gap="10min")
    )
```

Boring. Indispensable. The single largest improvement in the model came not from changing the model but from being stricter about what we let through this function.

## Features that earned their keep

Most of the value lived in a small set of features, all of them derivatives, not levels.

- **Trend slopes over rolling windows.** A heart rate of 105 is not interesting. A heart rate that has climbed 22 bpm in the last six hours is very interesting.
- **Cross-vital divergence.** Specifically the shock index (HR / SBP). Sepsis often shows up here before it shows up anywhere else.
- **Variability collapse.** Heart-rate variability goes down before any single vital becomes alarming. This is in the literature and it held up in our data.
- **Time since last fluid bolus.** Not a vital, but available, and it shifts how you should read everything downstream.

## Features that looked good in slides and weren't

- **Temperature.** Septic patients are febrile in textbooks and afebrile in real wards. Temperature added almost nothing once HR and RR trends were in.
- **WBC delta.** Lab values come in too sparsely to drive an early-warning signal. By the time the lab is back, the patient looks septic on the vitals.
- **Deep nets trained end-to-end on raw streams.** They beat the baseline in the lab and lost to a tuned gradient-boosted model in production, every time. The gradient-boosted model was also dramatically easier to debug when it was wrong.

## The threshold conversation nobody warns you about

The hardest part of the project wasn't the model. It was the threshold meeting.

A sepsis alert at 90% sensitivity and 70% specificity sounds great until you do the math on a 24-bed ward. That's seven false alarms per shift. Clinicians will ignore the seventh one. They might ignore the third.

We ended up modelling alerts as a *budget*: how many can a single nurse absorb in a shift before the next one stops working? The answer at this hospital was around two. Everything about the threshold flowed from that constraint, not from the ROC curve.

> A model that fires three times a shift is a worse model than one that fires once, even if its AUC is higher. The denominator is human attention, and you can't enlarge it.

## What the alert actually says

Late in the project we stopped showing a number. The clinicians did not want a risk score. They wanted three things:

1. **Why now.** Which features moved, in which direction, in the last few hours.
2. **What to check.** The two or three downstream things that, if the model is right, would also be true.
3. **An out.** A one-click "not septic — here's why" that retrains the on-ward feedback loop without burying it in a ticket queue.

When we added those three, adoption stopped being a project. It started being normal.

## What's next

The next version of this kind of system will not be a better classifier. It will be a better *conversation*. Something that says "the trend on this patient looks like the early phase of sepsis in patients who shared these features — what do you think?" and lets the clinician push back with one sentence and learn from the push-back. That's an LLM-shaped problem sitting on top of a classical-ML-shaped problem. Both layers have to be good. Neither one is enough alone.

The boring part of the work — the cleaning, the threshold, the explanation — is still where the win is.

---

*If you want to see the same patterns applied to revenue and ops data instead of vitals, the [data-science archive](/blog) has earlier notebooks on predictive maintenance and patient flow.*
