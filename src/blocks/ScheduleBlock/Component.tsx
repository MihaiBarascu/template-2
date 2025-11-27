import React from 'react'
import type { Schedule as ScheduleType, BusinessInfo as BusinessInfoType } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getSpacingClasses } from '@/fields/spacing'
import { AnimatedSchedule } from './AnimatedSchedule'
import { SimpleSchedule } from './SimpleSchedule'

interface SpacingConfig {
  marginTop?: string | null
  marginBottom?: string | null
}

interface SimpleHour {
  days?: string | null
  hours?: string | null
}

interface ScheduleEntry {
  day?: string | null
  time?: string | null
  endTime?: string | null
  className?: string | null
  trainer?: string | null
}

interface ScheduleBlockProps {
  scheduleType?: 'simpleGlobal' | 'advancedGlobal' | 'simpleCustom' | 'advancedCustom' | null
  title?: string | null
  simpleHours?: SimpleHour[] | null
  scheduleEntries?: ScheduleEntry[] | null
  style?: 'default' | 'compact' | 'card' | null
  spacing?: SpacingConfig | null
  // Legacy support
  schedule?: ScheduleType | string | number
  customTitle?: string
  blockType?: string
}

type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

const dayLabels: Record<DayKey, string> = {
  monday: 'LUN',
  tuesday: 'MAR',
  wednesday: 'MIE',
  thursday: 'JOI',
  friday: 'VIN',
  saturday: 'SÂM',
  sunday: 'DUM',
}

const days: DayKey[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export const ScheduleBlock: React.FC<ScheduleBlockProps> = async ({
  scheduleType = 'simpleGlobal',
  title,
  simpleHours,
  scheduleEntries,
  style = 'default',
  spacing,
  // Legacy props
  schedule,
  customTitle,
}) => {
  const spacingClass = getSpacingClasses(spacing)

  // ===============================
  // GLOBAL DATA FETCH
  // ===============================
  let businessInfo: BusinessInfoType | null = null

  if (scheduleType === 'simpleGlobal' || scheduleType === 'advancedGlobal') {
    const payload = await getPayload({ config: configPromise })
    businessInfo = await payload.findGlobal({ slug: 'business-info' }) as BusinessInfoType
  }

  // ===============================
  // SIMPLE SCHEDULE (Working Hours)
  // ===============================
  if (scheduleType === 'simpleGlobal' || scheduleType === 'simpleCustom') {
    const hoursData =
      scheduleType === 'simpleGlobal'
        ? businessInfo?.workingHours || []
        : simpleHours || []

    const scheduleTitle = title || 'Program de Lucru'

    if (!hoursData || hoursData.length === 0) {
      return (
        <section className={`py-16 ${spacingClass}`}>
          <div className="container">
            <div className="text-center text-gray-400">
              <p>Programul nu este disponibil momentan.</p>
            </div>
          </div>
        </section>
      )
    }

    return (
      <SimpleSchedule
        title={scheduleTitle}
        hours={hoursData as SimpleHour[]}
        style={style}
        spacingClass={spacingClass}
      />
    )
  }

  // ===============================
  // ADVANCED SCHEDULE (Class Grid)
  // ===============================
  let entries: ScheduleEntry[] = []
  let scheduleTitle = title || 'Orar Săptămânal'

  if (scheduleType === 'advancedGlobal') {
    entries = (businessInfo?.scheduleEntries || []) as ScheduleEntry[]
    scheduleTitle = title || businessInfo?.scheduleTitle || 'Orar Săptămânal'
  } else if (scheduleType === 'advancedCustom') {
    entries = scheduleEntries || []
  } else if (schedule) {
    // Legacy support - fetch from Schedules collection
    let scheduleData: ScheduleType | null = null

    if (typeof schedule === 'object' && schedule !== null) {
      scheduleData = schedule
    } else {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.findByID({
        collection: 'schedules',
        id: String(schedule),
      })
      scheduleData = result as ScheduleType
    }

    if (scheduleData) {
      entries = (scheduleData.entries || []) as ScheduleEntry[]
      scheduleTitle = customTitle || scheduleData.title || 'Orar Săptămânal'
    }
  }

  if (!entries || entries.length === 0) {
    return (
      <section className={`schedule py-16 ${spacingClass}`}>
        <div className="container">
          <div className="text-center text-gray-400">
            <p>Orarul nu este disponibil momentan.</p>
          </div>
        </div>
      </section>
    )
  }

  // Group entries by time slot
  const timeSlots = new Map<string, Map<DayKey, ScheduleEntry>>()

  entries.forEach((entry) => {
    if (!entry.time || !entry.day) return

    const time = entry.time
    if (!timeSlots.has(time)) {
      timeSlots.set(time, new Map())
    }
    timeSlots.get(time)!.set(entry.day as DayKey, entry)
  })

  // Sort time slots
  const sortedTimes = Array.from(timeSlots.keys()).sort((a, b) => {
    const [aHour] = a.split(':').map(Number)
    const [bHour] = b.split(':').map(Number)
    return aHour - bHour
  })

  // Format time for display (24h Romanian format)
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':')
    return `${hour.padStart(2, '0')}:${minute}`
  }

  return (
    <section className={`schedule py-16 md:py-20 ${spacingClass}`}>
      <div className="container">
        <AnimatedSchedule title={scheduleTitle}>
          <table className="schedule-table w-full">
            <thead>
              <tr>
                <th className="schedule-time-header">
                  <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </th>
                {days.map((day) => (
                  <th key={day} className="schedule-day-header">
                    {dayLabels[day]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedTimes.map((time) => {
                const entriesForTime = timeSlots.get(time)!

                return (
                  <tr key={time}>
                    <td className="schedule-time-cell">
                      <small>{formatTime(time)}</small>
                    </td>
                    {days.map((day) => {
                      const entry = entriesForTime.get(day)

                      if (!entry) {
                        return <td key={day} className="schedule-cell"></td>
                      }

                      const endTime = entry.endTime || ''
                      const timeRange = endTime
                        ? `${formatTime(entry.time!)} - ${formatTime(endTime)}`
                        : formatTime(entry.time!)

                      return (
                        <td key={day} className="schedule-cell">
                          <strong>{entry.className}</strong>
                          <span>{timeRange}</span>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </AnimatedSchedule>
      </div>
    </section>
  )
}
