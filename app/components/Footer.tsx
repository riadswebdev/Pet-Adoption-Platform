"use client";

import { Button } from "@heroui/react";
import { Mail, MapPin, PawPrint, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="bg-background border-t border-foreground/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <PawPrint className="h-8 w-8 text-[#FF6B35]" />
              <span className="font-bold text-xl text-gradient">PetAdopt</span>
            </Link>
            <p className="text-foreground/70 text-sm mb-4">
              Connecting loving families with pets in need. We believe every pet
              deserves a safe and happy home.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-foreground/50 hover:text-[#FF6B35] transition-colors"
              >
                <CiFacebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-foreground/50 hover:text-[#FF6B35] transition-colors"
              >
                <CiTwitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-foreground/50 hover:text-[#FF6B35] transition-colors"
              >
                <CiInstagram size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/explore"
                  className="text-foreground/70 hover:text-[#FF6B35] text-sm transition-colors"
                >
                  Explore Pets
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-foreground/70 hover:text-[#FF6B35] text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-foreground/70 hover:text-[#FF6B35] text-sm transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-foreground/70 hover:text-[#FF6B35] text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-foreground/70">
                <MapPin size={18} className="text-[#FF6B35] shrink-0" />
                <span>123 Adoption Street, Rescue City, 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/70">
                <Phone size={18} className="text-[#FF6B35] shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/70">
                <Mail size={18} className="text-[#FF6B35] shrink-0" />
                <span>hello@petadopt.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">
              Newsletter
            </h3>
            <p className="text-foreground/70 text-sm mb-4">
              Subscribe to get updates on new pets looking for homes.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-foreground/5 border border-foreground/10 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6B35]"
                required
              />
              <Button
                type="submit"
                className="bg-[#FF6B35] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#FF3F6C] transition-colors text-sm"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/50 text-sm mb-4 md:mb-0">
            &copy; {currentYear} PetAdopt. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link
              href="/privacy"
              className="text-foreground/50 hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-foreground/50 hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
