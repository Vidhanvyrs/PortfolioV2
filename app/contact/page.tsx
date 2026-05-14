"use client";

import React from "react";
import { sendEmail } from "@/actions/sendEmail";
import SubmitButton from "@/components/SubmitButton";
import toast from "react-hot-toast";
import { socialLinks } from "@/lib/data";

export default function ContactPage() {
  return (
    <main className="max-w-[720px] mx-auto px-6 py-20">
      <section>
        <h1 className="text-[32px] font-bold mb-4">Get in Touch</h1>
        <p className="text-[15px] text-[#555] leading-relaxed mb-12 max-w-[560px]">
          Whether you want to talk about a project, an open-source idea, or your
          new favourite thing to do, I'm all ears.
        </p>

        <form
          className="space-y-6"
          action={async (formData) => {
            const { error } = await sendEmail(formData);
            if (error) {
              toast.error(error);
              return;
            }
            toast.success("Email sent successfully!");
          }}
        >
          <div>
            <label
              htmlFor="senderName"
              className="block text-[14px] font-medium mb-2 text-[#555]"
            >
              Name
            </label>
            <input
              type="text"
              name="senderName"
              id="senderName"
              required
              maxLength={100}
              className="w-full px-4 py-3 rounded-md border border-border bg-white focus:outline-none focus:ring-1 focus:ring-terracotta transition-all text-[14.5px]"
            />
          </div>

          <div>
            <label
              htmlFor="senderEmail"
              className="block text-[14px] font-medium mb-2 text-[#555]"
            >
              Email
            </label>
            <input
              type="email"
              name="senderEmail"
              id="senderEmail"
              required
              maxLength={500}
              className="w-full px-4 py-3 rounded-md border border-border bg-white focus:outline-none focus:ring-1 focus:ring-terracotta transition-all text-[14.5px]"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-[14px] font-medium mb-2 text-[#555]"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              maxLength={5000}
              rows={6}
              className="w-full px-4 py-3 rounded-md border border-border bg-white focus:outline-none focus:ring-1 focus:ring-terracotta transition-all text-[14.5px] resize-none"
            />
          </div>

          <SubmitButton />
        </form>
      </section>

      <section className="mt-20">
        <h2 className="text-[20px] font-bold mb-6">Find Me Elsewhere</h2>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13.5px] text-[#555] border border-border rounded-md px-5 py-2.5 hover:border-terracotta hover:text-black transition-all bg-transparent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
