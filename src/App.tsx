import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { HackerEffects } from './components/HackerEffects';
import { BackToTopButton } from './components/BackToTopButton';
import { ParticleBackground } from './components/ParticleBackground';

// Lazy load non-critical components
const AboutSection = lazy(() => import('./components/AboutSection').then(module => ({ default: module.AboutSection })));
const AwardsSection = lazy(() => import('./components/AwardsSection').then(module => ({ default: module.AwardsSection })));
// const ExperienceSection = lazy(() => import('./components/ExperienceSection').then(module => ({ default: module.ExperienceSection })));
const ProjectsSection = lazy(() => import('./components/ProjectsSection').then(module => ({ default: module.ProjectsSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then(module => ({ default: module.ContactSection })));
const PortfoliosSection = lazy(() => import('./components/PortfoliosSection').then(module => ({ default: module.PortfoliosSection })));
const Terminal = lazy(() => import('./components/Terminal').then(module => ({ default: module.Terminal })));
const NotFound = lazy(() => import('./components/NotFound').then(module => ({ default: module.NotFound })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="animate-pulse text-green-500">Loading...</div>
  </div>
);

function AppContent() {
  return (
    <div className="min-h-screen bg-[rgb(var(--bg-rgb))] relative">
      <ParticleBackground />
      <LoadingScreen />
      <Navigation />
      
      <main id="main-content" role="main" className="relative z-10">
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
          <AwardsSection/>
          {/* <ExperienceSection /> */}
          <ProjectsSection />
          <PortfoliosSection />
          <ContactSection />
        </Suspense>
      </main>
      
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
      <BackToTopButton />
      <div className="matrix-bg pointer-events-none" aria-hidden="true" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <HackerEffects />
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route 
            path="/terminal" 
            element={
              <Suspense fallback={<SectionLoader />}>
                <Terminal />
              </Suspense>
            } 
          />
          <Route 
            path="*" 
            element={
              <Suspense fallback={<SectionLoader />}>
                <NotFound />
              </Suspense>
            } 
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;