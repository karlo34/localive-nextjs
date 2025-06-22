declare module 'react-big-calendar' {
  import { ComponentType } from 'react';

  export interface Event {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
  }

  export interface CalendarProps {
    events: Event[];
    startAccessor: string;
    endAccessor: string;
    titleAccessor?: string;
    allDayAccessor?: string;
    resourceAccessor?: string;
    defaultView?: string;
    views?: string[] | { [view: string]: boolean };
    step?: number;
    showMultiDayTimes?: boolean;
    max?: Date;
    min?: Date;
    date?: Date;
    onNavigate?: (date: Date, view: string, action: string) => void;
    onSelectEvent?: (event: Event) => void;
    style?: React.CSSProperties;
    localizer: any;
  }

  export const Calendar: ComponentType<CalendarProps>;
  export function momentLocalizer(moment: any): any;
  export function dateFnsLocalizer(config: any): any;
}