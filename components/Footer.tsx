import React from "react";
import { socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-8">
      <div className="max-w-[720px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <p className="text-[13px] text-[#888]">
          &copy; {new Date().getFullYear()} Vidhan Solanki. All rights reserved.
        </p>

        <ul className="flex items-center gap-5 list-none">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[13px] text-[#555] hover:text-black transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
