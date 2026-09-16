import { sortTools, type Demo } from "../../data/demos";

import { IconLink, DEFAULT_ICON_CLASSES } from "../IconLink";
import { LiveBadge } from "../badges/LiveBadge";

import { Code, Radio } from "../../lib/icons";
import { cn } from "../../lib/cn";
import { IconBadgeGroup } from "./IconBadgeGroup";

type DemoCardProps = Demo & { onSelectDemo?: (id: string) => void };

export const DemoCard = ({
  title,
  desc,
  repoLink,
  tools,
  composedOf,
  onSelectDemo,
  isLive,
  liveUrl,
}: DemoCardProps) => {
  return (
    <div
      className="
        flex flex-col-reverse md:flex-row-reverse gap-4
        border border-extra-faint rounded-lg p-4
        rounded-lg bg-raised bg-raised-gradient border border-faint
        transition-[filter] duration-150 hover:brightness-125 
      "
    >
      {/* LINKS & TOOL-BADGES (RIGHT) */}
      <div className="flex flex-col justify-between gap-6 px-1 md:w-1/3 min-w-0">
        {/* TOOLS */}
        <IconBadgeGroup
          items={sortTools(tools).map((tool) => ({
            label: tool.name,
            icon: tool.devicon ? (
              <i className={`devicon-${tool.devicon}-plain text-2xl`}></i>
            ) : undefined,
          }))}
          breakpoints={[
            { cols: 5, maxWidth: 450 },
            { cols: 7, minWidth: 451, maxWidth: 767 },
            { cols: 4, minWidth: 768 },
          ]}
        />

        {/* LINKS */}
        <div
          className="flex flex-col gap-2"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.stopPropagation();
            }
          }}
        >
          {isLive && (
            <IconLink href={liveUrl} className="[&>svg:last-child]:text-gold">
              <Radio className={cn(DEFAULT_ICON_CLASSES, "text-gold")} />
              See live
            </IconLink>
          )}
          <IconLink href={repoLink}>
            <Code className={DEFAULT_ICON_CLASSES} />
            Visit codebase
          </IconLink>
        </div>
      </div>

      {/* TEXT INFO (LEFT) */}
      <div className="flex flex-col flex-1 min-w-0 gap-3 text-start">
        <h3 className="text-fg tracking-tight">
          {title}
          {isLive && (
            <span className="ml-3">
              <LiveBadge />
            </span>
          )}
        </h3>

        {/* DESCRIPTION */}
        <div className="flex-1 flex flex-col gap-3 text-subtle text-sm leading-relazed">
          {desc
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line, i) => (
              <p key={i}>{line}</p>
            ))}
        </div>

        {/* BUILD WITH */}
        {composedOf && (
          <p className="text-xs text-muted">
            Composed of:{" "}
            {composedOf.map((demoId, i) => (
              <span key={demoId}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDemo?.(demoId);
                  }}
                  className="text-subtle hover:text-fg transition-colors cursor-pointer"
                >
                  {demoId}
                </button>
                {i < composedOf.length - 1 && (
                  <span className="mx-1 text-faint">·</span>
                )}
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
};
