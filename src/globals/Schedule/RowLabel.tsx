'use client'
import React from 'react'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

interface ScheduleEntryData {
  day?: string
  time?: string
  customTitle?: string
  class?: unknown
}

export const RowLabel: React.FC<RowLabelProps> = () => {
  const { data } = useRowLabel()

  const days: Record<string, string> = {
    monday: 'Luni',
    tuesday: 'Marți',
    wednesday: 'Miercuri',
    thursday: 'Joi',
    friday: 'Vineri',
    saturday: 'Sâmbătă',
    sunday: 'Duminică',
  }

  if (!data) return `Intrare nouă`

  const entryData = data as ScheduleEntryData
  const dayName = entryData.day ? days[entryData.day] || entryData.day : ''
  const time = entryData.time || ''
  const title = entryData.customTitle || (entryData.class ? 'Clasă linkată' : '')

  return `${dayName} ${time} - ${title}`
}