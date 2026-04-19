"use client";

import { useState } from "react";
// ...existing code...
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section
        className="relative py-16 px-6 text-center text-white"
        style={{
          backgroundImage: "url('/images/ethio landscape.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(7,137,48,0.72) 0%, rgba(252,221,9,0.55) 50%, rgba(218,18,26,0.72) 100%)" }} />
        <div className="relative z-10">
          <p className="text-yellow-300 text-sm font-semibold tracking-widest uppercase mb-2">
            ኢትዮጵያ
          </p>
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-gray-200 max-w-xl mx-auto text-sm">
            We&apos;re happy to help plan your Ethiopian adventure. Send us a message
            and we&apos;ll respond within 24–48 hours.
          </p>
        </div>
      </section>

      <div className="eth-stripe" />

      {/* Main grid */}
      <section className="max-w-5xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10">

        {/* Contact form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

          {sent ? (
            <div className="border border-green-200 bg-green-50 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-lg text-green-800 mb-1">Message Sent!</h3>
              <p className="text-green-700 text-sm">
                Thank you for reaching out. We&apos;ll get back to you within 24–48 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 text-sm text-primary underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Name</label>
                <Input
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Subject</label>
                <Input
                  placeholder="e.g. Trip to Lalibela"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Message</label>
                <textarea
                  rows={6}
                  placeholder="Tell us about your travel plans..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                />
              </div>
              <Button type="submit" className="w-full font-semibold gap-2">
                <span className="w-4 h-4">✉️</span> Send Message
              </Button>
            </form>
          )}
        </div>

        {/* Contact info + map */}
        <aside className="space-y-6">
          <h2 className="text-2xl font-bold">Get in touch</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4 border rounded-2xl p-4 bg-card">
              <div className="bg-primary/10 p-2.5 rounded-xl flex items-center justify-center">
                <span className="w-5 h-5 text-primary text-xl">✉️</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-0.5">Email</p>
                <p className="text-sm font-medium">hello@ethiopia-discovery.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 border rounded-2xl p-4 bg-card">
              <div className="bg-primary/10 p-2.5 rounded-xl flex items-center justify-center">
                <span className="w-5 h-5 text-primary text-xl">📞</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-0.5">Phone</p>
                <p className="text-sm font-medium">+251 935 615 567</p>
                <p className="text-sm font-medium">+251 911 123 456</p>
              </div>
            </div>

            <div className="flex items-start gap-4 border rounded-2xl p-4 bg-card">
              <div className="bg-primary/10 p-2.5 rounded-xl flex items-center justify-center">
                <span className="w-5 h-5 text-primary text-xl">📍</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-0.5">Office</p>
                <p className="text-sm font-medium">Bole, Addis Ababa</p>
                <p className="text-sm text-muted-foreground">Ethiopia</p>
              </div>
            </div>
          </div>

          {/* Embedded map */}
          <div className="rounded-2xl overflow-hidden border h-56">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.7894!3d9.0105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sBole%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </section>

      <div className="eth-stripe" />
    </div>
  );
}
