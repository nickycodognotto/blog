import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from "@/app/components/navbar/Navbar"
import Footer from "@/app/components/footer/Footer"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blogzinho',
  description: 'Blogizinho teste',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className="container">
          <div className='wrapper'>
            <Navbar/>
            {children}
            <Footer/>
          </div>
        </div>
      </body>
    </html>
  )
}
