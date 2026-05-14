import React from "react";
import { currentlyData } from "@/lib/data";

export default function CurrentlySection() {
  return (
    <section className="pb-8">
      <h2 className="text-[22px] font-bold mb-5">Currently</h2>

      <div className="space-y-2">
        {currentlyData.map((item, index) => (
          <p className="text-[15px] text-[#555] leading-relaxed" key={index}>
            <strong className="text-black font-semibold">{item.label}:</strong> {item.value}
          </p>
        ))}
      </div>
    </section>
  );
}
