'use client';

import * as React from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, DayPickerSingleProps } from 'react-day-picker';

import { buttonVariants } from './button';
import { cn } from './lib';

export type CalendarSingleProps = DayPickerSingleProps;
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const DEFAULT_FROM_YEAR = new Date().getFullYear() - 100;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(className)}
      captionLayout={'dropdown-buttons'}
      classNames={{
        caption_dropdowns: 'flex gap-2',
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',

        caption: 'flex justify-between relative items-center',
        caption_label: 'text-sm font-medium flex items-center gap-0.5',

        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),

        nav_button_previous: 'mr-2 hover:text-black',
        nav_button_next: 'hover:text-black',

        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-medium text-[0.8rem]',

        row: 'flex w-full mt-2',
        cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary [&:has([aria-selected])]:text-primary-foreground [&:has([aria-selected])]:rounded-lg first:[&:has([aria-selected])]:rounded-l-lg last:[&:has([aria-selected])]:rounded-r-lg',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:text-black [&:has([aria-selected])]:text-red focus:bg-none'
        ),
        day_selected: 'bg-secondary-hover text-primary-foreground',
        day_today: 'bg-primary text-primary-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-secondary aria-selected:text-secondary-foreground',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />
      }}
      fromYear={props.fromYear ?? DEFAULT_FROM_YEAR}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
