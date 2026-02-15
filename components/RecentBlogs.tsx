import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer.js'

interface Post {
  slug: string
  title: string
  date: string
  summary?: string
  tags?: string[]
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function RecentBlogs({ limit = 5 }: { limit?: number }) {
  const sortedPosts = sortPosts(allBlogs.filter((p) => !p.draft))
  const posts = allCoreContent(sortedPosts).slice(0, limit) as Post[]

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Recent Posts</h2>
        <Link
          href="/blog"
          className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
        >
          View all &rarr;
        </Link>
      </div>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group hover:border-primary-300 dark:hover:border-primary-600 block rounded-lg border border-gray-200 bg-white p-5 transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 font-semibold text-gray-900 dark:text-gray-100">
                  {post.title}
                </h3>
                {post.summary && (
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                    {post.summary}
                  </p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <time className="mt-2 flex-shrink-0 text-sm text-gray-400 sm:mt-0 dark:text-gray-500">
                {formatDate(post.date)}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
