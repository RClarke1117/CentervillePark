"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Same language set as cwpd.org Google Language Translator widget */
export const TRANSLATE_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "zh-CN", label: "Chinese (Simplified)" },
  { code: "ar", label: "Arabic" },
  { code: "hi", label: "Hindi" },
  { code: "ko", label: "Korean" },
  { code: "fa", label: "Persian" },
  { code: "pt", label: "Portuguese" },
  { code: "pa", label: "Punjabi" },
  { code: "ru", label: "Russian" },
  { code: "te", label: "Telugu" },
  { code: "th", label: "Thai" },
  { code: "tr", label: "Turkish" },
  { code: "uk", label: "Ukrainian" },
] as const;

const INCLUDED = TRANSLATE_LANGUAGES.map((l) => l.code).join(",");

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
            layout?: number;
          },
          elementId: string,
        ) => void;
      };
    };
  }
}

function readGoogTrans(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) return "en";
  const value = decodeURIComponent(match[1]);
  // formats: /en/es or /auto/es
  const parts = value.split("/").filter(Boolean);
  return parts[parts.length - 1] || "en";
}

function setGoogTrans(lang: string) {
  const expire = "Thu, 01 Jan 1970 00:00:00 GMT";
  const hosts = [
    "",
    window.location.hostname,
    `.${window.location.hostname}`,
  ];
  for (const host of hosts) {
    const domain = host ? `;domain=${host}` : "";
    // Clear any prior cookie values Google may have set.
    document.cookie = `googtrans=;path=/${domain};expires=${expire}`;
    if (lang !== "en") {
      document.cookie = `googtrans=/en/${lang};path=/${domain};max-age=31536000`;
    }
  }
}

export function SiteTranslate({ compact = false }: { compact?: boolean }) {
  const selectId = useId();
  const [lang, setLang] = useState("en");
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    setLang(readGoogTrans());

    if (loaded.current) return;
    loaded.current = true;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: INCLUDED,
          autoDisplay: false,
        },
        "google_translate_element",
      );
      setReady(true);
    };

    const existing = document.querySelector(
      'script[data-cwpd-google-translate="1"]',
    );
    if (existing) {
      if (window.google?.translate?.TranslateElement) {
        window.googleTranslateElementInit();
      }
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.dataset.cwpdGoogleTranslate = "1";
    document.body.appendChild(script);
  }, []);

  function onChange(next: string) {
    setLang(next);
    setGoogTrans(next);
    const combo = document.querySelector(
      ".goog-te-combo",
    ) as HTMLSelectElement | null;
    if (combo) {
      combo.value = next;
      combo.dispatchEvent(new Event("change"));
      // Returning to English often needs a reload to clear wrapped DOM.
      if (next === "en") window.location.reload();
      return;
    }
    window.location.reload();
  }

  return (
    <div
      className={
        compact
          ? "flex items-center gap-2"
          : "flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3"
      }
    >
      <label
        htmlFor={selectId}
        className={
          compact
            ? "sr-only"
            : "text-xs font-semibold uppercase tracking-[0.14em] text-gold-bright"
        }
      >
        Translate this site
      </label>
      <select
        id={selectId}
        className="focus-ring max-w-full cursor-pointer rounded-sm border border-white/25 bg-forest-deep px-3 py-2 text-sm text-white"
        value={lang}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Translate this site"
      >
        {TRANSLATE_LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
      {/* Google mounts its widget here; visually hidden but kept for engine */}
      <div
        id="google_translate_element"
        className="sr-only"
        aria-hidden={ready ? undefined : true}
      />
      <p className="sr-only">
        Machine translation powered by Google Translate, matching the language
        options on the current Centerville-Washington Park District website.
      </p>
    </div>
  );
}
