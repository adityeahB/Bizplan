import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';

export default function Stepper() {
  const { currentSection, setCurrentSection, completedSections, sections } = useApp();
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2 mb-8 border-b pb-4">
      {sections.map((section, idx) => (
        <button
          key={section.id}
          onClick={() => setCurrentSection(idx)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
            currentSection === idx
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <span className="text-sm font-medium">
            {t(section.titleKey) || section.titleKey}
          </span>
          {completedSections[idx] && <FaCheck className="text-green-400" size={12} />}
        </button>
      ))}
    </div>
  );
}
