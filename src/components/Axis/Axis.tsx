import React, { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { AxisType } from 'src/types/chart';

import { useContextChartDimensions } from '../Chart/Chart';

import styles from './Axis.module.scss';

interface IAxisProps {
  axisType: AxisType;
  ticks?: number;
  ticksToFixed?: number;
  label?: string;
  scale: d3.AxisScale<d3.AxisDomain>;
  tickFormat?: (domainValue: d3.AxisDomain, index: number) => string;
  tickClassName?: string;
}

export const Axis: React.FC<IAxisProps> = (props) => {
  const { scale, axisType, label, ticks, ticksToFixed = 1, tickFormat, tickClassName = styles.tick } = props;
  const ref = useRef<SVGPathElement>(null);
  const dimensions = useContextChartDimensions();

  const getTickValues = (ticks: number) => {
    const [min, max] = scale.domain() as [number, number];

    if (Number.isNaN(min) || Number.isNaN(max)) {
      return [];
    }

    const values: Array<string | number> = [];

    values.push(ticksToFixed ? min.toFixed(ticksToFixed) : Math.ceil(min));

    const range = (max - min) / ticks;

    let currentValue = min + range;

    while (currentValue < max - range / 2) {
      values.push(Number(ticksToFixed ? currentValue.toFixed(ticksToFixed) : Math.ceil(currentValue)));
      currentValue += range;
    }

    values.push(ticksToFixed ? max.toFixed(ticksToFixed) : Math.ceil(max));
    return values;
  };

  const axisGenerator = ticks
    ? d3[axisType](scale).tickValues(getTickValues(ticks)).tickFormat(d3.format(''))
    : d3[axisType](scale);

  useEffect(() => {
    tickFormat && axisGenerator.tickFormat(tickFormat);

    if (ref.current) {
      const axis = d3.select(ref.current).call(axisGenerator);

      axis.selectAll('text').attr('class', tickClassName);

      switch (axisType) {
        case AxisType.bottom:
          axis.select('.domain').remove();
          axis
            .selectAll('.tick')
            .select('line')
            .attr('y2', -dimensions.boundedHeight)
            .attr('stroke', 'var(--chart-label-color)')
            .attr('stroke-dasharray', '1, 3');
          axis.selectAll('.tick').select('text').attr('transform', 'translate(0, 5)');
          break;
        case AxisType.left:
          axis.select('.domain').remove();
          axis
            .selectAll('.tick')
            .select('line')
            .attr('x2', dimensions.boundedWidth)
            .attr('stroke', 'var(--chart-label-color)')
            .attr('stroke-dasharray', '1, 3');
          axis.selectAll('.tick').select('text').attr('transform', 'translate(-10, 0)');
          break;
        case AxisType.right:
          axis.select('.domain').remove();
          axis
            .selectAll('.tick')
            .select('line')
            .attr('x2', dimensions.boundedWidth)
            .attr('stroke', 'var(--chart-label-color)')
            .attr('stroke-dasharray', '1, 3');
          axis.selectAll('.tick').select('text').attr('transform', `translate(${dimensions.boundedWidth}, 0)`);
          break;
        default:
          break;
      }
    }
  }, [ref.current, scale, dimensions]);

  const axisLabelTransform = useMemo(() => {
    switch (axisType) {
      case AxisType.bottom:
        return `translate(${dimensions.boundedWidth / 2}, ${dimensions.margin.bottom - 4})`;
      case AxisType.left:
        return `translate(${14 - dimensions.margin.left}, ${dimensions.boundedHeight / 2}) rotate(270)`;
      case AxisType.right:
        return `translate(${dimensions.width - dimensions.margin.right - 14}, ${
          dimensions.boundedHeight / 2
        }) rotate(90)`;
      default:
        return '';
    }
  }, [axisType, dimensions.boundedWidth, dimensions.boundedHeight]);

  return (
    <g
      ref={ref}
      transform={axisType === AxisType.bottom ? `translate(0, ${dimensions.boundedHeight})` : `translate(3, 0)`}
      data-testid={'axis'}
    >
      {label && (
        <text transform={axisLabelTransform} fill={'black'} textAnchor={'middle'}>
          {label}
        </text>
      )}
    </g>
  );
};
