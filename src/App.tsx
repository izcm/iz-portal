import { useState } from "react";
import { Gallery } from "@a2zb/react";

import { cn } from "./lib/cn";

import { DemoCard } from "./components/cards/DemoCard";
import { ContactCard } from "./components/Contact";

import { demos } from "./data/demos";
import { contacts } from "./data/contacts";

export default function App() {
  const tabs = ["demos", "contact"] as const;

  const [activeTab, setActiveTab] = useState<"demos" | "contact">("demos");

  const [selected, setSelected] = useState<string | undefined>(undefined);

  const selectedContact = contacts.find((contact) => contact.id === selected);
  const selectedDemo = demos.find((demo) => demo.id === selected);

  return (
    <div
      className="
      w-full sm:max-w-[960px] flex-1 min-h-0 flex flex-col gap-4 justify-between
      mx-auto fade-in p-2 mx-auto"
    >
      {/* HERO */}
      <section
        className="
          flex flex-col justify-end items-center gap-2
          h-32
          "
      >
        <h1 className="text-4xl font-semibold">izblocks</h1>
        <p className="hero-kicker">Web3 + full-stack services</p>
      </section>

      <section className="flex flex-1 min-h-0 flex-col gap-2">
        <Gallery
          items={tabs}
          getId={(tab) => tab}
          selected={activeTab}
          onSelect={(tab) => {
            setActiveTab(tab);
            setSelected(undefined);
          }}
          direction="horizontal"
          htmlUlElementProps={{
            className:
              "gap-4 flex flex-row p-1 rounded-none sticky top-0 z-10 backdrop-blur",
          }}
          htmlLiElementProps={({ isSelected }) => ({
            className: cn(
              "min-w-[80px] subtle-focus min-h-10 flex items-center justify-center text-center transition-colors duration-200 cursor-pointer",
              isSelected && "border-t-2 border-accent/60 text-accent",
              !isSelected &&
                "hover:border-t-1 border-t-2 border-transparent bg-transparent hover:border-pop/60 hover:border-t-1 text-pop/90",
            ),
          })}
          galleryItem={(tab) => tab}
        />

        {activeTab === "contact" && (
          <Gallery
            items={contacts}
            getId={(contact) => contact.id}
            selected={selectedContact}
            onSelect={(contact) => setSelected(contact.id)}
            onEnter={(contact) =>
              window.open(contact.href, "_blank", "noreferrer")
            }
            htmlUlElementProps={{ className: "flex flex-col gap-3" }}
            htmlLiElementProps={({ isSelected }) => ({
              className: cn(
                "scroll-mt-14",
                !isSelected && "bg-raised/40 cursor-pointer",
              ),
            })}
            galleryItem={(contact) => (
              <ContactCard
                icon={contact.icon}
                platform={contact.platform}
                handle={contact.handle}
              />
            )}
          />
        )}

        {activeTab === "demos" && (
          <div className="flex flex-1 min-h-0 flex-col">
            <Gallery
              items={demos}
              getId={(demo) => demo.id}
              selected={selectedDemo}
              onSelect={(demo) => setSelected(demo.id)}
              onEnter={(demo) =>
                window.open(
                  demo.liveUrl ?? demo.repoLink,
                  "_blank",
                  "noreferrer",
                )
              }
              htmlUlElementProps={{
                className: "flex flex-1 min-h-0 flex-col gap-4",
              }}
              htmlLiElementProps={({ isSelected }) => ({
                className: cn(
                  "scroll-mt-14 rounded",
                  !isSelected && "bg-raised/40 cursor-pointer",
                ),
              })}
              galleryItem={(demo) => (
                <DemoCard {...demo} onSelectDemo={setSelected} />
              )}
            />
          </div>
        )}
      </section>
    </div>
  );
}
