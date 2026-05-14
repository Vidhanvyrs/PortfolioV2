"use client";
import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
export default function About() {
  return (
    <motion.section
      //   className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40"
      className="mb-0 max-w-[45rem] text-center leading-8 sm:mb-0 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        I am just a guy looking to make my way in{" "}
        <span className="font-bold">Tech World</span>, Beside that I am a
        final-year Student pursuing my Bachelors Degree in Computer Science
        Engineering, hailing from India. I do Freelance Projects because that is
        my speciality,{" "}
        <span className="font-bold">
          I am a full-stack developer and a Freelancer
        </span>
        . <span className="italic">My favorite part of programming</span> is the
        problem-solving aspect. I actually feel amazing whenever I try to
        explore some new technology,
        <span>
          {" "}
          language/stack, or something more fundamental and I do it not just for
          the sake
        </span>{" "}
        of getting a job or building my resume, but because I actually{" "}
        <span className="font-bold underline">Love</span> to explore!! My core
        stack is{" "}
        <span className="font-medium">
          React.js, Next.js, Node.js, Express.js, MySQL, MongoDB and many more..
        </span>
        . I am also familiar with TypeScript and Prisma. I am currently looking
        for a <span className="font-medium">full-time position</span> as a
        software developer, But till then I am always available for Freelance
        work.
      </p>

      <p className="mb-3">
        <span className="italic">When I&apos;m not coding</span>, I enjoy
        Sketching, watching F1, Anime and TV-series. I also enjoy{" "}
        <span className="font-medium">learning new things</span>. I am currently
        learning about{" "}
        <span className="font-medium">
          Computer Architecture and reading Books on Core Fundamentals of CSE
        </span>
        . If you somehow like my work then feel free to contact me.{" "}
      </p>
      <span className="font-bold">Lets work together!</span>
    </motion.section>
  );
}
