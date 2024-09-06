'use client';

import React from 'react';

import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { FormControl, FormError, FormField, FormItem, FormLabel } from '../form';
import { cn } from '../lib';
import { RadioGroup, RadioGroupItem } from '../radio-group';

export type RadioGroupValue = {
  value: any;
  label: string;
};

export type RadioGroupControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  values: RadioGroupValue[];
  label?: string;
  renderValue?: (value: RadioGroupValue) => React.ReactNode;
  renderLabel?: () => React.ReactNode;
  className?: string;
  classNameRadioGroup?: string;
} & Omit<ControllerProps<TFieldValues, TName>, 'render'>;

const RadioGroupControl = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  values,
  renderValue,
  renderLabel,
  classNameRadioGroup,
  ...props
}: RadioGroupControlProps<TFieldValues, TName>) => {
  const renderGroupItem = (groupValue: RadioGroupValue): React.ReactNode => {
    if (renderValue) {
      return renderValue(groupValue);
    }

    return (
      <FormItem className="flex items-center space-x-1 space-y-0" key={groupValue.value.toString()}>
        <FormControl>
          <RadioGroupItem value={groupValue.value.toString()} />
        </FormControl>
        <FormLabel className="font-normal">{groupValue.label}</FormLabel>
      </FormItem>
    );
  };

  return (
    <FormField
      control={props.control}
      name={props.name}
      defaultValue={props.defaultValue}
      rules={props.rules}
      shouldUnregister={props.shouldUnregister}
      render={({ field }) => (
        <FormItem className={cn('gap-2', props.className)} {...props}>
          {label && <FormLabel>{label}</FormLabel>}
          {renderLabel && renderLabel()}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn('flex flex-col gap-2', classNameRadioGroup)}
            >
              {values.map(renderGroupItem)}
            </RadioGroup>
          </FormControl>
          <FormError />
        </FormItem>
      )}
    />
  );
};

RadioGroupControl.displayName = 'RadioGroupControl';

export { RadioGroupControl };
