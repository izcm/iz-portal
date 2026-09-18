import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

document.documentElement.setAttribute("data-theme", "void");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="flex flex-col min-h-screen bg-ground bg-ground-gradient">
      <App />
      <footer className="py-6 text-center text-xs text-muted w-full">
        © {new Date().getFullYear()} IzBlocks
      </footer>
    </main>
  </StrictMode>,
);
