'use client'

import { Button } from "@/components/ui/button"
import { Mail, Calendar, Coffee, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

const contactOptions = [
  {
    icon: Mail,
    title: "Email Me",
    description: "Send me a message and I'll get back to you within 24 hours",
    action: "hello@lloyddelacruz.com"
  },
  {
    icon: Calendar,
    title: "Schedule a Call",
    description: "Book a 30-minute consultation to discuss your project",
    action: "Book Now"
  },
  {
    icon: Coffee,
    title: "Coffee Chat",
    description: "Let&apos;s meet for coffee and explore collaboration opportunities",
    action: "Let&apos;s Meet"
  }
]

export default function CallToAction() {
  return (
    <div className="w-full max-w-6xl mx-auto py-20">
      {/* Background Effects */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative bg-surface-elevated border border-border/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6"
            >
              <MessageCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Ready to collaborate?</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
            >
              Let&apos;s build something{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient">
                meaningful
              </span>{" "}
              together
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Ready to transform healthcare through data and technology? I&apos;d love to hear about your project 
              and explore how we can create solutions that make a real difference.
            </motion.p>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="p-6 bg-background border border-border/50 rounded-2xl transition-all duration-300 hover:border-primary/20 hover:shadow-lg text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  >
                    <option.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {option.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
                  >
                    {option.action}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="gradient-primary text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 animate-glow px-12 py-6 text-lg"
              >
                <Mail className="mr-3 h-6 w-6" />
                Start a Conversation
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-3"
                >
                  →
                </motion.div>
              </Button>
            </motion.div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Usually responds within 24 hours
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}