import React, { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { Curve, FillType } from 'src/types/chart';

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
  const ref = useRef<SVGPathElement>(null);
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
  const lineGenerator = d3.line().curve(curveInterpolation).x(xAccessor).y(yAccessor);

  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current)
        .datum(data)
        .attr('d', lineGenerator)
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke', color);

      if (fillType === FillType.dashArray) {
        d3.select(ref.current).attr('stroke-dasharray', 15);
      }
    }
  }, [ref.current, data, xAccessor, yAccessor]);

  return <path ref={ref} />;
};
