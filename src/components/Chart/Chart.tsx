import React, { createContext, useContext } from 'react';
import { IChartDimensions } from 'src/types/chart';

import styles from './Chart.module.scss';

interface IChartProps {
  dimensions: IChartDimensions;
}

const ChartContext = createContext<IChartDimensions>({
  width: 0,
  height: 0,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  boundedWidth: 0,
  boundedHeight: 0,
});

export const useContextChartDimensions = () => useContext(ChartContext);

export const Chart: React.FC<IChartProps> = (props) => {
  const { dimensions, children } = props;

  return (
    <div className={styles.container}>
      <svg className={styles.chart}>
        <g transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}>
          <ChartContext.Provider value={dimensions}>{children}</ChartContext.Provider>
        </g>
      </svg>
    </div>
  );
};
