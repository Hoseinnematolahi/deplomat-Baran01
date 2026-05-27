export const sectionSchema = {
  name: 'section',
  title: 'Cinematic Section',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'copy', type: 'text' },
    { name: 'motionPacing', type: 'string' },
    { name: 'theme', type: 'string' },
    { name: 'order', type: 'number' }
  ]
};
