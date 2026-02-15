'use client'

import { useState } from 'react'
import { WeChat } from './social-icons/icons'
import WeChatQrCode from './WeChatQrCode'

interface WeChatIconButtonProps {
  qrCodeUrl: string
  wechatId: string
  size?: number
  className?: string
}

export default function WeChatIconButton({
  qrCodeUrl,
  wechatId,
  size = 6,
  className,
}: WeChatIconButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!qrCodeUrl || !wechatId) return null

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={className ?? 'text-sm text-gray-500 transition'}
        aria-label="微信"
      >
        <WeChat
          className={`fill-current ${className ? '' : 'hover:text-primary-500 dark:hover:text-primary-400 text-gray-700 dark:text-gray-200'} h-${size} w-${size}`}
        />
      </button>
      <WeChatQrCode
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        qrCodeUrl={qrCodeUrl}
        wechatId={wechatId}
      />
    </>
  )
}
