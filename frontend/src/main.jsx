import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.jsx";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton",
        },
        elements: {
          card: "bg-white border-4 border-black brutalist-shadow rounded-none",
          headerTitle: "font-black uppercase text-2xl tracking-tighter",
          headerSubtitle: "hidden",
          socialButtonsBlockButton: "border-2 border-black rounded-none brutalist-shadow-sm font-bold uppercase hover:bg-yellow-400 hover:text-black transition-all",
          dividerLine: "bg-black h-1",
          dividerText: "font-bold uppercase bg-white px-2 text-black",
          formFieldInput: "border-2 border-black rounded-none focus:ring-0 focus:border-yellow-400 font-bold p-3",
          formFieldLabel: "font-bold uppercase tracking-tight text-black",
          formButtonPrimary: "bg-black text-white border-2 border-black rounded-none brutalist-shadow-sm font-black uppercase hover:bg-yellow-400 hover:text-black transition-colors p-3",
          footerActionText: "font-bold text-black",
          footerActionLink: "font-black uppercase text-black hover:text-yellow-500",
          identityPreviewText: "font-bold text-black",
          identityPreviewEditButtonIcon: "text-black",
        }
      }}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>,
);
