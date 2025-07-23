// components/layout/footer.tsx

"use client";

import { Github, Linkedin, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="">
      {/* Footer content */}
      <div className="mx-auto relative z-10" style={{ width: "70vw" }}>
        <div className="flex justify-between items-start">
          {/* Left side - Copyright (hidden on mobile) */}
          <div className="hidden md:flex">
            <p
              className="text-gray-300 font-bold"
              style={{ fontSize: "clamp(1.1rem, .7vw, 2rem)" }}
            >
              © 2025 Vichu • Portfolio
            </p>
          </div>

          {/* Right side - Two columns side by side (full width on mobile for proper spacing) */}
          <div
            className="flex w-full md:w-auto justify-between md:justify-start md:mx-0"
            style={{ gap: "clamp(20px, 3vw, 64px)" }}
          >
            {/* Elsewhere links */}
            <div>
              <h3
                className="text-white font-semibold mb-4"
                style={{ fontSize: "clamp(1.1rem, .8vw, 2rem)" }}
              >
                Elsewhere
              </h3>
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#016428] hover:bg-transparent transition-colors duration-200 group p-0 justify-start"
                  style={{ height: "44px" }}
                  asChild
                >
                  <a href="#" className="flex items-center gap-3">
                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>Github</span>
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#016428] hover:bg-transparent transition-colors duration-200 group p-0 h-auto justify-start"
                  style={{ minHeight: "44px" }}
                  asChild
                >
                  <a href="#" className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>LinkedIn</span>
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#016428] hover:bg-transparent transition-colors duration-200 group p-0 h-auto justify-start"
                  style={{ minHeight: "44px" }}
                  asChild
                >
                  <a href="#" className="flex items-center gap-3">
                    <FileText className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>Resume</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3
                className="text-white font-semibold mb-4"
                style={{ fontSize: "clamp(1.1rem, .8vw, 2rem)" }}
              >
                Contact
              </h3>
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#016428] hover:bg-transparent transition-colors duration-200 group p-0 h-auto justify-start"
                  style={{ height: "44px" }}
                  asChild
                >
                  <a
                    href="https://mail.google.com/mail/?view=cm&to=vichuselvaraju@gmail.com"
                    className="flex items-center gap-3"
                  >
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>Message</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
