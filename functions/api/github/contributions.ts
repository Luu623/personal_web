interface Env {
  GITHUB_TOKEN: string
}

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

interface GraphQLResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number
          weeks: GitHubContributionWeek[]
        }
      }
    }
  }
  errors?: { message?: string }[]
}

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}

function transformContributions(weeks: GitHubContributionWeek[]): ContributionWeek[] {
  return weeks.map((week) => ({
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: getLevel(day.contributionCount),
    })),
  }))
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const username = 'Luu623'
  const token = context.env.GITHUB_TOKEN

  if (!token) {
    return new Response(JSON.stringify({ error: 'GitHub token not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const url = new URL(context.request.url)
  const yearParam = url.searchParams.get('year')

  let fromDate: string
  let toDate: string

  if (yearParam) {
    const year = parseInt(yearParam, 10)
    if (isNaN(year) || year < 2008 || year > new Date().getFullYear()) {
      return new Response(JSON.stringify({ error: 'Invalid year parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    fromDate = new Date(year, 0, 1).toISOString()
    toDate = new Date(year, 11, 31, 23, 59, 59).toISOString()
  } else {
    const today = new Date()
    const oneYearAgo = new Date(today)
    oneYearAgo.setFullYear(today.getFullYear() - 1)
    fromDate = oneYearAgo.toISOString()
    toDate = today.toISOString()
  }

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

    const data = (await response.json()) as GraphQLResponse

    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'GraphQL error')
    }

    const contributionsCollection = data.data?.user?.contributionsCollection?.contributionCalendar

    if (!contributionsCollection) {
      throw new Error('No contribution data found')
    }

    const weeks = transformContributions(contributionsCollection.weeks)
    const totalContributions = contributionsCollection.totalContributions

    return new Response(JSON.stringify({ weeks, totalContributions }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch contributions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
