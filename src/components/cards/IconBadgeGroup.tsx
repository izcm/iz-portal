import { useId, useState } from "react";
import { IconBadge } from "../badges/IconBadge";

type Breakpoint = { cols: number; minWidth?: number; maxWidth?: number };

function OverflowBadge({ names }: { names: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative"
      title={names.join(", ")}
      onClick={(e) => {
        e.stopPropagation();
        if (window.matchMedia("(hover: hover)").matches) return;
        setOpen((prev) => !prev);
      }}
    >
      <IconBadge label="others" icon={`+${names.length}`} />
      {open && (
        <div
          className="
            absolute bottom-full right-0 mb-2 z-10
            w-max max-w-[12rem] px-2 py-1 rounded
            bg-ground/90 border border-line/16
            text-xs text-subtle text-center
          "
        >
          {names.join(", ")}
        </div>
      )}
    </span>
  );
}

function splitForOverflow(items: IconBadge[], cols: number) {
  const hidden = items.length > cols ? items.length % cols : 0;
  const visible = items.slice(0, items.length - hidden);
  const visibleWithSlotForOverflow =
    hidden > 0 ? visible.slice(0, visible.length - 1) : visible;
  return { visibleWithSlotForOverflow, hidden };
}

export function IconBadgeGroup({
  items,
  breakpoints,
}: {
  items: IconBadge[];
  breakpoints: Breakpoint[];
}) {
  const groupClass = `icon-badge-group-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const css = [
    `.${groupClass} { display: none; }`,
    ...breakpoints.map((bp, i) => {
      const conditions = [
        bp.minWidth && `(min-width:${bp.minWidth}px)`,
        bp.maxWidth && `(max-width:${bp.maxWidth}px)`,
      ]
        .filter(Boolean)
        .join(" and ");
      const rule = `.${groupClass}[data-variant="${i}"] { display: grid; }`;
      return conditions ? `@media ${conditions} { ${rule} }` : rule;
    }),
  ].join("\n");

  return (
    <>
      <style>{css}</style>
      {breakpoints.map((bp, i) => {
        const { visibleWithSlotForOverflow, hidden } = splitForOverflow(
          items,
          bp.cols,
        );
        return (
          <div
            key={i}
            data-variant={i}
            className={`${groupClass} gap-4`}
            style={{
              gridTemplateColumns: `repeat(${bp.cols}, minmax(0, 1fr))`,
            }}
          >
            {visibleWithSlotForOverflow.map((item) => (
              <IconBadge key={item.label} label={item.label} icon={item.icon} />
            ))}
            {hidden > 0 && (
              <OverflowBadge
                names={items
                  .slice(visibleWithSlotForOverflow.length)
                  .map((item) => item.label)}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
