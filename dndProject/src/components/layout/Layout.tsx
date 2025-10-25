import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header/Header';
import { Toaster } from '@/components/ui/sonner';
import { useAuthSync } from '@/hooks/useSyncAuth';
import { WavesFooter } from './footer/WavesFooter';
import { Section } from '../wrappers/sections/section/Section';
import { PageLoader } from '../wrappers/loaders/pageLoader/PageLoader';
import { MainBackground } from '../wrappers/background/mainBackground/MainBackground';

export const Layout = () => {
  useAuthSync();

  return (
    <Section paddingX="empty" screen={true} className="flex flex-col items-center">
      <Header />
      <AnimatePresence>
        <PageLoader key="loader" />
        <Outlet />
      </AnimatePresence>
      <PageChangeWatcher />
      <WavesFooter />
      <MainBackground />
      <Toaster />
    </Section>
  );
};

const PageChangeWatcher = () => {
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const pageHeight = document.body.scrollHeight;
      const screenHeight = window.innerHeight;

      if (pageHeight < screenHeight * 1.5) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 1);
  }, [location.pathname]);

  return null;
};
