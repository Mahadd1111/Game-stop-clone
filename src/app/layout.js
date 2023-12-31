import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar/navbar'
import AuthProvider from './components/AuthProvider/authprovider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>

      <body className={inter.className}>
        <AuthProvider>
          <div className=''>
            <div className='fixed top-0 z-50'>
              <Navbar />
            </div>
            <div>
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
