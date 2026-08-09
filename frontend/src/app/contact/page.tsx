'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Github,
  Linkedin,
} from 'lucide-react'
import { HomeNav } from '@/components/home/HomeNav'
import { SiteFooter } from '@/components/home/SiteFooter'
import { SOCIAL_LINKS } from '@/lib/constants'

const CONTACT_DETAILS = [
  { Icon: Mail, label: 'Email', value: 'lloyd.delacruz@outlook.com', href: 'mailto:lloyd.delacruz@outlook.com', bg: 'var(--plum-soft)', tint: 'var(--plum)' },
  { Icon: Phone, label: 'Phone', value: '604-358-7378', href: 'tel:6043587378', bg: '#d1fae5', tint: 'var(--green)' },
  { Icon: MapPin, label: 'Location', value: 'Vancouver, BC · Remote available', bg: '#fce7f3', tint: 'var(--pink)' },
  { Icon: Clock, label: 'Response time', value: 'Within 24 hours', bg: '#fef3c7', tint: '#b45309' },
]

const EXPERTISE = [
  'AI-native product engineering',
  'Operational intelligence',
  'Healthcare analytics',
  'Workflow orchestration',
  'Full-stack development',
  'Systems design',
]

const SOCIALS = [
  { label: 'GitHub', href: SOCIAL_LINKS.GITHUB, Icon: Github },
  { label: 'LinkedIn', href: SOCIAL_LINKS.LINKEDIN, Icon: Linkedin },
  { label: 'Email', href: 'mailto:lloyd.delacruz@outlook.com', Icon: Mail },
]

const FIELD_CLASS =
  'w-full rounded-xl bg-[var(--cream-2)] px-4 py-3 text-sm text-ink ghair placeholder:text-ink-muted/70 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--plum)]/30'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://formspree.io/f/xpwldjol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="home2 min-h-screen">
      <HomeNav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-[1180px] px-6 pb-10 pt-14 lg:pt-20">
            <span className="anim-rise inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft ghair">
              <span className="anim-pulse h-1.5 w-1.5 rounded-full" style={{ background: 'var(--green)' }} />
              Let&apos;s connect
            </span>

            <h1
              className="anim-rise mt-6 max-w-[20ch] font-display text-[2.5rem] font-extrabold leading-[1.06] text-ink sm:text-[3rem] lg:text-[3.4rem]"
              style={{ animationDelay: '60ms', letterSpacing: '-0.025em' }}
            >
              Tell me what you&apos;re{' '}
              <span className="grad-plum-text">trying to build.</span>
            </h1>

            <p
              className="anim-rise mt-5 max-w-[58ch] text-[1.08rem] leading-[1.7] text-ink-soft"
              style={{ animationDelay: '110ms' }}
            >
              Operational systems, applied AI work, or a healthcare workflow that needs an
              engineer who&apos;s worked the floor — send the details below or reach out directly.
            </p>
          </div>
        </section>

        {/* Contact grid */}
        <section className="mx-auto grid max-w-[1180px] grid-cols-1 gap-6 px-6 pb-16 lg:grid-cols-[1fr_1.15fr]">
          {/* Left: details */}
          <div className="anim-rise flex flex-col gap-6" style={{ animationDelay: '160ms' }}>
            <div className="rounded-2xl bg-white p-7 ghair soft-shadow-sm">
              <h2 className="font-display text-xl font-extrabold text-ink">Contact details</h2>
              <div className="mt-6 flex flex-col gap-5">
                {CONTACT_DETAILS.map(({ Icon, label, value, href, bg, tint }) => {
                  const inner = (
                    <>
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: bg }}>
                        <Icon size={20} style={{ color: tint }} strokeWidth={1.9} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">{label}</p>
                        <p className="mt-0.5 text-sm font-medium text-ink">{value}</p>
                      </div>
                    </>
                  )
                  return href ? (
                    <a key={label} href={href} className="flex items-center gap-4 transition-opacity hover:opacity-80">
                      {inner}
                    </a>
                  ) : (
                    <div key={label} className="flex items-center gap-4">
                      {inner}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-7 ghair soft-shadow-sm">
              <h2 className="font-display text-xl font-extrabold text-ink">Where I can help</h2>
              <ul className="mt-5 grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
                {EXPERTISE.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-ink-soft">
                    <CheckCircle2 size={15} className="shrink-0 text-plum" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl p-7 ghair"
              style={{ background: 'linear-gradient(105deg,#ede9fe 0%,#f5f0fe 45%,#fce7f3 100%)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">Find me on</p>
              <div className="mt-3 flex gap-2">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink-soft ghair transition-colors hover:text-plum"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="anim-rise rounded-2xl bg-white p-7 ghair soft-shadow sm:p-9" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: 'var(--plum)' }}>
                <MessageCircle size={20} />
              </div>
              <h2 className="font-display text-xl font-extrabold text-ink">Send a message</h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">Full name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={FIELD_CLASS}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={FIELD_CLASS}
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-ink">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={FIELD_CLASS}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`${FIELD_CLASS} resize-none`}
                  placeholder="Tell me about your project, idea, or what you're looking to build…"
                />
              </div>

              {submitStatus === 'success' && (
                <div role="status" aria-live="polite" className="flex items-center gap-2 rounded-xl bg-[#d1fae5] px-4 py-3 text-sm font-medium text-[#065f46]">
                  <CheckCircle2 size={16} className="shrink-0" />
                  Message sent — I&apos;ll get back to you within 24 hours.
                </div>
              )}

              {submitStatus === 'error' && (
                <div role="alert" aria-live="assertive" className="flex items-center gap-2 rounded-xl bg-[#fee2e2] px-4 py-3 text-sm font-medium text-[#991b1b]">
                  <AlertCircle size={16} className="shrink-0" />
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow-sm transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                style={{ background: 'var(--plum)' }}
              >
                <Send size={15} className={isSubmitting ? 'animate-pulse' : 'transition-transform group-hover:translate-x-0.5'} />
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>

              <p className="text-xs text-ink-muted">
                Prefer email?{' '}
                <a href="mailto:lloyd.delacruz@outlook.com" className="font-medium text-plum hover:text-[var(--plum-deep)]">
                  lloyd.delacruz@outlook.com
                </a>
              </p>
            </form>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mx-auto max-w-[1180px] px-6 pb-16">
          <div className="flex flex-col items-start gap-4 rounded-3xl bg-white px-9 py-10 ghair soft-shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-[1.75rem]">
                Curious what I&apos;ve been building?
              </h2>
              <p className="mt-2 text-sm text-ink-soft">Take a look at recent systems and product work.</p>
            </div>
            <Link
              href="/work"
              className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-[var(--cream-2)] px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-white"
            >
              See my work
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
