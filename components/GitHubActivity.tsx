"use client";

import { cloneElement, useEffect, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "@/context/theme-context";

const GITHUB_USERNAME = "Vidhanvyrs";

const contributionTheme = {
  light: ["#ded8c7", "#c6d0aa", "#96af7f", "#648664", "#365b43"],
  dark: ["#292a23", "#3a4935", "#536d50", "#7c9971", "#adc39a"],
};

function getContributionLabel(count: number, date: string) {
  return `${count} ${count === 1 ? "contribution" : "contributions"} on ${date}`;
}

export default function GitHubActivity() {
  const { theme } = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const alignToLatestActivity = () => {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth;
    };

    const observer = new MutationObserver(alignToLatestActivity);
    observer.observe(scrollContainer, { childList: true, subtree: true });
    alignToLatestActivity();

    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="github-activity-title">
      <h2 id="github-activity-title" className="mb-6 text-[22px] font-bold">
        @dotlasher
      </h2>

      <div className="overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="github-calendar-scroll overflow-x-auto py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-terracotta-hover"
          role="region"
          aria-label="Scrollable GitHub contribution graph"
          tabIndex={0}
        >
          <GitHubCalendar
            username={GITHUB_USERNAME}
            colorScheme={theme}
            theme={contributionTheme}
            blockSize={9}
            blockMargin={3}
            blockRadius={2.5}
            fontSize={12}
            showMonthLabels={false}
            showWeekdayLabels={false}
            showColorLegend={false}
            labels={{
              totalCount: "{{count}} total contributions",
            }}
            tooltips={{
              activity: {
                text: ({ count, date }) => getContributionLabel(count, date),
                hoverRestMs: 80,
                withArrow: true,
              },
            }}
            renderBlock={(block, activity) =>
              cloneElement(block, {
                "aria-label": getContributionLabel(activity.count, activity.date),
                role: "img",
              })
            }
            errorMessage="GitHub activity is temporarily unavailable."
            style={{ minWidth: "max-content" }}
          />
        </div>
      </div>
    </section>
  );
}
