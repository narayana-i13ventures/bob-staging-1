/* Components */
import './styles/globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/lib/providers'
import ThemeRegistry from './components/ThemeRegistry/ThemeRegistry'
import GlobalSnackbar from './components/Shared/GlobalSnackbar';

export const metadata: Metadata = {
  title: "Bob",
  description: "Bob Ui with Mui Library",
  icons: '/images/favicon.png'
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <ThemeRegistry>
        <html lang="en">
          <body>
            <main>
              {props.children}
              <GlobalSnackbar />
            </main>
          </body>
        </html>
      </ThemeRegistry>
    </Providers>
  )
}
