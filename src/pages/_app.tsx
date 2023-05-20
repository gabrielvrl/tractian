import '@/styles/globals.css'
import { theme } from '@/theme'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import Header from './components/Header'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
