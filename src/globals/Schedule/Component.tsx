import React from 'react'
import Link from 'next/link'
import type { Schedule as ScheduleType, Class, TeamMember } from '@/payload-types'

type ScheduleEntry = NonNullable<ScheduleType['entries']>[0]

interface ScheduleProps {
  schedule: ScheduleType | null
  designTheme?: 'default' | 'transilvania'
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

export const Schedule: React.FC<ScheduleProps> = ({ schedule, designTheme = 'default', className = '' }) => {
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

      {/* Tabel Orar - Design condiționat */}
      <div className="overflow-x-auto">
        <table className={`w-full border-collapse min-w-[800px] ${
          designTheme === 'transilvania' ? 'bg-transilvania-dark' : ''
        }`}>
          <thead>
            <tr>
              <th className={`p-4 text-left font-bold ${
                designTheme === 'transilvania'
                  ? 'bg-transilvania-primary text-white'
                  : 'bg-transilvania-dark text-white'
              }`}>
                <span className="flex items-center justify-center text-2xl">📅</span>
              </th>
              {dayOrder.map((day) => (
                <th key={day} className={`p-4 text-center font-bold uppercase ${
                  designTheme === 'transilvania'
                    ? 'bg-transilvania-primary text-white'
                    : 'bg-transilvania-dark text-white'
                }`}>
                  {dayNames[day].substring(0, 3).toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time} className={
                designTheme === 'transilvania'
                  ? ''
                  : 'border-b border-gray-200'
              }>
                <td className={`p-4 font-bold ${
                  designTheme === 'transilvania'
                    ? 'bg-transilvania-primary text-white'
                    : 'bg-gray-50 text-transilvania-dark'
                }`}>
                  {time}
                </td>
                {dayOrder.map((day) => {
                  const entries = scheduleGrid[day]?.[time]

                  if (!entries || entries.length === 0) {
                    return (
                      <td key={`${day}-${time}`} className={`p-4 ${
                        designTheme === 'transilvania'
                          ? 'bg-transilvania-dark border border-gray-800'
                          : 'bg-white hover:bg-gray-50 transition-colors'
                      }`}>
                        {/* Celulă goală */}
                      </td>
                    )
                  }

                  return (
                    <td key={`${day}-${time}`} className={
                      designTheme === 'transilvania'
                        ? 'p-0 bg-transilvania-dark border border-gray-800'
                        : 'p-0'
                    }>
                      <ScheduleEntriesCell entries={entries} theme={designTheme} />
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
const ScheduleEntriesCell: React.FC<{ entries: ScheduleEntry[]; theme?: string }> = ({ entries, theme = 'default' }) => {
  // Dacă avem o singură clasă, afișăm normal
  if (entries.length === 1) {
    return <SingleEntryCell entry={entries[0]} theme={theme} />
  }

  // Pentru multiple clase, le afișăm stacked sau side by side
  return (
    <div className="p-2 space-y-2">
      {entries.map((entry, index) => (
        <SingleEntryCell key={index} entry={entry} compact theme={theme} />
      ))}
    </div>
  )
}

// Componentă pentru o singură intrare
const SingleEntryCell: React.FC<{ entry: ScheduleEntry; compact?: boolean; theme?: string }> = ({ entry, compact = false, theme = 'default' }) => {
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

  // Calculăm timpul pentru tema Transilvania
  const startTime = entry.time || '07:00'
  const [hour, minute] = startTime.split(':').map(Number)
  const durationMinutes = duration || 60
  const totalMinutes = hour * 60 + minute + durationMinutes
  const endHour = Math.floor(totalMinutes / 60)
  const endMinute = totalMinutes % 60
  const timeRange = `${startTime} - ${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`

  // Stiluri diferite pentru fiecare temă
  const content = theme === 'transilvania' ? (
    <div
      className={`${
        compact ? 'p-3 min-h-[80px]' : 'p-4 min-h-[100px]'
      } h-full flex flex-col justify-center text-center transition-all duration-300 hover:opacity-90 cursor-pointer bg-transilvania-primary rounded`}
    >
      <div className={`font-bold text-white ${compact ? 'text-sm' : 'text-base mb-1'}`}>
        {title}
      </div>
      {trainer && (
        <div className="text-xs text-white/90 mb-1">
          {trainer}
        </div>
      )}
      <div className="text-xs text-white/80">
        {timeRange}
      </div>
    </div>
  ) : (
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