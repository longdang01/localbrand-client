import Footer from '@/pages/shared/footer/Footer';
import Header from '@/pages/shared/header/Header';
import '@/assets/scss/_global.scss';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import AppProvider from './AppProvider';

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <AppProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </AppProvider>
      </body>
    </html>
  );
}
