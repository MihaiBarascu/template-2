import React from 'react'
import Link from 'next/link'
import type { Schedule as ScheduleType, Class, TeamMember } from '@/payload-types'

type ScheduleEntry = NonNullable<ScheduleType['entries']>[0]

interface ScheduleProps {
  schedule: ScheduleType | null
  className?: string
}

const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const dayNames: Record<string, string> = {
  monday: 'Luni',
  tuesday: 'Marți',
  wednesday: 'Miercuri',
  thursday: 'Joi',
  friday: 'Vineri',
  saturday: 'Sâmbătă',
  sunday: 'Duminică',
}

// Generează array de ore bazat pe setări
const generateTimeSlots = (startHour: string, endHour: string): string[] => {
  const slots: string[] = []
  const [startH] = startHour.split(':').map(Number)
  const [endH] = endHour.split(':').map(Number)

  for (let hour = startH; hour <= endH; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`)
  }

  return slots
}

export const Schedule: React.FC<ScheduleProps> = ({ schedule, className = '' }) => {
  if (!schedule || !schedule.entries || schedule.entries.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Nu există un orar disponibil momentan.</p>
      </div>
    )
  }

  const startHour = schedule.settings?.startHour || '07:00'
  const endHour = schedule.settings?.endHour || '21:00'
  const timeSlots = generateTimeSlots(startHour, endHour)

  // Organizează intrările pe zile și ore - permite multiple clase per slot
  const scheduleGrid: Record<string, Record<string, ScheduleEntry[]>> = {}

  schedule.entries.forEach((entry) => {
    if (!entry.day || !entry.time) return

    if (!scheduleGrid[entry.day]) {
      scheduleGrid[entry.day] = {}
    }
    if (!scheduleGrid[entry.day][entry.time]) {
      scheduleGrid[entry.day][entry.time] = []
    }
    scheduleGrid[entry.day][entry.time].push(entry)
  })

  return (
    <div className={`schedule-component ${className}`}>
      {/* Titlu și descriere */}
      <div className="text-center mb-8">
        {schedule.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-transilvania-dark mb-4">
            {schedule.title}
          </h2>
        )}
        {schedule.description && (
          <p className="text-transilvania-text max-w-2xl mx-auto">
            {schedule.description}
          </p>
        )}
      </div>

      {/* Tabel Orar - Design inspirat Gymso */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="bg-transilvania-dark text-white p-4 text-left font-bold">
                Ora
              </th>
              {dayOrder.map((day) => (
                <th key={day} className="bg-transilvania-dark text-white p-4 text-center font-bold">
                  {dayNames[day]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time} className="border-b border-gray-200">
                <td className="bg-gray-50 p-4 font-bold text-transilvania-dark">
                  {time}
                </td>
                {dayOrder.map((day) => {
                  const entries = scheduleGrid[day]?.[time]

                  if (!entries || entries.length === 0) {
                    return (
                      <td key={`${day}-${time}`} className="p-4 bg-white hover:bg-gray-50 transition-colors">
                        {/* Celulă goală */}
                      </td>
                    )
                  }

                  return (
                    <td key={`${day}-${time}`} className="p-0">
                      <ScheduleEntriesCell entries={entries} />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Componentă pentru celulă cu multiple clase
const ScheduleEntriesCell: React.FC<{ entries: ScheduleEntry[] }> = ({ entries }) => {
  // Dacă avem o singură clasă, afișăm normal
  if (entries.length === 1) {
    return <SingleEntryCell entry={entries[0]} />
  }

  // Pentru multiple clase, le afișăm stacked sau side by side
  return (
    <div className="p-2 space-y-2">
      {entries.map((entry, index) => (
        <SingleEntryCell key={index} entry={entry} compact />
      ))}
    </div>
  )
}

// Componentă pentru o singură intrare
const SingleEntryCell: React.FC<{ entry: ScheduleEntry; compact?: boolean }> = ({ entry, compact = false }) => {
  const isLinked = entry.entryType === 'linked'
  const classData = isLinked && entry.class ? entry.class as Class : null
  const trainerData = isLinked && entry.overrideTrainer
    ? entry.overrideTrainer as TeamMember
    : classData?.trainer as TeamMember | null

  // Extrage informațiile de afișat
  const title = isLinked ? classData?.title : entry.customTitle
  const trainer = isLinked
    ? (trainerData?.title || trainerData?.role)
    : entry.customTrainer
  const duration = isLinked
    ? classData?.duration
    : entry.customDuration
  const color = entry.customColor || '#f13a11' // Transilvania primary ca default

  const content = (
    <div
      className={`${
        compact ? 'p-3 min-h-[80px]' : 'p-4 min-h-[100px]'
      } h-full flex flex-col justify-center text-center transition-all duration-300 hover:shadow-lg cursor-pointer rounded-md`}
      style={{
        backgroundColor: `${color}15`,
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div className={`font-bold text-transilvania-dark ${compact ? 'text-sm' : 'mb-1'}`}>
        {title}
      </div>
      {trainer && !compact && (
        <div className="text-sm text-transilvania-text">
          {trainer}
        </div>
      )}
      {duration && !compact && (
        <div className="text-xs text-gray-500 mt-1">
          {duration} min
        </div>
      )}
      {compact && trainer && (
        <div className="text-xs text-gray-600 mt-1">
          {trainer} • {duration}min
        </div>
      )}
    </div>
  )

  // Dacă e linked și avem slug, fă-l clickable
  if (isLinked && classData?.slug) {
    return (
      <Link
        href={`/classes/${classData.slug}`}
        className="block h-full group"
      >
        <div className="group-hover:scale-[1.02] transition-transform">
          {content}
        </div>
      </Link>
    )
  }

  // Altfel, doar afișează conținutul
  return content
}

export default Schedule