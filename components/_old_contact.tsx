"use client";
import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { sendEmail } from "@/actions/sendEmail";
import Submit from "./submit_btn";
import toast from "react-hot-toast";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
    >
      <SectionHeading>Contact me</SectionHeading>
      <p className="-mt-6 text-gray-700 dark:text-white/80">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:vidhanvyrs@gmail.com">
          vidhanvyrs@gmail.com
        </a>{" "}
        or through this form.
      </p>

      <form
        className="flex flex-col mt-10 dark:text-black"
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);
          if (error) {
            toast.error(error);
            return;
          }
          toast("✅Email sent successfully");
        }}
      >
        <input
          type="email"
          name="senderEmail"
          required
          maxLength={500}
          className="p-4 transition-all rounded-lg borderBlack h-14 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 dark:outline-none"
          placeholder="Your Email"
        />
        <textarea
          className="p-4 my-3 transition-all rounded-lg h-52 borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 dark:outline-none"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <Submit />
      </form>
    </motion.section>
  );
}
