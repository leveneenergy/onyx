import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mediaFolder',
  title: 'Media Folders',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Folder Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: input =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .slice(0, 96),
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'mediaType',
      title: 'Folder Type',
      type: 'string',
      options: {
        list: [
          {title: 'Photos', value: 'photo'},
          {title: 'Videos', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'photo',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g. 1, 2, 3…)',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'mediaType', media: 'coverImage'},
    prepare({title, subtitle, media}) {
      return {title, subtitle: subtitle, media}
    },
  },
  orderings: [
    {title: 'Display Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
})