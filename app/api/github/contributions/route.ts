import { NextResponse } from 'next/server'

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ContributionWeek {
  days: ContributionDay[]
}

interface GitHubContributionDay {
  contributionCount: number
  date: string
}

interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[]
}

// Calculate level based on contribution count
function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}

// Transform GitHub API response to our format
function transformContributions(weeks: GitHubContributionWeek[]): ContributionWeek[] {
  return weeks.map((week) => ({
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: getLevel(day.contributionCount),
    })),
  }))
}

export async function GET() {
  const username = 'Luu623'
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 })
  }

  // Calculate date range (past year)
  const today = new Date()
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(today.getFullYear() - 1)

  // GitHub GraphQL API expects ISO 8601 format
  const fromDate = oneYearAgo.toISOString()
  const toDate = today.toISOString()

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: fromDate,
          to: toDate,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'GraphQL error')
    }

    const contributionsCollection = data.data?.user?.contributionsCollection?.contributionCalendar

    if (!contributionsCollection) {
      throw new Error('No contribution data found')
    }

    const weeks = transformContributions(contributionsCollection.weeks)
    const totalContributions = contributionsCollection.totalContributions

    return NextResponse.json({
      weeks,
      totalContributions,
    })
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 })
  }
}
