import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TAppState } from 'src/types/store';
import { ILine } from 'src/types/chart';
import { Select } from 'src/components/Select/Select';
import { CURVE_SELECTOR_OPTIONS, FILL_TYPE_OPTIONS } from 'src/components/LineAdjusterTab/constants';
import { removeLineAction, updateLineAction } from 'src/store/Chart/chartActions';
import { ColorPicker } from 'src/components/ColorPicker/ColorPicker';
import { Input } from 'src/components/Input/Input';
import { LineDataTable } from 'src/components/LineDataTable/LineDataTable';
import { Button } from '@material-ui/core';

import styles from './LineAdjusterTab.module.scss';

interface ILineAdjusterTab {
  lineId: number;
}

export const LineAdjusterTab: React.FC<ILineAdjusterTab> = (props) => {
  const disabled = useSelector<TAppState>((store) => store.chart.currentLine !== props.lineId) as boolean;
  const line = useSelector<TAppState>((store) => store.chart.lines.find((line) => line.id === props.lineId)) as ILine;

  const dispatch = useDispatch();
  const onLineChange = useCallback(
    (code: keyof Omit<ILine, 'id'>) =>
      useCallback((value: any) => dispatch(updateLineAction(line.id, { [code]: value })), [code]),
    [line.id],
  );
  const onRemoveHandler = () => dispatch(removeLineAction(props.lineId));

  return (
    <div className={styles.container}>
      <h3>Настройки:</h3>
      <Input label={'Название:'} value={line.label} onChange={onLineChange('label')} disabled={disabled} />
      <Select
        label={'Тип кривой:'}
        options={CURVE_SELECTOR_OPTIONS}
        value={line.curve}
        onChange={onLineChange('curve')}
        disabled={disabled}
      />
      <ColorPicker label={'Цвет линии:'} value={line.color} onChange={onLineChange('color')} disabled={disabled} />
      <Select
        label={'Тип заливки:'}
        options={FILL_TYPE_OPTIONS}
        value={line.fillType}
        onChange={onLineChange('fillType')}
        disabled={disabled}
      />
      <Button
        onClick={onRemoveHandler}
        type={'button'}
        color={'primary'}
        variant={'contained'}
        className={styles.button}
        disabled={disabled}
      >
        Удалить
      </Button>
      <hr />
      <h3>Данные:</h3>
      <LineDataTable data={line.data} onChange={onLineChange('data')} disabled={disabled} />
    </div>
  );
};
