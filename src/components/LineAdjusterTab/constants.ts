import { Curve, FillType } from 'src/types/chart';
import { IOption } from 'src/components/Select/Select';

export const CURVE_SELECTOR_OPTIONS: IOption[] = [
  {
    value: Curve.linear,
    label: 'linear',
  },
  {
    value: Curve.basis,
    label: 'basis',
  },
  {
    value: Curve.monotoneX,
    label: 'monotone x',
  },
  {
    value: Curve.monotoneY,
    label: 'monotone y',
  },
  {
    value: Curve.natural,
    label: 'natural',
  },
  {
    value: Curve.step,
    label: 'step',
  },
  {
    value: Curve.stepBefore,
    label: 'step before',
  },
  {
    value: Curve.stepAfter,
    label: 'step after',
  },
];

export const FILL_TYPE_OPTIONS: IOption[] = [
  {
    value: FillType.full,
    label: 'заливка',
  },
  {
    value: FillType.dashArray,
    label: 'пунктир',
  },
];
