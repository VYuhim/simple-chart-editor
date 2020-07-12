import React from 'react';
import { MenuItem, Select as MSelect } from '@material-ui/core';

import styles from './Select.module.scss';

export interface IOption {
  label: string;
  value: number | string;
}

interface ISelectProps {
  label: string;
  options: IOption[];
  value: number | string;
  onChange: (value: number | string) => void;
  disabled?: boolean;
}

export const Select: React.FC<ISelectProps> = (props) => {
  const { label, options, value, onChange, disabled } = props;

  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div>
        <MSelect
          value={value}
          onChange={(e) => onChange(e.target.value as number | string)}
          fullWidth={true}
          disabled={disabled}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MSelect>
      </div>
    </div>
  );
};
