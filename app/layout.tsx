/* Components */
import './styles/globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/lib/providers'
import ThemeRegistry from './components/ThemeRegistry/ThemeRegistry'
import GlobalSnackbar from './components/Shared/GlobalSnackbar';
import AuthProvider from './components/ThemeRegistry/AuthProvider';
import Loading from './loading';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Bob",
  description: "Bob Ui with Mui Library",
  icons: '/images/favicon.png'
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <AuthProvider>
      <Providers>
        <html lang="en">
          <body suppressHydrationWarning={true}>
            <main>
              <Suspense fallback={<Loading />}>
                <ThemeRegistry>
                  {props.children}
                  <GlobalSnackbar />
                </ThemeRegistry>
              </Suspense>
            </main>
          </body>
        </html>
      </Providers>
    </AuthProvider>
  )
}
