import Footer from '@/pages/shared/footer/Footer';
import Header from '@/pages/shared/header/Header';
import '@/assets/scss/index.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import AppProvider from './AppProvider';
import AntdStyledComponentsRegistry from './AntdStyledComponentsRegistry';
import Topbar from '@/pages/shared/topbar/Topbar';
import { NAME } from '@/constants/config';
import { Suspense } from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('home.title')} | ${NAME}`,
    description: `${t('home.description')}`,
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
        <Suspense
        // fallback={<Loading />}
        >
          <AppProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <AntdStyledComponentsRegistry>
                <Topbar />
                <Header />
                <div className="main-layout">{children}</div>
                <Footer />
              </AntdStyledComponentsRegistry>
            </NextIntlClientProvider>
          </AppProvider>
        </Suspense>
      </body>
    </html>
  );
}
