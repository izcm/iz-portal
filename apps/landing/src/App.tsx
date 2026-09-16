import { useState } from "react";

import { cn } from "./lib/cn";

import { ArrowList } from "./components/ArrowList";
import { ArrowRow } from "./components/ArrowRow";

import { DemoCard } from "./components/cards/DemoCard";
import { ContactCard } from "./components/Contact";

import { demos } from "./data/demos";
import { contacts } from "./data/contacts";

export default function App() {
  const tabs = ["demos", "contact"] as const;

  const [activeTab, setActiveTab] = useState<"demos" | "contact">("demos");

  const [selected, setSelected] = useState<string | undefined>(undefined);

  return (
    <div
      className="
      w-full sm:max-w-[960px] min-h-screen flex flex-col gap-4 justify-between
      mx-auto fade-in p-2 mx-auto"
    >
      {/* HERO */}
      <section
        className="
          flex flex-col justify-end items-center gap-2
          h-32
          "
      >
        <h1 className="text-4xl font-semibold">IzBlocks</h1>
        <p className="hero-kicker">Web3 + full-stack services</p>
      </section>

      <section className="flex flex-1 flex-col gap-2">
        <ArrowList
          items={tabs}
          getId={(tab) => tab}
          selectedId={activeTab}
          onSelect={(tab) => {
            setActiveTab(tab);
            setSelected(undefined);
          }}
          className="gap-4 flex flex-row p-1 rounded-none sticky top-0 z-10 backdrop-blur"
          direction="horizontal"
        >
          {({ item: tab, isSelected, onSelect }) => (
            <ArrowRow
              key={tab}
              isSelected={isSelected}
              onSelect={onSelect}
              focusOnMount={false}
              className={cn(
                "min-w-[80px] pt-2 text-center transition-colors duration-200 cursor-pointer",
                "focus-visible:bg-accent/10 ring-0",
                isSelected && "border-t-2 border-accent/60 text-accent",
                !isSelected &&
                  "hover:border-t-1 border-t-2 border-transparent hover:border-pop/60 hover:border-t-1 text-pop/90",
              )}
              bare
            >
              {tab}
            </ArrowRow>
          )}
        </ArrowList>

        {activeTab === "contact" && (
          <ArrowList
            items={contacts}
            getId={(contact) => contact.id}
            selectedId={selected}
            onSelect={(contact) => setSelected(contact.id)}
            className="flex flex-col gap-3"
          >
            {({ item: contact, isSelected, onSelect }) => (
              <ArrowRow
                key={contact.id}
                isSelected={isSelected}
                onSelect={onSelect}
                onEnter={() =>
                  window.open(contact.href, "_blank", "noreferrer")
                }
                className={cn(
                  "scroll-mt-14",
                  !isSelected && "bg-raised/40 cursor-pointer",
                )}
              >
                <ContactCard
                  icon={contact.icon}
                  platform={contact.platform}
                  handle={contact.handle}
                />
              </ArrowRow>
            )}
          </ArrowList>
        )}

        {activeTab === "demos" && (
          <div className="flex flex-col">
            <ArrowList
              items={demos}
              getId={(demo) => demo.id}
              selectedId={selected}
              onSelect={(demo) => setSelected(demo.id)}
              className={"flex flex-col gap-4"}
            >
              {({ item: demo, isSelected, onSelect }) => (
                <ArrowRow
                  key={demo.id}
                  isSelected={isSelected}
                  onSelect={onSelect}
                  onEnter={() => (
                    window.open(demo.liveUrl ?? demo.repoLink),
                    "_blank",
                    "norefferer"
                  )}
                  className={cn(
                    "scroll-mt-14",
                    !isSelected && "bg-raised/40 cursor-pointer",
                  )}
                >
                  <DemoCard {...demo} onSelectDemo={setSelected} />
                </ArrowRow>
              )}
            </ArrowList>
          </div>
        )}
      </section>
    </div>
  );
}
