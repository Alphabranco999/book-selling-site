import {defineField, defineType} from 'sanity'

export const bookType = defineType({
  name: 'book',
  title: 'Books',
  type: 'document',

  fields: [

    defineField({
      name: 'title',
      title: 'Book Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),

    defineField({
      name: 'price',
      title: 'Price (UGX)',
      type: 'number',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'status',
      title: 'Book Status',
      type: 'string',
      options: {
        list: [
          {title: 'Available', value: 'available'},
          {title: 'Coming Soon', value: 'coming-soon'},
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'cover',
      title: 'Book Cover',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'pdf',
      title: 'Book PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),

  ],
})