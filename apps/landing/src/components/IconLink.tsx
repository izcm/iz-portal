import { cn } from "../lib/cn";
import { ExternalLink } from "../lib/icons";

export const DEFAULT_ICON_CLASSES =
  "flex items-center h-4 w-4 shrink-0 text-accent";

type IconLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function IconLink({ children, className, ...props }: IconLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className={cn(
        "flex items-center justify-between gap-3 w-full",
        "text-sm text-muted no-underline transition-colors hover:text-fg",
        className,
      )}
    >
      <span className="flex items-center gap-3">{children}</span>
      <ExternalLink className={DEFAULT_ICON_CLASSES} />
    </a>
  );
}
