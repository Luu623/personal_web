import Image from 'next/image'
import GitHubContributions from '@/components/GitHubContributions'
import GitHubProjects from '@/components/GitHubProjects'
import RecentBlogs from '@/components/RecentBlogs'
import WeChatIconButton from '@/components/WeChatIconButton'
import siteMetadata from '@/data/siteMetadata'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Main Content - Two Column Layout */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Personal Info + Contributions */}
          <div className="space-y-8">
            {/* Personal Info */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {/* Avatar */}
              <div className="mb-6">
                <Image
                  src="/static/images/avatar.jpg"
                  alt="Xiangyu Lu"
                  width={100}
                  height={100}
                  className="rounded-full grayscale-0 transition-all duration-300 hover:grayscale-0"
                  priority
                />
              </div>

              {/* Name */}
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
                Xiangyu Lu
              </h1>

              {/* Subtitle */}
              <p className="mb-4 text-base text-gray-600 sm:text-lg dark:text-gray-400">
                软件工程师 / Software Engineer
              </p>

              {/* Description */}
              <p className="mb-6 max-w-md text-sm leading-7 text-gray-500 sm:text-base sm:leading-7 dark:text-gray-400">
                热爱编程，专注于构建优雅的用户体验。探索技术的无限可能，用代码创造价值。
              </p>

              {/* Location & Status */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 lg:justify-start dark:text-gray-400">
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
                  安徽·芜湖
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  Open to opportunities
                </span>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex items-center gap-4">
                <a
                  href="https://github.com/Luu623"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="mailto:yu187629@gmail.com"
                  className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
                <a
                  href="https://x.com/y9840836216317"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {siteMetadata.wechat && (
                  <WeChatIconButton
                    qrCodeUrl={siteMetadata.wechat.qrCode}
                    wechatId={siteMetadata.wechat.id}
                    size={5}
                    className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                  />
                )}
              </div>
            </div>

            {/* GitHub Contributions */}
            <div className="w-full">
              <GitHubContributions />
            </div>
          </div>

          {/* Right Column - GitHub Projects */}
          <div className="lg:pt-16">
            <GitHubProjects />
          </div>
        </div>
      </section>

      {/* Recent Blogs Section */}
      <RecentBlogs limit={5} />
    </div>
  )
}
