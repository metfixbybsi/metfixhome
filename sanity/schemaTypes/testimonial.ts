import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: 'e.g. "MetFix Affiliate"',
    }),
    defineField({
      name: "gym",
      title: "Gym / Location",
      type: "string",
    }),
    defineField({
      name: "photo",
      title: "Photo (optional)",
      type: "image",
      options: { hotspot: true },
      readOnly: false,
      description:
        "Upload a headshot if you have one. If empty, the site shows the person’s initial as a placeholder.",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 100,
      description:
        "Controls where this quote appears in the testimonials carousel. Smaller numbers show first (1 before 2 before 10). Tip: use gaps like 10, 20, 30 so you can insert a quote later without renumbering everything.",
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "quote", media: "photo" },
  },
});
