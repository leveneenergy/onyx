import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'managementProfile',
  title: 'Management Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Job Title / Role',
      type: 'string',
      description: 'e.g. "Group Managing Director" or "Non-Executive Director"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Board of Directors', value: 'board' },
          { title: 'Executive Directors', value: 'executive' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Professional headshot or portrait photo',
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Bio',
      type: 'string',
      description: 'One or two sentence summary shown on the listing card (~200 chars)',
      validation: Rule => Rule.max(400).warning('Keep under 400 characters for best display'),
    }),
    defineField({
      name: 'fullBio',
      title: 'Full Biography',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full rich-text biography shown on the detail page',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Optional LinkedIn profile link',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number appears first within the category',
    }),
  ],

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
