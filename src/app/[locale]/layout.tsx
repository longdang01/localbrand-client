import Footer from '@/pages/shared/footer/Footer';
import Header from '@/pages/shared/header/Header';
import '@/assets/scss/index.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import AppProvider from './AppProvider';
import AntdStyledComponentsRegistry from './AntdStyledComponentsRegistry';
import Topbar from '@/pages/shared/topbar/Topbar';

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
            <AntdStyledComponentsRegistry>
              <Topbar />
              <Header />
              {children}
              <Footer />
            </AntdStyledComponentsRegistry>
          </NextIntlClientProvider>
        </AppProvider>
      </body>
    </html>
  );
}
