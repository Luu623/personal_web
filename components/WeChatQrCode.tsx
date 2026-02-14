'use client'

import { Dialog, DialogPanel } from '@headlessui/react'
import Image from 'next/image'
import { useState } from 'react'

interface WeChatQrCodeProps {
  isOpen: boolean
  onClose: () => void
  qrCodeUrl: string
  wechatId: string
}

export default function WeChatQrCode({ isOpen, onClose, qrCodeUrl, wechatId }: WeChatQrCodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wechatId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = wechatId
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Centered container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            aria-label="关闭"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* QR Code */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4 h-48 w-48 overflow-hidden rounded-lg bg-gray-100">
              <Image src={qrCodeUrl} alt="微信二维码" fill className="object-contain" unoptimized />
            </div>

            {/* WeChat ID */}
            <div className="w-full">
              <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400">微信号</p>
              <div className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-700">
                <span className="font-mono text-lg font-medium text-gray-900 dark:text-white">
                  {wechatId}
                </span>
                <button
                  onClick={handleCopy}
                  className="hover:text-primary-500 dark:hover:text-primary-400 rounded p-1 text-gray-400"
                  aria-label="复制微信号"
                >
                  {copied ? (
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
              扫描二维码或复制微信号添加好友
            </p>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
