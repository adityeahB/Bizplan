import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import GDPRBanner from './components/GDPRBanner';
import LanguageSwitcher from './components/LanguageSwitcher';
import Progress from './components/Progress';
import Stepper from './components/Stepper';
import QuestionCard from './components/QuestionCard';
import { generatePDF } from './pdf/pdfGenerator';
import { useTranslation } from 'react-i18next';

function AppContent() {
  const { t } = useTranslation();
  const { currentSection, setCurrentSection, allSectionsCompleted, answers, sections } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-3">
          <h1 className="text-xl md:text-2xl font-heading font-bold text-primary">{t('app_title')}</h1>
          <LanguageSwitcher />
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Progress />
        <Stepper />
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-heading mb-6">{t(sections[currentSection]?.titleKey)}</h2>
          <QuestionCard />
          <div className="flex justify-between mt-8 gap-4">
            <button onClick={() => setCurrentSection(Math.max(0, currentSection-1))} disabled={currentSection===0} className="px-5 py-2 rounded-full bg-gray-200 disabled:opacity-50">Back</button>
            {currentSection === sections.length-1 ? (
              <button onClick={() => allSectionsCompleted() ? generatePDF(answers, t) : alert(t('complete_all_sections_first'))} className="bg-accent text-white px-5 py-2 rounded-full">Complete & PDF</button>
            ) : (
              <button onClick={() => setCurrentSection(currentSection+1)} className="bg-primary text-white px-5 py-2 rounded-full">Next</button>
            )}
          </div>
        </div>
      </main>
      <GDPRBanner />
    </div>
  );
}

export default function App() {
  return <AppProvider><AppContent /></AppProvider>;
}
