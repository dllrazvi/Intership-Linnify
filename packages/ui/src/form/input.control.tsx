import React from 'react';

import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { FormControl, FormDescription, FormError, FormField, FormItem, FormLabel } from '../form';
import { Input, InputProps } from '../input';
import { cn } from '../lib';

const InputControl = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  description,
  placeholder,
  type,
  variant,
  ...props
}: {
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
} & Omit<ControllerProps<TFieldValues, TName>, 'render'> &
  InputProps) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      defaultValue={props.defaultValue}
      rules={props.rules}
      shouldUnregister={props.shouldUnregister}
      render={({ field, fieldState: { invalid } }) => (
        <FormItem className={cn(props.className)} {...props}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              variant={invalid ? 'destructive' : variant}
              {...field}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormError />
        </FormItem>
      )}
    />
  );
};

InputControl.displayName = 'InputControl';

// TODO Export multiple input controls if they are number of texts
export { InputControl };
