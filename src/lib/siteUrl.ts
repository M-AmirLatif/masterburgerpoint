/**
 * Dynamic site URL resolver.
 * Defaults to the active Vercel domain 'https://cheezybite-xi.vercel.app'
 * or the active Vercel production deployment URL, ensuring WhatsApp
 * and other chat crawlers can successfully reach and download the OG preview images.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return "https://masterburgerpoint.vercel.app";
}

export const SITE_URL = getSiteUrl();
