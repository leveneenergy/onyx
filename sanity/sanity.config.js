import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'leveneenergies-studio',
  projectId: 'ilajnehi',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('📁 Media Folders')
              .child(S.documentTypeList('mediaFolder').title('Media Folders')),

            S.divider(),

            S.listItem()
              .title('🖼️ Photos')
              .child(
                S.documentList()
                  .title('Photos')
                  .filter('_type == "mediaItem" && type == "photo"'),
              ),

            S.listItem()
              .title('🎬 Videos')
              .child(
                S.documentList()
                  .title('Videos')
                  .filter('_type == "mediaItem" && type == "video"'),
              ),

            S.listItem()
              .title('📧 Newsletters')
              .child(
                S.documentList()
                  .title('Newsletters')
                  .filter('_type == "mediaItem" && type == "newsletter"'),
              ),

            S.divider(),

            S.listItem()
              .title('📰 Press Releases')
              .child(S.documentTypeList('pressRelease').title('Press Releases')),

            S.divider(),

            S.listItem()
              .title('All Media Items')
              .child(S.documentTypeList('mediaItem').title('All Media')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev) => {
      const unpublish = prev.find((a) => a.action === 'unpublish')
      const others = prev.filter((a) => a.action !== 'unpublish')
      return unpublish ? [others[0], unpublish, ...others.slice(1)] : prev
    },
  },
})