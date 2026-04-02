import React, { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from 'react-i18next';

export default function QuestionCard() {
  const { answers, updateAnswer, currentSection, markSectionComplete, allSectionsCompleted } = useApp();
  const { t } = useTranslation();

  // Define section-specific questions
  const sectionQuestions = {
    0: [ // Personal
      { key: 'name', label: 'your_name', type: 'text', required: true },
      { key: 'bankName', label: 'bank_name', type: 'text', required: true },
      { key: 'date', label: 'date', type: 'date', required: true },
    ],
    1: [ // Foundational
      { key: 'legalStructure', label: 'legal_structure', type: 'select', options: ['sole_proprietorship', 'lda', 'sa'], required: true },
      { key: 'capitalSource', label: 'capital_source', type: 'select', options: ['personal_savings', 'family_friends', 'bank_loan'], required: true },
      { key: 'mission', label: 'mission', type: 'textarea', required: true },
      { key: 'vision', label: 'vision', type: 'textarea', required: true },
    ],
    2: [ // Market
      { key: 'pestelPolitical', label: 'pestel_political', type: 'text', required: true },
      { key: 'swotStrength', label: 'swot_strength', type: 'text', required: true },
    ],
    3: [ // Financial
      { key: 'revenueProjection', label: 'revenue_projection', type: 'number', required: true },
      { key: 'investment', label: 'investment', type: 'number', required: true },
    ],
  };

  const currentQuestions = sectionQuestions[currentSection] || [];
  const isComplete = currentQuestions.every(q => {
    const val = answers[q.key];
    if (!q.required) return true;
    if (q.type === 'checkbox') return val === true;
    return val && val.toString().trim() !== '';
  });

  // Conditional logic: if capitalSource is 'bank_loan', show extra fields
  const showLoanFields = answers.capitalSource === 'bank_loan';

  useEffect(() => {
    markSectionComplete(currentSection, isComplete);
  }, [answers, currentSection, isComplete]);

  const handleInputChange = (key, value) => {
    updateAnswer(key, value);
  };

  const renderField = (q) => {
    const value = answers[q.key] || '';
    const label = t(q.label);
    if (q.type === 'select') {
      return (
        <select
          value={value}
          onChange={(e) => handleInputChange(q.key, e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
          required={q.required}
        >
          <option value="">{t('select_option')}</option>
          {q.options.map(opt => (
            <option key={opt} value={opt}>{t(opt)}</option>
          ))}
        </select>
      );
    } else if (q.type === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={(e) => handleInputChange(q.key, e.target.value)}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md"
          required={q.required}
        />
      );
    } else {
      return (
        <input
          type={q.type}
          value={value}
          onChange={(e) => handleInputChange(q.key, e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required={q.required}
        />
      );
    }
  };

  return (
    <div className="space-y-6">
      {currentQuestions.map(q => (
        <div key={q.key} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <label className="block font-medium mb-2">
            {t(q.label)} {q.required && <span className="text-red-500 text-sm">*</span>}
          </label>
          {renderField(q)}
        </div>
      ))}

      {showLoanFields && (
        <>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <label className="block font-medium mb-2">{t('loan_amount')} *</label>
            <input
              type="number"
              value={answers.loanAmount || ''}
              onChange={(e) => updateAnswer('loanAmount', e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <label className="block font-medium mb-2">{t('loan_term')} *</label>
            <input
              type="number"
              value={answers.loanTerm || ''}
              onChange={(e) => updateAnswer('loanTerm', e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </>
      )}
    </div>
  );
}
