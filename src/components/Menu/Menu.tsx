import React, { useMemo } from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { MenuTabs, IMenuTab } from 'src/components/MenuTabs/MenuTabs';
import { useDispatch, useSelector } from 'react-redux';
import { TAppState } from 'src/types/store';
import { CoreAdjusterTab } from 'src/components/CoreAdjusterTab/CoreAdjusterTab';
import { LineAdjusterTab } from 'src/components/LineAdjusterTab/LineAdjusterTab';
import SettingsIcon from '@material-ui/icons/Settings';
import TimelineIcon from '@material-ui/icons/Timeline';
import AddIcon from '@material-ui/icons/Add';
import { addLineAction, changeCurrentLineAction } from 'src/store/Chart/chartActions';

import styles from './Menu.module.scss';

export const CORE_PRESETS_ID = 'corePresets';

export const Menu: React.FC = () => {
  const { currentLine: currentTab, lines: chartLines } = useSelector<TAppState>(
    (store) => store.chart,
  ) as TAppState['chart'];
  const tabsMenuItems: IMenuTab[] = useMemo(() => {
    const tabs: IMenuTab[] = [
      {
        tabId: CORE_PRESETS_ID,
        label: 'Настройки',
        icon: <SettingsIcon />,
        component: CoreAdjusterTab,
      },
    ];

    chartLines.forEach((line) => {
      tabs.push({
        tabId: line.id,
        label: line.label,
        icon: <TimelineIcon style={{ color: line.color }} />,
        component: LineAdjusterTab,
        props: {
          lineId: line.id,
        },
      });
    });

    return tabs;
  }, [chartLines]);
  const dispatch = useDispatch();
  const setCurrentTab = (tab: number | string) => dispatch(changeCurrentLineAction(tab));
  const addLineHandler = () => {
    dispatch(addLineAction());
  };

  return (
    <div className={styles.container}>
      <Tabs
        value={currentTab}
        indicatorColor='primary'
        textColor='primary'
        variant='scrollable'
        scrollButtons='on'
        onChange={(_, tab) => tab && setCurrentTab(tab)}
      >
        {tabsMenuItems.map((tab) => (
          <Tab key={tab.tabId} wrapped={true} icon={tab.icon} label={tab.label} value={tab.tabId} />
        ))}
        <Tab key={'add'} icon={<AddIcon />} label={'Добавить'} value={null} onClick={addLineHandler} />
      </Tabs>
      <MenuTabs selectedTabId={currentTab} tabs={tabsMenuItems} />
    </div>
  );
};
