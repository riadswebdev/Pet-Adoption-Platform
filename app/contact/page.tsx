import { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@heroui/react";

export const metadata: Metadata = {
  title: "Contact Us | PetAdopt",
  description:
    "Get in touch with the PetAdopt team for any questions about adoption or listings.",
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-foreground mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
            Have questions about adopting a pet, listing an animal, or anything
            else? Our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6 lg:col-span-1">
            {[
              {
                icon: <MapPin size={22} className="text-[#FF6B35]" />,
                title: "Our Office",
                lines: ["123 Adoption Street", "Rescue City, NY 10001"],
              },
              {
                icon: <Phone size={22} className="text-[#FF6B35]" />,
                title: "Phone",
                lines: ["+1 (555) 123-4567", "Mon–Fri, 9am–5pm EST"],
              },
              {
                icon: <Mail size={22} className="text-[#FF6B35]" />,
                title: "Email",
                lines: ["hello@petadopt.com", "support@petadopt.com"],
              },
              {
                icon: <Clock size={22} className="text-[#FF6B35]" />,
                title: "Hours",
                lines: ["Mon–Fri: 9am – 6pm", "Sat: 10am – 4pm"],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 bg-foreground/5 border border-foreground/10 p-5 rounded-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-foreground/60 text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-foreground/5 border border-foreground/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Send us a Message
            </h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-sm font-medium text-foreground/80 mb-2"
                    htmlFor="contact-name"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-foreground/80 mb-2"
                    htmlFor="contact-email"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-foreground/80 mb-2"
                  htmlFor="contact-subject"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="How can we help?"
                  className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-foreground/80 mb-2"
                  htmlFor="contact-message"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  placeholder="Tell us about your inquiry..."
                  className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition resize-none"
                  required
                ></textarea>
              </div>
              <Button
                type="submit"
                className="bg-[#FF6B35] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#FF3F6C] transition-colors flex items-center gap-2"
              >
                <Send size={18} />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
