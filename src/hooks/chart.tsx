import { IChartDimensions } from 'src/types/chart';
import { createRef, RefObject, useEffect, useMemo, useState } from 'react';
import { combineChartDimensions } from 'src/helpers/chart';

export const useChartDimensions = (
  settings?: Partial<IChartDimensions>,
): [RefObject<HTMLDivElement>, IChartDimensions] => {
  const ref = createRef<HTMLDivElement>();
  const dimensions = useMemo(() => combineChartDimensions({ ...settings }), []);

  const [width, setWidth] = useState(dimensions.width);
  const [height, setHeight] = useState(dimensions.height);
  const resizeObserver = useMemo(
    () =>
      // @ts-ignore
      new ResizeObserver((entries) => {
        const chart = entries[0]?.contentRect;

        if (!settings?.width) {
          setWidth(chart?.width);
        }

        if (!settings?.height) {
          setHeight(chart?.height);
        }
      }),
    [],
  );

  useEffect(() => {
    const node = ref.current;

    if (node) {
      setWidth(settings?.width || node.offsetWidth);
      setHeight(settings?.height || node.offsetHeight);
      resizeObserver.observe(node);
    }
    return () => {
      if (node) {
        resizeObserver.unobserve(node);
      }
    };
  }, [ref.current]);

  const newSettings = combineChartDimensions({
    ...dimensions,
    width,
    height,
  });

  return [ref, newSettings];
};
