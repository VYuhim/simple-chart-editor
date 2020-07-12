export enum Curve {
  linear,
  basis,
  monotoneX,
  monotoneY,
  natural,
  step,
  stepBefore,
  stepAfter,
}

export enum FillType {
  full,
  dashArray,
}

export enum AxisType {
  'bottom' = 'axisBottom',
  'left' = 'axisLeft',
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
  fillType: FillType;
  data: IPoint[];
  curve: Curve;
}
