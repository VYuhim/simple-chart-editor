import React, { ReactElement, useMemo, useRef } from 'react';

import styles from './MenuTabs.module.scss';

export interface IMenuTab<T = {}> {
  tabId: number | string;
  label: string;
  icon?: ReactElement;
  component: React.FC<T>;
  props?: T;
}

interface IMenuTabsProps {
  selectedTabId: number | string;
  tabs: IMenuTab[];
}

export const MenuTabs: React.FC<IMenuTabsProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const selectedTabIdx = useMemo(() => props.tabs.findIndex((tab) => tab.tabId === props.selectedTabId), [
    props.selectedTabId,
    props.tabs,
  ]);
  const containerWidth = useMemo(() => {
    if (ref.current) {
      return ref.current.getBoundingClientRect().width;
    }

    return 0;
  }, [ref.current]);

  return (
    <div className={styles.container} ref={ref}>
      <div
        className={styles.slider}
        style={{
          transform: `translateX(-${selectedTabIdx * containerWidth}px)`,
        }}
      >
        {props.tabs.map((tab) => React.createElement(tab.component, { ...tab.props, key: tab.tabId }))}
      </div>
    </div>
  );
};
