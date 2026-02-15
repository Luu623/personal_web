import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 backdrop-blur-xl transition-all dark:border-gray-800/50 dark:backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          aria-label={siteMetadata.headerTitle}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="h-6 w-6">
            <Logo />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {siteMetadata.headerTitle}
            </span>
          ) : (
            siteMetadata.headerTitle
          )}
        </Link>
        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 sm:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
          </nav>
          <div className="flex items-center gap-1 pl-2">
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
