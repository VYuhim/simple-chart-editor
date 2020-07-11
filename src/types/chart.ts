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
};
