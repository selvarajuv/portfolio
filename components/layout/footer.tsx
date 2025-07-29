// components/layout/footer.tsx

"use client";

import React from "react";
import { Github, Linkedin, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMisc } from "@/hooks/use-misc";
import { MiscItem } from "@/types/misc";
import { cn } from "@/lib/utils";

// Types
type FooterLink = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

// Constants
const COPYRIGHT_TEXT = "© 2025 Vichu • Portfolio";
const COPYRIGHT_FONT_SIZE = { fontSize: "clamp(0.9rem, 1vw, 1.2rem)" };
const HEADING_FONT_SIZE = { fontSize: "clamp(1rem, 1.2vw, 1.5rem)" };
const CONTAINER_GAP = { gap: "clamp(2rem, 4vw, 4rem)" };

export default function Footer() {
  const { miscs, loading, error } = useMisc();

  // Loading state
  if (loading) return <FooterSkeleton />;

  // Error state
  if (error) return <FooterError />;

  // Empty state
  if (!miscs || miscs.length === 0) return <FooterEmpty />;

  // Success state
  return <FooterContent miscData={miscs[0]} />;
}

// ===== State Components =====

function FooterSkeleton() {
  return (
    <FooterWrapper>
      {/* Copyright skeleton */}
      <FooterCopyright />

      {/* Links skeleton */}
      <div
        className="flex w-full md:w-auto justify-between md:justify-start animate-pulse"
        style={CONTAINER_GAP}
      >
        {/* Elsewhere section skeleton */}
        <div>
          <div className="h-5 w-20 bg-gray-500/20 rounded mb-4" />
          <div className="space-y-3">
            {[16, 20, 16].map((width, i) => (
              <div
                key={i}
                className={`h-4 w-${width} bg-gray-500/10 rounded`}
              />
            ))}
          </div>
        </div>

        {/* Contact section skeleton */}
        <div>
          <div className="h-5 w-16 bg-gray-500/20 rounded mb-4" />
          <div className="h-4 w-20 bg-gray-500/10 rounded" />
        </div>
      </div>
    </FooterWrapper>
  );
}

function FooterError() {
  return (
    <FooterWrapper>
      <FooterCopyright />
      <div className="text-red-400 text-sm">Failed to load footer links</div>
    </FooterWrapper>
  );
}

function FooterEmpty() {
  return (
    <FooterWrapper>
      <FooterCopyright />
      <div className="text-gray-400 text-sm">No links available</div>
    </FooterWrapper>
  );
}

// ===== Main Content Component =====

function FooterContent({ miscData }: { miscData: MiscItem }) {
  const elsewhereLinks: FooterLink[] = [
    {
      href: miscData?.githubLink || "#",
      icon: Github,
      label: "Github",
    },
    {
      href: miscData?.linkedinLink || "#",
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: miscData?.resume || "#",
      icon: FileText,
      label: "Resume",
    },
  ];

  const contactLinks: FooterLink[] = [
    {
      href: "https://mail.google.com/mail/?view=cm&to=vichuselvaraju@gmail.com",
      icon: MessageCircle,
      label: "Message",
    },
  ];

  return (
    <FooterWrapper>
      {/* Left side - Copyright */}
      <FooterCopyright />

      {/* Right side - Link columns */}
      <div
        className="flex w-full md:w-auto justify-between md:justify-start"
        style={CONTAINER_GAP}
      >
        <FooterSection title="Elsewhere" links={elsewhereLinks} />
        <FooterSection title="Contact" links={contactLinks} />
      </div>
    </FooterWrapper>
  );
}

// ===== Helper Components =====

function FooterWrapper({ children }: { children: React.ReactNode }) {
  return (
    <footer className="relative">
      <div className="mx-auto w-full p-4 md:px-[10vw] relative z-10">
        <div className="flex justify-between items-start">{children}</div>
      </div>
    </footer>
  );
}

function FooterCopyright() {
  return (
    <div className="hidden md:flex">
      <p className="text-gray-300 font-medium" style={COPYRIGHT_FONT_SIZE}>
        {COPYRIGHT_TEXT}
      </p>
    </div>
  );
}

function FooterSection({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4" style={HEADING_FONT_SIZE}>
        {title}
      </h3>
      <div className="flex flex-col">
        {links.map((link) => (
          <FooterLink key={link.label} {...link} />
        ))}
      </div>
    </div>
  );
}

function FooterLink({ href, icon: Icon, label }: FooterLink) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  return (
    <Button
      variant="ghost"
      className={cn(
        "flex items-center gap-3 p-0 h-11 justify-start",
        "text-gray-300 hover:text-[var(--accent-primary)] hover:bg-transparent",
        "transition-colors duration-200 group"
      )}
      asChild
    >
      <a
        href={href}
        className="flex items-center gap-3"
        {...(isExternal && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
      >
        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        <span>{label}</span>
      </a>
    </Button>
  );
}
