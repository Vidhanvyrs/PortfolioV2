import React from "react";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-border">
      <div className="mx-auto max-w-[720px] px-6">
        <div className="flex flex-col items-center gap-1.5 py-8 text-center text-[13px] text-[#888]">
          <p>
            Designed &amp; Developed by <strong className="font-semibold text-[#555]">Vidhan</strong>
          </p>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
