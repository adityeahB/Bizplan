import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const GDPR_BANNER_DISMISSED = 'gdpr_banner_dismissed';

export default function GDPRBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(GDPR_BANNER_DISMISSED);
    if (!dismissed) setVisible(true);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(GDPR_BANNER_DISMISSED, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-white p-4 shadow-lg z-50 flex flex-col sm:flex-row justify-between items-center gap-3">
      <p className="text-sm">{t('gdpr_banner')}</p>
      <div className="flex gap-4">
        <button
          onClick={handleDismiss}
          className="bg-accent hover:bg-amber-600 px-4 py-1 rounded text-sm font-semibold transition"
        >
          {t('gdpr_ok')}
        </button>
        <button
          onClick={() => alert(t('privacy_text'))}
          className="underline text-sm"
        >
          {t('privacy_policy')}
        </button>
      </div>
    </div>
  );
}
