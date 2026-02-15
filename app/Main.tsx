import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import GitHubContributions from '@/components/GitHubContributions'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="mb-8">
            <Image
              src="/static/images/avatar.png"
              alt="Xiangyu Lu"
              width={120}
              height={120}
              className="rounded-full grayscale transition-all duration-300 hover:grayscale-0"
              priority
            />
          </div>

          {/* Name */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-gray-100">
            Xiangyu Lu
          </h1>

          {/* Subtitle */}
          <p className="mb-6 text-lg text-gray-600 sm:text-xl dark:text-gray-400">
            软件工程师 / Software Engineer
          </p>

          {/* Description */}
          <p className="mb-8 max-w-lg text-base leading-7 text-gray-500 sm:text-lg sm:leading-8 dark:text-gray-400">
            热爱编程，专注于构建优雅的用户体验。探索技术的无限可能，用代码创造价值。
          </p>

          {/* Location & Status */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              中国
            </span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Open to opportunities
            </span>
          </div>

          {/* Tech Stack Tags */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {['TypeScript', 'React', 'Next.js', 'Node.js', 'Python'].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            {siteMetadata.github && (
              <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            )}
            {siteMetadata.email && (
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
            )}
            {siteMetadata.x && <SocialIcon kind="x" href={siteMetadata.x} size={6} />}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 dark:border-gray-800"></div>
      </div>

      {/* GitHub Contributions */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h2 className="mb-4 text-sm font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
            GitHub Contributions
          </h2>
          <div className="w-full max-w-2xl">
            <GitHubContributions />
          </div>
        </div>
      </section>
    </div>
  )
}
