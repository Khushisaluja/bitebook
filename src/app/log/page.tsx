import LogWizard from '@/components/log/LogWizard'

export default function LogPage() {
  return (
    <main style={{ paddingTop: 64, minHeight: '100vh', background: '#FAF5F0' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '3rem 1.5rem 1rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#1A1015', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
          log a bite
        </h1>
        <p style={{ fontSize: '1rem', color: '#7A6268', marginBottom: '2.5rem' }}>
          capture what you ate, where, and how it felt.
        </p>
        <LogWizard />
      </div>
    </main>
  )
}
