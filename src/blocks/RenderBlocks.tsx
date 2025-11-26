import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MapBlock } from '@/blocks/MapBlock/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PreviewCards } from '@/blocks/PreviewCards/Component'
import { ScheduleBlock } from '@/blocks/ScheduleBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mapBlock: MapBlock,
  mediaBlock: MediaBlock,
  previewCards: PreviewCards,
  schedule: ScheduleBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  nested?: boolean
}> = (props) => {
  const { blocks, nested = false } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error - Block components may have different prop types */}
                  <Block {...block} nested={nested} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
