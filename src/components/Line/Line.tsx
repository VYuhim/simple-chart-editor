import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ILineProps {
  className?: string;
  xAccessor: (data: any) => any;
  yAccessor: (data: any) => any;
  data: any[];
  curveInterpolation?: d3.CurveFactory;
  id?: string;
}

export const Line: React.FC<ILineProps> = (props) => {
  const { xAccessor, yAccessor, data, className, curveInterpolation = d3.curveLinear, id } = props;
  const ref = useRef<SVGPathElement>(null);
  const lineGenerator = d3.line().curve(curveInterpolation).x(xAccessor).y(yAccessor);

  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current)
        .datum(data)
        .attr('d', lineGenerator)
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke', 'var(--main-color)');
    }
  }, [ref.current, data, xAccessor, yAccessor]);

  return <path ref={ref} className={className} id={id} data-testid={'line'} />;
};
