import React from 'react';
import { Chart } from 'src/components/Chart/Chart';
import { useChartDimensions } from 'src/hooks/chart';

export const SandboxChart: React.FC = () => {
  const [ref, dimensions] = useChartDimensions();

  return (
    <div ref={ref}>
      <Chart dimensions={dimensions} />
    </div>
  );
};
