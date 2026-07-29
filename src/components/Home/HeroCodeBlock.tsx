'use client'

import React, { useState } from 'react'

const sampleCurl = `curl https://api.keyvera.cloud/v1/chat/completions \\
  -H "Authorization: Bearer ***" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "anthropic/claude-sonnet-4",
    "messages": [{"role": "user", "content": "Hello"}]
  }'`

export function HeroCodeBlock() {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(sampleCurl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-black/40 text-left shadow-[var(--glow-blue)] backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="text-xs font-medium tracking-wide text-white/50 uppercase">
          Quick request
        </span>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-md px-2.5 py-1 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[0.8rem] leading-relaxed text-[#c6cdd9]">
        <code>{sampleCurl}</code>
      </pre>
    </div>
  )
}
