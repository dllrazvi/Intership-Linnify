'use client';

import React, { useState } from 'react';

import { cva } from 'class-variance-authority';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from './button';
import { Calendar, CalendarSingleProps } from './calendar';
import { cn } from './lib';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export type DatePickerProps = {
  onSelect: (date: Date | undefined) => void;
  value?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  side?: 'top' | 'right' | 'bottom' | 'left';
  placeholder?: string;
  disabledDate?: (date: Date) => boolean;
  variant: 'default' | 'destructive';
  calendarSingle?: Omit<CalendarSingleProps, 'onSelect' | 'mode' | 'defaultMonth'>;
};

const datepickerVariants = cva(
  'w-full border-input pl-3 text-left font-normal tracking-normal text-sm bg-black hover:bg-neutral-darker',
  {
    variants: {
      variant: {
        default: 'border-input',
        destructive: 'border-destructive'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

function formatDate(date: Date | null): string {
  if (!date) {
    return '';
  }

  return format(date, 'dd-MM-yyyy');
}

function getDateMonth(date: Date | null): Date | undefined {
  if (!date) {
    return undefined;
  }

  return new Date(date.getUTCFullYear(), date.getUTCMonth());
}

const DatePicker = ({ onSelect, value, placeholder, variant, ...props }: DatePickerProps) => {
  const selected = value ? value : undefined;
  const { minDate, maxDate } = props;
  const [open, setOpen] = useState<boolean>(false);

  const disabledDate = (date: Date): boolean => {
    if (props.disabledDate) {
      return props.disabledDate(date);
    }

    let valid = true;

    if (minDate) {
      valid = date > minDate;
    }

    if (maxDate) {
      valid = valid && date < maxDate;
    }

    return !valid;
  };

  const onSelectData = (date: Date | undefined): void => {
    onSelect(date);
    setOpen(false);
  };
  const defaultMonth = value ? getDateMonth(value) : undefined;

  return (
    <Popover onOpenChange={() => setOpen(!open)} open={open}>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className={cn(datepickerVariants({ variant }))}>
          {value ? (
            formatDate(value)
          ) : (
            <span className={'text-muted-foreground text-sm font-light'}>
              {placeholder ?? 'Pick a date'}{' '}
            </span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-2" align="start" side={props.side}>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(_, date) => onSelectData(date)}
          disabled={disabledDate}
          initialFocus
          defaultMonth={defaultMonth}
          {...props.calendarSingle}
        />
      </PopoverContent>
    </Popover>
  );
};

// TODO Create DateRangePicker
export { DatePicker };
