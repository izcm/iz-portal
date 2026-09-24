import { siDiscord, siGmail } from "simple-icons";

export type ContactInfo = {
  id: string;
  href: string;
  icon: { path: string };
  platform: string;
  handle: string;
};

export const contacts: ContactInfo[] = [
  {
    id: "discord",
    href: "https://discord.com/users/745594868826505227",
    icon: siDiscord,
    platform: "Discord",
    handle: "@izcm",
  },
  {
    id: "email",
    href: "mailto:izcm@izblocks.com",
    icon: siGmail,
    platform: "Email",
    handle: "izcm@izblocks.com",
  },
];
