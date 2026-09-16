import type { ContactInfo } from "../data/contacts";

const SiIcon = ({ icon }: { icon: { path: string } }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d={icon.path} />
  </svg>
);

type ContactCardProps = Omit<ContactInfo, "id" | "href">;

export const ContactCard = ({ icon, platform, handle }: ContactCardProps) => (
  <div className="flex items-center gap-4 px-4 py-3">
    <div className="w-8 flex justify-center shrink-0">
      <SiIcon icon={icon} />
    </div>

    <div className="flex flex-col items-start gap-1">
      <span className="w-full text-left text-xs text-muted leading-none">
        {platform}
      </span>
      <span className="w-full text-left text-sm text-fg leading-tight font-medium">
        {handle}
      </span>
    </div>
  </div>
);
