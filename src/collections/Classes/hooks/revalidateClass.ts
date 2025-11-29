import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Clase } from '../../../payload-types'
import { getCollectionUrl, getCollectionListUrl } from '../../../utilities/getCollectionUrl'

const COLLECTION_SLUG = 'clase'

export const revalidateClass: CollectionAfterChangeHook<Clase> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const listPath = getCollectionListUrl(COLLECTION_SLUG)

    if (doc._status === 'published') {
      const path = getCollectionUrl(COLLECTION_SLUG, doc.slug)

      payload.logger.info(`Revalidating class at path: ${path}`)

      revalidatePath(path)
      revalidatePath(listPath)
      revalidateTag(COLLECTION_SLUG)
    }

    // If the class was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = getCollectionUrl(COLLECTION_SLUG, previousDoc.slug)

      payload.logger.info(`Revalidating old class at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath(listPath)
      revalidateTag(COLLECTION_SLUG)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Clase> = ({
  doc,
  req: { context }
}) => {
  if (!context.disableRevalidate) {
    const path = getCollectionUrl(COLLECTION_SLUG, doc?.slug || '')
    const listPath = getCollectionListUrl(COLLECTION_SLUG)

    revalidatePath(path)
    revalidatePath(listPath)
    revalidateTag(COLLECTION_SLUG)
  }

  return doc
}