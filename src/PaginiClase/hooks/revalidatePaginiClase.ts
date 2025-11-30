import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidatePaginiClase: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating pagini-clase settings`)

    revalidateTag('global_pagini-clase')
    revalidatePath('/clase', 'page')
  }

  return doc
}
