'use client'

import { useEffect, useState, useMemo } from 'react'
import { useTheme } from 'next-themes'

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ContributionWeek {
  days: ContributionDay[]
}

interface TooltipPosition {
  x: number
  y: number
  show: boolean
  content: string
}

interface ContributionsResponse {
  weeks: ContributionWeek[]
  totalContributions: number
}

// Generate mock contribution data for the past year (fallback)
function generateMockContributions(): ContributionWeek[] {
  const weeks: ContributionWeek[] = []
  const today = new Date()
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(today.getFullYear() - 1)

  // Find the Sunday of the week one year ago
  const startDate = new Date(oneYearAgo)
  startDate.setDate(startDate.getDate() - startDate.getDay())

  const currentDate = new Date(startDate)

  while (currentDate <= today) {
    const week: ContributionWeek = { days: [] }

    for (let i = 0; i < 7; i++) {
      if (currentDate <= today) {
        const count = Math.random() > 0.3 ? Math.floor(Math.random() * 15) : 0
        let level: 0 | 1 | 2 | 3 | 4 = 0

        if (count > 0 && count <= 3) level = 1
        else if (count > 3 && count <= 6) level = 2
        else if (count > 6 && count <= 9) level = 3
        else if (count > 9) level = 4

        week.days.push({
          date: currentDate.toISOString().split('T')[0],
          count,
          level,
        })
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }

    if (week.days.length > 0) {
      weeks.push(week)
    }
  }

  return weeks
}

// Calculate total contributions
function calculateTotalContributions(weeks: ContributionWeek[]): number {
  return weeks.reduce(
    (total, week) => total + week.days.reduce((sum, day) => sum + day.count, 0),
    0
  )
}

// Format date for display
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }
  return date.toLocaleDateString('zh-CN', options)
}

// Get month labels
function getMonthLabels(weeks: ContributionWeek[]): { month: string; index: number }[] {
  const months: { month: string; index: number }[] = []
  let currentMonth = -1

  weeks.forEach((week, index) => {
    if (week.days.length > 0) {
      const date = new Date(week.days[0].date)
      const month = date.getMonth()

      if (month !== currentMonth) {
        currentMonth = month
        months.push({
          month: date.toLocaleDateString('zh-CN', { month: 'short' }),
          index,
        })
      }
    }
  })

  return months
}

const levelColors = {
  light: {
    0: 'bg-gray-100 dark:bg-gray-800',
    1: 'bg-green-200 dark:bg-green-900',
    2: 'bg-green-400 dark:bg-green-700',
    3: 'bg-green-500 dark:bg-green-600',
    4: 'bg-green-600 dark:bg-green-500',
  },
  dark: {
    0: 'bg-gray-800',
    1: 'bg-green-900',
    2: 'bg-green-700',
    3: 'bg-green-600',
    4: 'bg-green-500',
  },
}

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

// Generate relative year options: This Year, This Year - 1, This Year - 2, etc.
function getYearOptions(): { label: string; year: number }[] {
  const currentYear = new Date().getFullYear()
  const options: { label: string; year: number }[] = []

  // Generate options for current year and past 4 years
  for (let i = 0; i < 5; i++) {
    const year = currentYear - i
    if (i === 0) {
      options.push({ label: 'This Year', year })
    } else {
      options.push({ label: `${year}`, year })
    }
  }

  return options
}

export default function GitHubContributions() {
  const [mounted, setMounted] = useState(false)
  const [weeks, setWeeks] = useState<ContributionWeek[]>([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<TooltipPosition>({
    x: 0,
    y: 0,
    show: false,
    content: '',
  })
  const [selectedYear, setSelectedYear] = useState<number>(() => {
    return new Date().getFullYear() // Default to this year
  })
  const yearOptions = useMemo(() => getYearOptions(), [])
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function fetchContributions() {
      setIsLoading(true)
      setError(null)
      try {
        const url = `/api/github/contributions?year=${selectedYear}`
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Failed to fetch contributions')
        }

        const data: ContributionsResponse = await response.json()
        setWeeks(data.weeks)
        setTotalContributions(data.totalContributions)
      } catch (err) {
        console.error('Error fetching contributions, using mock data:', err)
        setError('Using demo data')
        // Fallback to mock data
        const mockWeeks = generateMockContributions()
        setWeeks(mockWeeks)
        setTotalContributions(calculateTotalContributions(mockWeeks))
      } finally {
        setIsLoading(false)
      }
    }

    if (mounted) {
      fetchContributions()
    }
  }, [mounted, selectedYear])

  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks])

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, day: ContributionDay) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const containerRect = e.currentTarget
      .closest('.contributions-container')
      ?.getBoundingClientRect()

    if (containerRect) {
      setTooltip({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top - 10,
        show: true,
        content: `${day.count} contributions on ${formatDate(day.date)}`,
      })
    }
  }

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, show: false }))
  }

  if (!mounted || isLoading) {
    return (
      <div className="contributions-container rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="h-[160px] animate-pulse bg-gray-200 dark:bg-gray-700" />
      </div>
    )
  }

  return (
    <div className="contributions-container overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            <span className="text-primary-500">{totalContributions.toLocaleString()}</span>{' '}
            contributions in {selectedYear}
            {error && (
              <span className="ml-2 text-xs font-normal text-gray-400 dark:text-gray-500">
                ({error})
              </span>
            )}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {/* Year selector */}
          <div className="flex flex-wrap gap-1">
            {yearOptions.map((option) => (
              <button
                key={option.year}
                onClick={() => setSelectedYear(option.year)}
                className={`rounded px-2 py-1 text-xs transition-colors ${
                  selectedYear === option.year
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Month labels */}
        <div className="mb-1 flex" style={{ marginLeft: '30px' }}>
          {monthLabels.map(({ month, index }, i) => (
            <span
              key={`${month}-${index}`}
              className="text-[10px] text-gray-400 dark:text-gray-500"
              style={{
                position: 'relative',
                left: `${index * 14}px`,
                marginLeft: i === 0 ? 0 : '-1em',
              }}
            >
              {month}
            </span>
          ))}
        </div>

        <div className="flex">
          {/* Weekday labels */}
          <div className="mr-1 flex flex-col justify-around" style={{ height: '112px' }}>
            {weekdays.map((day, index) => (
              <span
                key={day}
                className="flex h-[14px] items-center text-[10px] text-gray-400 dark:text-gray-500"
              >
                {index % 2 === 1 ? day : ''}
              </span>
            ))}
          </div>

          {/* Contribution grid */}
          <div className="flex gap-[3px] overflow-x-auto">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.days.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`h-[11px] w-[11px] rounded-sm ${
                      resolvedTheme === 'dark'
                        ? levelColors.dark[day.level]
                        : levelColors.light[day.level]
                    } cursor-pointer transition-colors hover:ring-1 hover:ring-gray-400`}
                    onMouseEnter={(e) => handleMouseEnter(e, day)}
                    onMouseLeave={handleMouseLeave}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {tooltip.show && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full transform rounded-md bg-gray-900 px-2 py-1 text-xs text-white shadow-lg dark:bg-gray-100 dark:text-gray-900"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-end gap-1 text-[10px] text-gray-400 dark:text-gray-500">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-[10px] w-[10px] rounded-sm ${
              resolvedTheme === 'dark'
                ? levelColors.dark[level as 0 | 1 | 2 | 3 | 4]
                : levelColors.light[level as 0 | 1 | 2 | 3 | 4]
            }`}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
