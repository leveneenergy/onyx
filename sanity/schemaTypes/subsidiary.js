import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'subsidiary',
  title: 'Subsidiary',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
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
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short catchy one-liner shown under the company name',
    }),

    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'Square or horizontal logo for listings and previews',
    }),
    defineField({
      name: 'coverImage',
      title: 'Hero Cover Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Large hero background image at the top of the detail page',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Content Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Primary image shown on the LEFT side of the main content section',
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Secondary Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image used in the second split section ("Our Commitment" area)',
    }),


    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text content for the main body',
    }),

    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'string',
      options: {
        list: [
          { title: 'Upstream', value: 'upstream' },
          { title: 'Gas & Power', value: 'gas' },
          { title: 'Renewables', value: 'renewables' },
          { title: 'Trading', value: 'trading' },
        ],
      },
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number appears first in the subsidiaries list',
    }),
  ],

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'sector',
      media: 'logo',
    },
  },
})