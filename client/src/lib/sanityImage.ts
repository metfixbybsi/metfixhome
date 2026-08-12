import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanity";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function sanityImageUrl(
  source: unknown,
  width = 1200
): string | undefined {
  if (!builder || !source) return undefined;
  try {
    return builder.image(source as any).width(width).auto("format").url() || undefined;
  } catch {
    return undefined;
  }
}
