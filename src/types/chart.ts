export enum Curve {
  linear,
  basis,
  monotone,
  natural,
  step,
  stepBefore,
  stepAfter,
}

export enum AxisType {
  'bottom' = 'axisBottom',
  'left' = 'axisLeft',
  'right' = 'axisRight',
}

export interface IChartDimensions {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  boundedWidth: number;
  boundedHeight: number;
}

export interface IPoint {
  offset: number;
  value: number;
}

export interface ILine {
  id: number;
  label: string;
  color: string;
  data: IPoint[];
  curve: Curve;
}
