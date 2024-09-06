import React from 'react';

import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { FormControl, FormDescription, FormError, FormField, FormItem, FormLabel } from '../form';
import { cn } from '../lib';
import { Switch } from '../switch';

const SwitchControl = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  className,
  ...props
}: {
  label?: string;
  description?: string;
  className?: string;
} & Omit<ControllerProps<TFieldValues, TName>, 'render'>) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      defaultValue={props.defaultValue}
      rules={props.rules}
      shouldUnregister={props.shouldUnregister}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)} {...props}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} {...field} />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormError />
        </FormItem>
      )}
    />
  );
};

SwitchControl.displayName = 'SwitchControl';

export { SwitchControl };
