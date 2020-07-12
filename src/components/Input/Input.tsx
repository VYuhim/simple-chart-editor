import React, { useEffect, useState } from 'react';
import { Input as MInput } from '@material-ui/core';

import styles from './Input.module.scss';

interface IInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const Input: React.FC<IInputProps> = (props) => {
  const { label, value, onChange, disabled } = props;
  const [currentValue, setCurrentValue] = useState(props.value);

  useEffect(() => {
    if (value !== currentValue) {
      setCurrentValue(props.value);
    }
  }, [value]);

  const onLocalChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setCurrentValue(event.target.value);
  };
  const changeHandler: React.FocusEventHandler<HTMLInputElement> = () => {
    if (currentValue !== props.value) {
      onChange(currentValue);
    }
  };

  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div>
        <MInput
          value={currentValue}
          onChange={onLocalChangeHandler}
          onFocus={(e) => e.target.select()}
          onBlur={changeHandler}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
