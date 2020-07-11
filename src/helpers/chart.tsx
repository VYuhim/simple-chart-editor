import * as d3 from 'd3';
import { IChartDimensions } from 'src/types/chart';

export const combineChartDimensions = (settings: Partial<IChartDimensions>): IChartDimensions => {
  const parsedDimensions: Omit<IChartDimensions, 'boundedWidth' | 'boundedHeight'> = {
    margin: {
      top: 40,
      right: 30,
      bottom: 40,
      left: 75,
    },
    width: 0,
    height: 0,
    ...settings,
  };

  return {
    ...parsedDimensions,
    boundedWidth: Math.max(parsedDimensions.width - parsedDimensions.margin.left - parsedDimensions.margin.right, 0),
    boundedHeight: Math.max(parsedDimensions.height - parsedDimensions.margin.top - parsedDimensions.margin.bottom, 0),
  };
};

interface ICrossPointSettings {
  axis: 'x' | 'y';
  select: string;
  position: [number, number];
}

export const getCrossPointOnPath = (settings: ICrossPointSettings): SVGPoint => {
  const { axis, select, position } = settings;

  const path = d3.select(select).node() as SVGPathElement;
  const length = path.getTotalLength();

  let point;
  let target;
  const axisPoint = axis === 'x' ? position[0] : position[1];
  let beginning = axisPoint;
  let end = length;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    target = Math.floor((beginning + end) / 2);
    point = path.getPointAtLength(target);

    if ((target === end || target === beginning) && point[axis] !== axisPoint) {
      break;
    }

    if (point.x > axisPoint) {
      end = target;
    } else if (point.x < axisPoint) {
      beginning = target;
    } else {
      break;
    }
  }

  return point;
};
