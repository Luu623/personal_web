import { NextResponse } from 'next/server'

interface GitHubRepository {
  name: string
  description: string | null
  url: string
  stargazerCount: number
  forkCount: number
  primaryLanguage: {
    name: string
    color: string
  } | null
  isArchived: boolean
  isFork: boolean
  pushedAt: string
  homepageUrl: string | null
}

interface RepositoriesResponse {
  repositories: GitHubRepository[]
}

export async function GET() {
  const username = 'Luu623'
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 })
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        repositories(
          first: 20
          orderBy: { field: STARGAZERS, direction: DESC }
          ownerAffiliations: OWNER
          privacy: PUBLIC
        ) {
          nodes {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            isArchived
            isFork
            pushedAt
            homepageUrl
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
        variables: { username },
      }),
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'GraphQL error')
    }

    const repositories = data.data?.user?.repositories?.nodes || []

    // Filter out forks and archived repos, then sort by stars
    const filteredRepos = repositories
      .filter((repo: GitHubRepository) => !repo.isFork && !repo.isArchived)
      .slice(0, 10)

    return NextResponse.json({ repositories: filteredRepos } as RepositoriesResponse)
  } catch (error) {
    console.error('Error fetching GitHub projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
