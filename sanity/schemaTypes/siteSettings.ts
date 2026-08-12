import { defineArrayMember, defineField, defineType } from "sanity";
import { NavLinksHelp } from "../components/NavLinksHelp";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "nav", title: "Navigation Bar", default: true },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "navLinks",
      title: "Navigation Bar Links",
      type: "array",
      group: "nav",
      description:
        "Links shown in the top navigation (desktop and mobile). Order here = order on the site.",
      components: {
        field: NavLinksHelp,
      },
      of: [
        defineArrayMember({
          type: "object",
          name: "navLink",
          title: "Nav Link",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Text shown in the navigation bar, e.g. “Classes” or “Shop”.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link URL",
              type: "string",
              description:
                "Internal: start with / (example: /classes or /#about). External: full https:// address (example: https://brokenscience.org/shop/).",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "openInNewTab",
              title: "Open in new tab",
              type: "boolean",
              description:
                "On = opens a new browser tab and leaves this site open (target=_blank). Use for other websites. Off = same tab — use for MetFix pages.",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href", openInNewTab: "openInNewTab" },
            prepare({ title, subtitle, openInNewTab }) {
              return {
                title: title || "Untitled link",
                subtitle: `${subtitle || ""}${openInNewTab ? " · new tab" : ""}`,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "text",
      rows: 4,
      group: "footer",
      description:
        "Footer copyright text. Supports longer paragraphs — the site layout wraps and scales to fit.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
