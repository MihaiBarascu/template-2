import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Class } from '../../../payload-types'

export const revalidateClass: CollectionAfterChangeHook<Class> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/classes/${doc.slug}`

      payload.logger.info(`Revalidating class at path: ${path}`)

      revalidatePath(path)
      revalidatePath('/classes')
      revalidateTag('classes')
    }

    // If the class was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/classes/${previousDoc.slug}`

      payload.logger.info(`Revalidating old class at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/classes')
      revalidateTag('classes')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Class> = ({
  doc,
  req: { context }
}) => {
  if (!context.disableRevalidate) {
    const path = `/classes/${doc?.slug}`

    revalidatePath(path)
    revalidatePath('/classes')
    revalidateTag('classes')
  }

  return doc
}