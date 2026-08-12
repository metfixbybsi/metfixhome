import { Box, Card, Stack } from "@sanity/ui";
import type { ArrayFieldProps } from "sanity";

/** Studio help above the navigation links list (keeps the default array editor). */
export function NavLinksHelp(props: ArrayFieldProps) {
  return (
    <Stack space={4}>
      <Card padding={4} radius={2} tone="primary" border>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            lineHeight: 1.55,
          }}
        >
          <p style={{ margin: 0, fontWeight: 600 }}>How navigation links work</p>
          <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
            <li>
              <strong>Internal link</strong> — a page on this MetFix website. Use a path that
              starts with <code>/</code>, for example <code>/classes</code> or{" "}
              <code>/become-an-affiliate</code>. Section links on the home page look like{" "}
              <code>/#about</code>.
            </li>
            <li style={{ marginTop: "0.45rem" }}>
              <strong>External link</strong> — any other website. Use a full address that starts
              with <code>https://</code>, for example{" "}
              <code>https://brokenscience.org/shop/</code>.
            </li>
            <li style={{ marginTop: "0.45rem" }}>
              <strong>Open in new tab</strong> — when turned on, the visitor’s current MetFix tab
              stays open and the link opens in a <em>new</em> browser tab. Developers call this{" "}
              <code>target=&quot;_blank&quot;</code>. Turn this <strong>on</strong> for external
              sites (Shop, Library, Daily Fix). Turn it <strong>off</strong> for pages on this
              site so people stay in the same tab.
            </li>
          </ul>
          <p style={{ margin: 0, opacity: 0.8 }}>
            Drag items to change the order left-to-right (and top-to-bottom on mobile). Add or
            remove links as needed.
          </p>
        </Box>
      </Card>
      {props.renderDefault(props)}
    </Stack>
  );
}
