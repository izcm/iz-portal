import { cn } from "../lib/cn";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = ({
  className,
  children,
  ...props
}: LinkProps & { iconPath?: string }) => (
  <a
    {...props}
    className={cn(
      "text-sm text-muted no-underline transition-colors hover:text-fg",
      className,
    )}
  >
    {children}
  </a>
);
