import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/utils';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';

interface Tab {
  value: string;
  label: string;
  path?: string;
  content?: React.ReactNode;
  onTabClick?: () => void;
}

interface TabsComponentProps {
  defaultValue?: string;
  tabs: Tab[];
  className?: string;
  tabsListClassName?: string;
  tabsContentClassName?: string;
  onTabClick?: () => void;
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  defaultValue,
  tabs,
  className = '',
  tabsListClassName = '',
  tabsContentClassName = '',
  onTabClick,
}) => {
  return (
    <Tabs defaultValue={defaultValue} className={`w-full ${className}`}>
      <TabsList
        className={`w-full mb-16 flex flex-wrap justify-start items-center gap-2 overflow-x-auto p-2 xxs:justify-center sm:gap-4 lg:gap-6 ${tabsListClassName}`}
      >
        {tabs.map(tab =>
          tab.path ? (
            <NavLink
              key={tab.value}
              to={tab.path}
              end
              className={({ isActive }) =>
                cn(
                  'inline-flex items-center justify-center whitespace-nowrap rounded-[8px] w-[160px] md:w-[180px] lg:w-[240px] h-[45px] text-md font-regular font-montserrat transition-all focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                  isActive ? 'bg-sky-300 text-white' : 'bg-slate-200 text-black'
                )
              }
            >
              {tab.label}
            </NavLink>
          ) : (
            <TabsTrigger onClick={onTabClick} key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          )
        )}
      </TabsList>

      <div className={`${tabsContentClassName}`}>
        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default TabsComponent;
