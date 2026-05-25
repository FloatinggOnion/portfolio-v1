import {ClipboardIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const newsItemType = defineType({
  name: 'newsItem',
  title: 'News Item',
  type: 'document',
  icon: ClipboardIcon as any,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'blockContent',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'publishedAt',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      const headlineText = title?.[0]?.children?.[0]?.text ?? 'Untitled'
      return {title: headlineText, subtitle}
    },
  },
})
