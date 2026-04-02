import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from 'react-i18next';

export default function Progress() {
  const { completedSections, sections } = useApp();
  const { t } = useTranslation();
  const completedCount = completedSections.filter(Boolean).length;
  const total = sections.length;
  const percent = (completedCount / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-1">
        <span>{t('progress_label', 'Overall Progress')}</span>
        <span>{completedCount}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-accent h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
