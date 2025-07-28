// components/layout/footer.tsx

"use client";

import { Github, Linkedin, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FooterLink = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

function FooterLink({ href, icon: Icon, label }: FooterLink) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex items-center gap-3 p-0 h-11 justify-start",
        "text-gray-300 hover:text-[#016428] hover:bg-transparent",
        "transition-colors duration-200 group"
      )}
      asChild
    >
      <a href={href} className="flex items-center gap-3">
        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        <span>{label}</span>
      </a>
    </Button>
  );
}

export default function Footer() {
  const elsewhereLinks: FooterLink[] = [
    { href: "#", icon: Github, label: "Github" },
    { href: "#", icon: Linkedin, label: "LinkedIn" },
    { href: "#", icon: FileText, label: "Resume" },
  ];

  const contactLinks: FooterLink[] = [
    {
      href: "https://mail.google.com/mail/?view=cm&to=vichuselvaraju@gmail.com",
      icon: MessageCircle,
      label: "Message",
    },
  ];

  const headingFontSize = {
    fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
  };

  return (
    <footer>
      <div className="mx-auto w-full p-4 md:px-[10vw] relative z-10">
        <div className="flex justify-between items-start">
          {/* Left side - Copyright */}
          <div className="hidden md:flex">
            <p
              className="text-white font-semibold"
              style={{ fontSize: "clamp(0.9rem, 1vw, 1.2rem)" }}
            >
              © 2025 Vichu • Portfolio
            </p>
          </div>

          {/* Right side - Link columns */}
          <div
            className="flex w-full md:w-auto justify-between md:justify-start"
            style={{ gap: "clamp(2rem, 4vw, 4rem)" }}
          >
            {/* Elsewhere section */}
            <div>
              <h3
                className="text-white font-semibold mb-4"
                style={headingFontSize}
              >
                Elsewhere
              </h3>
              <div className="flex flex-col">
                {elsewhereLinks.map((link) => (
                  <FooterLink key={link.label} {...link} />
                ))}
              </div>
            </div>

            {/* Contact section */}
            <div>
              <h3
                className="text-white font-semibold mb-4"
                style={headingFontSize}
              >
                Contact
              </h3>
              <div className="flex flex-col">
                {contactLinks.map((link) => (
                  <FooterLink key={link.label} {...link} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
