import { defineType, defineField } from "sanity";

export const resumeType = defineType({
    name: 'resume',
    title: 'Resume',
    type: 'document',
    fields: [
        defineField({
            name: 'resume',
            title: 'Resume',
            type: 'file',
        }),
    ]
})