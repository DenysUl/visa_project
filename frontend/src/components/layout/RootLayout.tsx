import type { ReactNode } from 'react'
import ContactWidget from './ContactWidget'
import Footer from './Footer'
import Header from './Header'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ContactWidget />
    </>
  )
}
