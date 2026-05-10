'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function SplashScreen() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('bb_splash')) {
      sessionStorage.setItem('bb_splash', '1')
      setVisible(true)
      const t = setTimeout(() => setVisible(false), 1900)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#FAF5F0',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '1rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/bitebooklogo-new.png"
              alt="bitebook"
              width={230}
              height={92}
              style={{ objectFit: 'contain' }}
              priority
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{ fontSize: '0.72rem', color: '#B8848F', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            your bites, your story
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
