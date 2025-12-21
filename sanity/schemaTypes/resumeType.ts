import { defineType, defineField } from "sanity";

export const resumeType = defineType({
    name: "resume",
    title: "Resume",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string",
            description:
                'e.g., "Academic CV", "AI Engineer Resume", "Software Engineer Resume"',
        }),
        defineField({
            name: "type",
            type: "string",
            options: {
                list: [
                    { title: "Academic CV", value: "academic" },
                    { title: "AI Engineer", value: "ai-engineer" },
                    { title: "Software Engineer", value: "swe" },
                ],
            },
        }),
        defineField({
            name: "resume",
            title: "Resume PDF",
            type: "file",
            options: {
                accept: ".pdf",
            },
        }),
        defineField({
            name: "order",
            type: "number",
            description: "Display order (lower numbers appear first)",
            initialValue: 0,
        }),
    ],
    orderings: [
        {
            title: "Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
});
