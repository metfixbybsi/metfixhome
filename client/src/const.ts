export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const LOGIN_URL = "https://brokenscience.org/login/";

export const getLoginUrl = () => LOGIN_URL;

/** Public asset URL with Vite base path (needed for GitHub Pages). */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

/** Internal route or hash link with Vite base path. */
export function basePath(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith("/#")) return `${import.meta.env.BASE_URL}${path.slice(2)}`;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export const ROUTER_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
