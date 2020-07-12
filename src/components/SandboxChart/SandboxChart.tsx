import React, { useCallback, useMemo } from 'react';
import { Chart } from 'src/components/Chart/Chart';
import { useChartDimensions } from 'src/hooks/chart';
import { useSelector } from 'react-redux';
import { TAppState } from 'src/types/store';
import { AxisType, ILine, IPoint } from 'src/types/chart';
import { Line } from 'src/components/Line/Line';
import * as d3 from 'd3';
import { Axis } from 'src/components/Axis/Axis';

export const SandboxChart: React.FC = () => {
  const [ref, dimensions] = useChartDimensions({
    margin: {
      bottom: 50,
      right: 50,
      left: 50,
      top: 50,
    },
  });
  const lines = useSelector<TAppState>((store) => store.chart.lines) as ILine[];
  const xAccessor = useCallback((data: IPoint) => data.offset, []);
  const yAccessor = useCallback((data: IPoint) => data.value, []);
  const xScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain(d3.extent(lines.map((line) => line.data).flat(Infinity), xAccessor) as [number, number])
        .range([0, dimensions.boundedWidth]),
    [lines, dimensions],
  );
  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain(d3.extent(lines.map((line) => line.data).flat(Infinity), yAccessor) as [number, number])
        .nice()
        .range([dimensions.boundedHeight, 0]),
    [lines, dimensions],
  );

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      <Chart dimensions={dimensions}>
        <Axis axisType={AxisType.bottom} scale={xScale} />
        <Axis axisType={AxisType.left} scale={yScale} />
        {lines.map((line) => (
          <Line
            key={line.id}
            xAccessor={(data) => xScale(xAccessor(data))}
            yAccessor={(data) => yScale(yAccessor(data))}
            data={line.data}
            curve={line.curve}
            color={line.color}
            fillType={line.fillType}
          />
        ))}
      </Chart>
    </div>
  );
};
