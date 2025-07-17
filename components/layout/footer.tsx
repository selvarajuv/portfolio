// components/layout/footer.tsx

"use client";

import { Github, Linkedin, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VineGenerator } from "@/components/forest-theme/vines";
import { footerVines } from "@/data/vine-configs";

export default function Footer() {
  return (
    <footer
      className="relative px-4 md:px-8 "
      style={{ marginTop: "2vw", padding: "1.2vw" }}
    >
      {/* Footer content */}
      <div className="mx-auto relative z-10 " style={{ width: "70vw" }}>
        <div className="flex justify-between items-start">
          {/* Left side - Copyright */}
          <div className="flex-shrink-0">
            <p
              className="text-gray-300  font-bold"
              style={{ fontSize: ".9vw" }}
            >
              © 2025 Vichu • Portfolio
            </p>
          </div>

          {/* Right side - Two columns grouped together */}
          <div className="flex" style={{ gap: "2vw" }}>
            {/* Elsewhere links */}
            <div>
              <h3
                className="text-white font-semibold"
                style={{ fontSize: ".9vw", marginBottom: "1vw" }}
              >
                Elsewhere
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".7vw",
                }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center text-gray-300 hover:text-[#016428] hover:bg-transparent transition-colors duration-200 group p-0 h-auto justify-start"
                  asChild
                >
                  <a
                    href="#"
                    className="flex items-center"
                    style={{ gap: "0.5vw" }}
                  >
                    <Github
                      className="group-hover:scale-110 transition-transform duration-200"
                      style={{
                        width: ".9vw",
                        height: ".9vw",
                      }}
                    />
                    <span style={{ fontSize: "0.7vw" }}>Github</span>
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center text-gray-300 hover:text-[#016428] hover:bg-transparent transition-colors duration-200 group p-0 h-auto justify-start"
                  asChild
                >
                  <a
                    href="#"
                    className="flex items-center"
                    style={{ gap: "0.5vw" }}
                  >
                    <Linkedin
                      className="group-hover:scale-110 transition-transform duration-200"
                      style={{
                        width: ".9vw",
                        height: ".9vw",
                      }}
                    />
                    <span style={{ fontSize: "0.7vw" }}>LinkedIn</span>
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center text-gray-300 hover:text-[#016428] hover:bg-transparent transition-colors duration-200 group p-0 h-auto justify-start"
                  asChild
                >
                  <a
                    href="#"
                    className="flex items-center"
                    style={{ gap: "0.5vw" }}
                  >
                    <FileText
                      className="group-hover:scale-110 transition-transform duration-200"
                      style={{
                        width: ".9vw",
                        height: ".9vw",
                      }}
                    />
                    <span style={{ fontSize: "0.7vw" }}>Resume</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3
                className="text-white font-semibold"
                style={{ fontSize: ".9vw", marginBottom: "1vw" }}
              >
                Contact
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.7vw",
                }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center text-gray-300 hover:text-[#016428] hover:bg-transparent transition-colors duration-200 group p-0 h-auto justify-start"
                  asChild
                >
                  <a
                    href="mailto:your.email@example.com"
                    className="flex items-center"
                    style={{ gap: "0.5vw" }}
                  >
                    <MessageCircle
                      className="group-hover:scale-110 transition-transform duration-200"
                      style={{
                        width: ".9vw",
                        height: ".9vw",
                      }}
                    />
                    <span style={{ fontSize: "0.7vw" }}>Message</span>
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
