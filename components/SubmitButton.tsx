"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="px-6 py-3 bg-terracotta text-white text-[14px] font-medium rounded-md hover:bg-terracotta-hover transition-all active:scale-95 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
      disabled={pending}
    >
      {pending ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      ) : (
        "Send Message"
      )}
    </button>
  );
}
