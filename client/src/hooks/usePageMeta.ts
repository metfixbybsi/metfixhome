import { useEffect } from "react";

type PageMeta = {
  title: string;
  description?: string;
  /** e.g. "noindex, follow" for 404 pages */
  robots?: string;
};

function setMetaContent(selector: string, content: string): (() => void) | undefined {
  const el = document.querySelector(selector);
  if (!(el instanceof HTMLMetaElement)) return undefined;
  const previous = el.getAttribute("content");
  el.setAttribute("content", content);
  return () => {
    if (previous == null) el.removeAttribute("content");
    else el.setAttribute("content", previous);
  };
}

/**
 * Sets document title and key meta tags for the current route (SPA).
 * Restores previous values on unmount.
 */
export function usePageMeta({ title, description, robots }: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const restorers: Array<(() => void) | undefined> = [];
    if (description) {
      restorers.push(setMetaContent('meta[name="description"]', description));
      restorers.push(setMetaContent('meta[property="og:title"]', title));
      restorers.push(setMetaContent('meta[property="og:description"]', description));
      restorers.push(setMetaContent('meta[name="twitter:title"]', title));
      restorers.push(setMetaContent('meta[name="twitter:description"]', description));
    }
    if (robots) {
      restorers.push(setMetaContent('meta[name="robots"]', robots));
    }

    return () => {
      document.title = previousTitle;
      restorers.forEach((restore) => restore?.());
    };
  }, [title, description, robots]);
}
