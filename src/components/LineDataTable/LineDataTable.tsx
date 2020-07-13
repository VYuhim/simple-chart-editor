import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from 'src/components/LineAdjusterTab/LineAdjusterTab.module.scss';
import {
  IconButton,
  Input as MInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { IPoint } from 'src/types/chart';

interface ILineDataTableProps {
  data: IPoint[];
  disabled: boolean;
  onChange: (data: IPoint[]) => void;
}

export const LineDataTable: React.FC<ILineDataTableProps> = (props) => {
  const { data, onChange, disabled } = props;
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [selectedLine, setSelectedLine] = useState<null | number>(null);

  const [selectedData, setSelectedData] = useState<IPoint>({
    offset: 0,
    value: 0,
  });

  useEffect(() => {
    if (Number(selectedLine) === selectedLine) {
      setSelectedData(data[selectedLine]);
    }
  }, [selectedLine]);

  const onUpdateData = () => {
    // @ts-ignore
    if (selectedData.offset === '' && selectedData.value === '') {
      return onChange(data.filter((_, idx) => idx !== selectedLine));
    }

    onChange(
      data.map((data, idx) => {
        if (idx === selectedLine) {
          return {
            offset: Number(selectedData.offset),
            value: Number(selectedData.value),
          };
        }

        return data;
      }),
    );
  };

  const lastOffset = useMemo(() => data[data.length - 1]?.offset || 0, [data]);
  const lastValue = useMemo(() => data[data.length - 1]?.value || 0, [data]);

  const [newData, setNewData] = useState<IPoint>({
    offset: 0,
    value: 0,
  });

  useEffect(() => {
    setNewData({ offset: lastOffset, value: lastValue });
  }, [lastOffset, lastValue]);

  const addData = () => {
    onChange(
      data.concat({
        offset: Number(newData.offset),
        value: Number(newData.value),
      }),
    );
    firstInputRef.current?.focus();
  };

  return (
    <Paper className={styles.table}>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            <TableCell>Offset</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ offset, value }, idx) => (
            <TableRow key={idx}>
              <TableCell>
                {selectedLine === idx ? (
                  <MInput
                    defaultValue={offset}
                    type={'number'}
                    value={selectedData.offset}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setSelectedData({ ...selectedData, offset: e.target.value as any })}
                  />
                ) : (
                  offset
                )}
              </TableCell>
              <TableCell>
                {selectedLine === idx ? (
                  <MInput
                    defaultValue={value}
                    type={'number'}
                    value={selectedData.value}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => setSelectedData({ ...selectedData, value: e.target.value as any })}
                  />
                ) : (
                  value
                )}
              </TableCell>
              <TableCell>
                {selectedLine === idx ? (
                  <IconButton
                    size={'small'}
                    disabled={disabled}
                    onClick={() => {
                      setSelectedLine(null);
                      onUpdateData();
                    }}
                  >
                    <CheckIcon />
                  </IconButton>
                ) : (
                  <IconButton size={'small'} disabled={disabled} onClick={() => setSelectedLine(idx)}>
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
          {!disabled && (
            <TableRow>
              <TableCell>
                <MInput
                  inputRef={firstInputRef}
                  defaultValue={lastOffset}
                  value={newData.offset}
                  type={'number'}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setNewData({ ...newData, offset: e.target.value as any })}
                />
              </TableCell>
              <TableCell>
                <MInput
                  defaultValue={lastValue}
                  value={newData.value}
                  type={'number'}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => setNewData({ ...newData, value: e.target.value as any })}
                />
              </TableCell>
              <TableCell>
                <IconButton size={'small'} disabled={disabled} onClick={addData}>
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};
