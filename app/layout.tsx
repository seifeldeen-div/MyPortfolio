import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] })
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Seif Eldeen Mohamed Attia | Frontend Developer',
  description: 'Highly motivated software engineer and React front-end developer with hands-on experience in web development and problem-solving. Completed 10+ projects and solved 200+ programming challenges.',
  keywords: ['frontend developer', 'react developer', 'web developer', 'software engineer', 'Seif Eldeen'],
  authors: [{ name: 'Seif Eldeen Mohamed Attia' }],
  openGraph: {
    title: 'Seif Eldeen Mohamed Attia | Frontend Developer',
    description: 'Software Engineer & React Frontend Developer based in Egypt. Building responsive, performant web applications.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0e27',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
