import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import WeChatIconButton from '@/components/WeChatIconButton'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/50 dark:border-gray-800/50">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-6">
        <div className="flex items-center gap-3">
          <SocialIcon kind="github" href={siteMetadata.github} size={5} />
          {siteMetadata.email && (
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
          )}
          {siteMetadata.twitter && (
            <SocialIcon kind="twitter" href={siteMetadata.twitter} size={5} />
          )}
          {siteMetadata.linkedin && (
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
          )}
          {siteMetadata.wechat && (
            <WeChatIconButton
              qrCodeUrl={siteMetadata.wechat.qrCode}
              wechatId={siteMetadata.wechat.id}
              size={5}
            />
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>{`© ${new Date().getFullYear()}`}</span>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">
            {siteMetadata.author}
          </Link>
        </div>
      </div>
    </footer>
  )
}
