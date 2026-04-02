import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppProvider, useApp } from './contexts/AppContext';
import GDPRBanner from './components/GDPRBanner';
import LanguageSwitcher from './components/LanguageSwitcher';
import Progress from './components/Progress';
import Stepper from './components/Stepper';
import QuestionCard from './components/QuestionCard';
import { generatePDF } from './pdf/pdfGenerator';

function AppContent() {
  const { t } = useTranslation();
  const { currentSection, setCurrentSection, allSectionsCompleted, answers, sections } = useApp();

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompleteAndPDF = () => {
    if (allSectionsCompleted()) {
      generatePDF(answers, t);
    } else {
      alert(t('complete_all_sections_first', 'Please complete all sections before generating PDF.'));
    }
  };

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
            <button
              onClick={handleBack}
              disabled={currentSection === 0}
              className={`px-5 py-2 rounded-full font-medium transition ${
                currentSection === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {t('back')}
            </button>
            {currentSection === sections.length - 1 ? (
              <button
                onClick={handleCompleteAndPDF}
                className="bg-accent hover:bg-amber-600 text-white px-5 py-2 rounded-full font-medium transition"
              >
                {t('complete')}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-primary hover:bg-teal-800 text-white px-5 py-2 rounded-full font-medium transition"
              >
                {t('next')}
              </button>
            )}
          </div>
          {allSectionsCompleted() && (
            <div className="mt-6 p-4 bg-green-50 text-green-800 rounded-lg text-center">
              {t('complete_success')}
            </div>
          )}
        </div>
      </main>

      <GDPRBanner />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
