import React from 'react';

import styles from './LineAdjusterTab.module.scss';

interface ILineAdjusterTab {
  lineId: number;
}

export const LineAdjusterTab: React.FC<ILineAdjusterTab> = (props) => {
  return <div className={styles.container} />;
};
