import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { ChromePicker } from 'react-color';

import styles from './ColorPicker.module.scss';

interface IColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

export const ColorPicker: React.FC<IColorPickerProps> = (props) => {
  const { label, value, onChange, disabled } = props;

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.input}>
        <Tooltip
          interactive={true}
          disableFocusListener={disabled}
          disableHoverListener={disabled}
          disableTouchListener={disabled}
          title={<ChromePicker color={value} onChange={(color) => onChange(color.hex)} />}
        >
          <IconButton disabled={disabled}>
            <div className={styles.icon} style={{ background: value }} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
