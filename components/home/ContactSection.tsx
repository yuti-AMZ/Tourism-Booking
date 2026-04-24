"use client";
// Contact section
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
        {/* Left: Contact Info & Intro */}
        <div className="flex-1 mb-10 md:mb-0">
          <h2 className="text-4xl font-extrabold mb-4 text-primary">Contact Us</h2>
          <p className="mb-6 text-muted-foreground text-base">
            We’re here to help you plan your Ethiopian adventure, answer your questions, or just say hello! Reach out and our team will respond within 24–48 hours.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="w-5 h-5 text-primary" />
              <span>info@ethiotour.com</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="w-5 h-5 text-primary" />
              <span>+251 11 123 4567</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Addis Ababa, Ethiopia</span>
            </div>
          </div>
          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-lg text-sm text-primary mb-2">
            <strong>Tip:</strong> You can also connect with us on social media for travel inspiration and updates!
          </div>
        </div>
        {/* Right: Contact Form */}
        <div className="flex-1 w-full max-w-md bg-card rounded-xl shadow-lg p-8 border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="text" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <Input type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            <Input type="text" placeholder="Subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required />
            <textarea placeholder="Message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required className="w-full min-h-[100px] border rounded-md p-2" />
            <Button type="submit" className="w-full flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send
            </Button>
            {sent && <div className="text-green-600 text-center mt-2">Message sent! We’ll get back to you soon.</div>}
          </form>
        </div>
      </div>
    </section>
  );
}
