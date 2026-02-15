interface Env {
  GITHUB_TOKEN: string
}

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

interface GraphQLProjectsResponse {
  data?: {
    user?: {
      repositories?: {
        nodes: GitHubRepository[]
      }
    }
  }
  errors?: { message?: string }[]
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
        'User-Agent': 'Luu623-Personal-Web',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = (await response.json()) as GraphQLProjectsResponse

    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'GraphQL error')
    }

    const repositories = data.data?.user?.repositories?.nodes || []

    const filteredRepos = repositories
      .filter((repo: GitHubRepository) => !repo.isFork && !repo.isArchived)
      .slice(0, 10)

    return new Response(JSON.stringify({ repositories: filteredRepos } as RepositoriesResponse), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Error fetching GitHub projects:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch projects' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
