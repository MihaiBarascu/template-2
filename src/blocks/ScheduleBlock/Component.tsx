import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Schedule as ScheduleComponent } from '@/globals/Schedule/Component'

interface ScheduleBlockProps {
  displayMode?: 'full' | 'compact'
  customTitle?: string
  blockType?: string
}

export const ScheduleBlock: React.FC<ScheduleBlockProps> = async ({
  displayMode = 'full',
  customTitle
}) => {
  const scheduleGlobal = await getCachedGlobal('schedule', 1)()

  // Type guard to ensure we have the Schedule global
  if (!scheduleGlobal || !('entries' in scheduleGlobal)) {
    return (
      <div className="container py-16">
        <div className="text-center text-gray-500">
          <p>Orarul nu este disponibil momentan.</p>
        </div>
      </div>
    )
  }

  const schedule = scheduleGlobal as any

  // Modifică schedule cu titlu custom dacă e cazul
  const scheduleData = customTitle
    ? { ...schedule, title: customTitle }
    : schedule

  return (
    <section className="py-16 bg-gray-50">
      <div className={displayMode === 'compact' ? 'container max-w-4xl' : 'container'}>
        <ScheduleComponent
          schedule={scheduleData}
          className={displayMode === 'compact' ? 'schedule-compact' : ''}
        />
      </div>
    </section>
  )
}