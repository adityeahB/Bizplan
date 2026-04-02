import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const STORAGE_KEY = 'business_plan_answers';
const SECTIONS = [
  { id: 'personal', titleKey: 'personal_info' },
  { id: 'foundational', titleKey: 'section_foundational' },
  { id: 'market', titleKey: 'section_market' },
  { id: 'financial', titleKey: 'section_financial' },
];

const INITIAL_ANSWERS = {
  name: '',
  bankName: '',
  date: new Date().toISOString().split('T')[0],
  legalStructure: '',
  capitalSource: '',
  loanAmount: '',
  loanTerm: '',
  mission: '',
  vision: '',
  pestelPolitical: '',
  swotStrength: '',
  revenueProjection: '',
  investment: '',
};

export const AppProvider = ({ children }) => {
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_ANSWERS;
  });
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(() => {
    const saved = localStorage.getItem('completed_sections');
    return saved ? JSON.parse(saved) : [false, false, false, false];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('completed_sections', JSON.stringify(completedSections));
  }, [completedSections]);

  const updateAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const markSectionComplete = (index, isComplete) => {
    setCompletedSections(prev => {
      const updated = [...prev];
      updated[index] = isComplete;
      return updated;
    });
  };

  const allSectionsCompleted = () => completedSections.every(v => v === true);

  return (
    <AppContext.Provider value={{
      answers,
      updateAnswer,
      currentSection,
      setCurrentSection,
      completedSections,
      markSectionComplete,
      allSectionsCompleted,
      sections: SECTIONS,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
