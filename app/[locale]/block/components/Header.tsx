import React from 'react';
import { useTranslations } from 'next-intl';

const Header = () => {
  const t = useTranslations('blocking');

  return (
    <header className="bg-white shadow p-4 rounded-lg">
      <h1 className="text-xl font-bold">{t('headerTitle')}</h1>
    </header>
  );
};

export default Header;
