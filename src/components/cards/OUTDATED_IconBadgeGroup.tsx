import { cn } from "../../lib/cn";
import { IconBadge } from "../badges/IconBadge";

export function IconBadgeGroup({
  items,
  cols,
  classNames,
}: {
  items: IconBadge[];
  cols: number;
  classNames?: string;
}) {
  const hidden = items.length > cols ? items.length % cols : 0;
  const visible = items.slice(0, items.length - hidden);

  const visibleWithSlotForOverflow =
    hidden > 0 ? visible.slice(0, visible.length - 1) : visible;

  const hiddenCount = hidden > 0 ? hidden + 1 : hidden;

  return (
    <div
      className={cn("grid gap-4", classNames)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {visibleWithSlotForOverflow.map((item) => (
        <IconBadge key={item.label} label={item.label} icon={item.icon} />
      ))}
      {hidden > 0 && (
        <span
          title={items
            .slice(visibleWithSlotForOverflow.length)
            .map((item) => item.label)
            .join(", ")}
        >
          <IconBadge label="others" icon={`+${hiddenCount}`} />
        </span>
      )}
    </div>
  );
}
