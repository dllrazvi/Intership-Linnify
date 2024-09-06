import React from 'react';

import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { Checkbox } from '../checkbox';
import { FormControl, FormDescription, FormError, FormField, FormItem, FormLabel } from '../form';
import { cn } from '../lib';

const CheckboxControl = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
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
        <FormItem
          className={cn('flex flex-row items-start gap-x-3 space-y-0', props.className)}
          {...props}
        >
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          {(!!label || !!description) && (
            <div className="flex flex-col gap-1">
              {label && <FormLabel>{label}</FormLabel>}
              {description && <FormDescription>{description}</FormDescription>}
            </div>
          )}
          <FormError />
        </FormItem>
      )}
    />
  );
};

CheckboxControl.displayName = 'CheckboxControl';

export { CheckboxControl };
