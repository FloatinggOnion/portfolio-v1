import { UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const authorType = defineType({
	name: "author",
	title: "Author",
	type: "document",
	icon: UserIcon as any,
	fields: [
		defineField({
			name: "name",
			type: "string",
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: {
				source: "name",
			},
		}),
		defineField({
			name: "email",
			type: "email",
		}),
		defineField({
			name: "image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
    defineField({
      name: 'skills',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
		  to: {
			type: 'skill',
		  }
        }),
      ],
    }),
		defineField({
			name: "socials",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					fields: [
						defineField({
							name: "platform",
							type: "string",
							options: {
								list: [
									{ title: "GitHub", value: "github" },
									{ title: "Twitter", value: "twitter" },
									{ title: "Instagram", value: "instagram" },
									{ title: "LinkedIn", value: "linkedin" },
									{ title: "YouTube", value: "youtube" },
								],
							},
						}),
						defineField({
							name: "url",
							type: "url",
						}),
					],
				}),
			],
		}),
		defineField({
			name: "bio",
			type: "array",
			of: [
				defineArrayMember({
					type: "block",
					styles: [{ title: "Normal", value: "normal" }],
					lists: [],
				}),
			],
		}),
		defineField({
			name: "aboutMe",
			type: "array",
			of: [
				defineArrayMember({
					type: "block",
					styles: [{ title: "Normal", value: "normal" }],
					lists: [],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "name",
			media: "image",
		},
	},
});
