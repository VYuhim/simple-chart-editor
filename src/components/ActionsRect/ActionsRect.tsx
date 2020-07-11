import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { useContextChartDimensions } from '../Chart/Chart';

interface IActionsRectProps {
  onMouseMove?: (position: [number, number]) => void;
  onMouseEnter?: (position: [number, number]) => void;
  onMouseLeave?: (position: [number, number]) => void;
  onClick?: (position: [number, number]) => void;
  onDblClick?: (position: [number, number]) => void;
  xScale: d3.AxisScale<d3.AxisDomain>;
  yScale: d3.AxisScale<d3.AxisDomain>;
  className?: string;
  zoom?: d3.ZoomBehavior<Element, any>;
}

export const ActionsRect: React.FC<IActionsRectProps> = (props) => {
  const dimensions = useContextChartDimensions();
  const ref = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current)
        .on('mousemove', function () {
          props.onMouseMove && props.onMouseMove(d3.mouse(this));
        })
        .on('mouseenter', function () {
          props.onMouseEnter && props.onMouseEnter(d3.mouse(this));
        })
        .on('mouseleave', function () {
          props.onMouseLeave && props.onMouseLeave(d3.mouse(this));
        })
        .on('click', function () {
          props.onClick && props.onClick(d3.mouse(this));
        })
        .on('dblclick', function () {
          props.onDblClick && props.onDblClick(d3.mouse(this));
        });

      if (props.zoom) {
        d3.select(ref.current).call(props.zoom);
      }
    }
  }, [ref.current, props.xScale, props.yScale]);

  return (
    <rect
      width={dimensions.boundedWidth}
      height={dimensions.boundedHeight}
      fill={'transparent'}
      ref={ref}
      className={props.className}
      data-testid={'actionsRect'}
    />
  );
};
