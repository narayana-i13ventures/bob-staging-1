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
  icons: '/images/i13logo.png'
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <main>
          <AuthProvider>
            <Providers>
              <ThemeRegistry>
                {/* <Suspense fallback={<Loading />}> */}
                  {props.children}
                {/* </Suspense> */}
                <GlobalSnackbar />
              </ThemeRegistry>
            </Providers>
          </AuthProvider>
        </main>
      </body>
    </html>
  )
}
