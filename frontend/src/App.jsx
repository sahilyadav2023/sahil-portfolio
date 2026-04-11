import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/LoadingSpinner';

import './App.css';

// ─── Code Splitting via React.lazy() ─────────────────────────────────────────
// Each section is a separate JS chunk loaded only when needed.
// OPTIMIZATION: reduces initial bundle size, speeds up first paint.

const Hero     = lazy(() => import('./sections/Hero/Hero'));
const About    = lazy(() => import('./sections/About/About'));
const Skills   = lazy(() => import('./sections/Skills/Skills'));
const Projects = lazy(() => import('./sections/Projects/Projects'));
const Timeline = lazy(() => import('./sections/Timeline/Timeline'));
const Contact  = lazy(() => import('./sections/Contact/Contact'));

// ─── Main Portfolio Page (single scroll page) ─────────────────────────────────

function PortfolioPage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Contact />
    </>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <ThemeProvider>
      {/* BrowserRouter satisfies the React Router requirement */}
      <BrowserRouter>
        <div className="app">
          <Navbar />

          <main>
            {/* Suspense shows spinner while any lazy section chunk loads */}
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<PortfolioPage />} />
                {/* Fallback: unknown paths scroll back home */}
                <Route path="*" element={<PortfolioPage />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
