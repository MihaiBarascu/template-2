import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { TeamMember } from '../../../payload-types'

export const revalidateTeamMember: CollectionAfterChangeHook<TeamMember> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/team-members/${doc.slug}`

      payload.logger.info(`Revalidating team member at path: ${path}`)

      revalidatePath(path)
      revalidatePath('/team-members')
      revalidateTag('team-members')
    }

    // If the team member was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/team-members/${previousDoc.slug}`

      payload.logger.info(`Revalidating old team member at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/team-members')
      revalidateTag('team-members')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<TeamMember> = ({
  doc,
  req: { context }
}) => {
  if (!context.disableRevalidate) {
    const path = `/team-members/${doc?.slug}`

    revalidatePath(path)
    revalidatePath('/team-members')
    revalidateTag('team-members')
  }

  return doc
}