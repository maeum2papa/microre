import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../app/components/Header'
import Nav from './components/Nav'
import Footer from '../app/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>마이크로 바이크 리콜 접수</title>
      </head>
      <body>
        <main>
          <Header />
          <Nav />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
