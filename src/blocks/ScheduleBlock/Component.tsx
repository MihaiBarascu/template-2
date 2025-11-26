import React from 'react'
import type { Schedule as ScheduleType } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

interface ScheduleBlockProps {
  schedule?: ScheduleType | string | number
  customTitle?: string
  blockType?: string
}

type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

const dayLabels: Record<DayKey, string> = {
  monday: 'MON',
  tuesday: 'TUE',
  wednesday: 'WED',
  thursday: 'THU',
  friday: 'FRI',
  saturday: 'SAT',
  sunday: 'SUN',
}

const days: DayKey[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export const ScheduleBlock: React.FC<ScheduleBlockProps> = async ({
  schedule,
  customTitle,
}) => {
  // Fetch schedule data if it's an ID
  let scheduleData: ScheduleType | null = null

  if (typeof schedule === 'object' && schedule !== null) {
    scheduleData = schedule
  } else if (schedule) {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.findByID({
      collection: 'schedules',
      id: String(schedule),
    })
    scheduleData = result as ScheduleType
  }

  if (!scheduleData || !scheduleData.entries || scheduleData.entries.length === 0) {
    return (
      <section className="schedule py-16">
        <div className="container">
          <div className="text-center text-gray-400">
            <p>Orarul nu este disponibil momentan.</p>
          </div>
        </div>
      </section>
    )
  }

  const title = customTitle || scheduleData.title || 'Orar Săptămânal'

  // Group entries by time slot
  const timeSlots = new Map<string, Map<DayKey, typeof scheduleData.entries[0]>>()

  scheduleData.entries.forEach((entry) => {
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

  // Format time for display
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':')
    const h = parseInt(hour)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
    return `${h12}:${minute} ${ampm}`
  }

  return (
    <section className="schedule py-16">
      <div className="container">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-white text-3xl font-bold">{title}</h2>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto">
          <table className="schedule-table w-full">
            <thead>
              <tr>
                <th className="schedule-time-header">
                  <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
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
        </div>
      </div>
    </section>
  )
}
