import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidatePaginiAbonamente: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating pagini-abonamente settings`)

    revalidateTag('global_pagini-abonamente')
    revalidatePath('/abonamente', 'page')
  }

  return doc
}
