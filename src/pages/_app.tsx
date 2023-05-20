import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';
import { defaultTheme } from '@/styles/theme';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Header from '../components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={defaultTheme}>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}
