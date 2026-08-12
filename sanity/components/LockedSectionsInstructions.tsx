import { Box, Card } from "@sanity/ui";
import type { StringFieldProps } from "sanity";

/** Studio-only instructions; replaces the field UI (not site content). */
export function LockedSectionsField(_props: StringFieldProps) {
  return (
    <Card padding={4} radius={2} tone="caution" border>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
          lineHeight: 1.55,
        }}
      >
        <p style={{ margin: 0, fontWeight: 600 }}>
          These homepage sections are not editable in Studio
        </p>
        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
          <li>
            Response block (130+ gyms / impact counters) — contact a developer if
            you need this editable.
          </li>
          <li style={{ marginTop: "0.4rem" }}>
            Free Forever / “What Is MetFix?” course panel — contact a developer if
            you need this editable.
          </li>
        </ul>
        <p style={{ margin: 0, opacity: 0.75 }}>
          This note is only for editors. It never appears on the website.
        </p>
      </Box>
    </Card>
  );
}
