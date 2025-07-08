"use client";

import { Github, Linkedin, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import VineGenerator from "../decorative/vine-generator";
import { footerVines } from "@/data/vine-configs";

export default function Footer() {
  return (
    <footer className="relative mt-32 py-16 px-4 md:px-8">
      {/* Footer content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-start">
          {/* Left side - Copyright */}
          <div className="flex-shrink-0">
            <p className="text-gray-300 text-lg font-bold">
              © 2025 Vichu • Portfolio
            </p>
          </div>

          {/* Right side - Two columns grouped together */}
          <div className="flex gap-16">
            {/* Elsewhere links */}
            <div>
              <h3 className="text-white text-xl font-semibold mb-6">
                Elsewhere
              </h3>
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#016428] hover:bg-transparent transition-colors duration-200 group p-0 h-auto justify-start"
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
              <h3 className="text-white text-xl font-semibold mb-6">Contact</h3>
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#016428] hover:bg-transparent transition-colors duration-200 group p-0 h-auto justify-start"
                  asChild
                >
                  <a
                    href="mailto:your.email@example.com"
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

      {/* Subtle vine decorations around footer */}
      <VineGenerator vines={footerVines} />
    </footer>
  );
}
