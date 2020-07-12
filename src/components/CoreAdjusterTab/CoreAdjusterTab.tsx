import React from 'react';

import styles from './CoreAdjusterTab.module.scss';

export const CoreAdjusterTab: React.FC = () => {
  return (
    <div className={styles.container}>
      <p>Тут будут общие настройки, подписи осей, экспорт/импорт графиков, и т.д.</p>
    </div>
  );
};
