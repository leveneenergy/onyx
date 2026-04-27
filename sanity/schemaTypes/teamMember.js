import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    // ── Identity ──────────────────────────────────────────────
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

    // ── Category (mirrors the subsidiary "sector" pattern) ────
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Which section of the Management Team page this person appears in',
      options: {
        list: [
          { title: 'Board of Directors', value: 'board-of-directors' },
          { title: 'Executive Team',     value: 'executive-team' },
        ],
        layout: 'radio',          // shows as radio buttons in Sanity Studio
      },
      validation: Rule => Rule.required(),
    }),

    // ── Role & Title ──────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Job Title / Position',
      type: 'string',
      description: 'e.g. "Chairman", "Chief Executive Officer", "Non-Executive Director"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department / Committee',
      type: 'string',
      description: 'Optional — e.g. "Finance & Audit Committee", "Operations"',
    }),

    // ── Images ───────────────────────────────────────────────
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Professional headshot or portrait',
    }),

    // ── Short bio (used in cards / listing pages) ─────────────
    defineField({
      name: 'excerpt',
      title: 'Short Bio',
      type: 'string',
      description: 'One or two sentences shown on listing/card views (plain text)',
      validation: Rule =>
        Rule.max(300).warning('Keep the short bio under 300 characters for best display'),
    }),

    // ── Full bio (rich text, used on detail pages) ────────────
    defineField({
      name: 'fullBio',
      title: 'Full Biography',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text biography shown on the individual profile page',
    }),

    // ── Contact / Social ──────────────────────────────────────
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),

    // ── Display order (same pattern as subsidiary "order") ────
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number appears first within each category',
    }),
  ],

  // ── Default sort ────────────────────────────────────────────
  orderings: [
    {
      title: 'Category then Display Order',
      name: 'categoryOrderAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order',    direction: 'asc' },
      ],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],

  // ── Studio list preview ──────────────────────────────────────
  preview: {
    select: {
      title:    'name',
      subtitle: 'title',
      media:    'photo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
