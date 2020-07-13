import React, { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { Curve, FillType } from 'src/types/chart';
import { Paper, Tooltip } from '@material-ui/core';

import styles from './Line.module.scss';

interface ILineProps {
  xAccessor: (data: any) => any;
  yAccessor: (data: any) => any;
  data: any[];
  curve?: Curve;
  color: string;
  fillType?: FillType;
}

export const Line: React.FC<ILineProps> = (props) => {
  const { xAccessor, yAccessor, data, color, curve = Curve.linear, fillType = FillType.full } = props;
  const pathRef = useRef<SVGPathElement>(null);
  const curveInterpolation = useMemo(() => {
    switch (curve) {
      case Curve.basis:
        return d3.curveBasis;
      case Curve.monotoneX:
        return d3.curveMonotoneX;
      case Curve.monotoneY:
        return d3.curveMonotoneY;
      case Curve.natural:
        return d3.curveNatural;
      case Curve.step:
        return d3.curveStep;
      case Curve.stepBefore:
        return d3.curveStepBefore;
      case Curve.stepAfter:
        return d3.curveStepAfter;
      case Curve.linear:
      default:
        return d3.curveLinear;
    }
  }, [curve]);

  const lineGenerator = useMemo(() => d3.line().curve(curveInterpolation).x(xAccessor).y(yAccessor), [
    xAccessor,
    yAccessor,
    curveInterpolation,
  ]);

  useEffect(() => {
    if (pathRef.current) {
      d3.select(pathRef.current).datum(data).attr('d', lineGenerator);
    }
  }, [pathRef.current, lineGenerator]);

  return (
    <>
      <path
        ref={pathRef}
        fill={'none'}
        strokeWidth={3}
        stroke={color}
        strokeDasharray={fillType === FillType.dashArray ? 15 : undefined}
      />
      {data.map((data, idx) => (
        <Tooltip
          key={idx}
          interactive={true}
          title={
            <Paper className={styles.tooltip} elevation={3}>
              <div className={styles.tooltipRow}>
                <span>offset:</span>
                <span>{data.offset}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span>value:</span>
                <span>{data.value}</span>
              </div>
            </Paper>
          }
        >
          <circle
            cx={xAccessor(data)}
            cy={yAccessor(data)}
            r={5}
            fill={'transparent'}
            stroke={color}
            strokeWidth={3}
            style={{ cursor: 'pointer' }}
          />
        </Tooltip>
      ))}
    </>
  );
};
