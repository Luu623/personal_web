'use client'

import { useState } from 'react'
import { WeChat } from './social-icons/icons'
import WeChatQrCode from './WeChatQrCode'

interface WeChatIconButtonProps {
  qrCodeUrl: string
  wechatId: string
  size?: number
}

export default function WeChatIconButton({ qrCodeUrl, wechatId, size = 6 }: WeChatIconButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!qrCodeUrl || !wechatId) return null

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-gray-500 transition hover:text-gray-600"
        aria-label="微信"
      >
        <WeChat
          className={`hover:text-primary-500 dark:hover:text-primary-400 fill-current text-gray-700 dark:text-gray-200 h-${size} w-${size}`}
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
