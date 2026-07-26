import type { ReactNode } from 'react'
import TabBar from '@/components/app/TabBar'
import PrototypeNotice from '@/components/app/PrototypeNotice'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bb-app-viewport">
      <PrototypeNotice />

      <div className="bb-app-phone">
        <div className="bb-notch" aria-hidden="true" />

        {/* faux status bar: 9:41 is the standard mockup time */}
        <div className="bb-statusbar" aria-hidden="true">
          <span>9:41</span>
          <span className="bb-statusbar-icons">
            <svg width="17" height="11" viewBox="0 0 18 12" fill="currentColor">
              <rect x="0" y="8" width="3" height="4" rx="1" />
              <rect x="5" y="5" width="3" height="7" rx="1" />
              <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
              <rect x="15" y="0" width="3" height="12" rx="1" />
            </svg>
            <svg width="16" height="11" viewBox="0 0 16 12" fill="currentColor">
              <path d="M8 2.6c2.3 0 4.4.9 6 2.4l-1.4 1.5A6.6 6.6 0 0 0 8 5.6c-1.8 0-3.4.7-4.6 1.9L2 6C3.6 4.5 5.7 3.6 8 3.6Z" opacity="0.9" />
              <path d="M8 7c1.1 0 2.1.4 2.9 1.2L8 11 5.1 8.2A4.1 4.1 0 0 1 8 7Z" />
            </svg>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                <rect x="0.5" y="1" width="20" height="10" rx="2.5" stroke="currentColor" opacity="0.4" />
                <rect x="2" y="2.5" width="15" height="7" rx="1.3" fill="currentColor" />
                <rect x="21.5" y="4" width="1.6" height="4" rx="0.8" fill="currentColor" opacity="0.4" />
              </svg>
            </span>
          </span>
        </div>

        <div className="bb-app-scroll">{children}</div>

        <TabBar />
      </div>
    </div>
  )
}
