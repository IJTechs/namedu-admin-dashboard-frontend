/* eslint-disable no-unused-vars */
import React from 'react';

// Interfaces
export interface InputProps {
  id?: string;
  type?: string;
  placeholder?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  label?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  maxLength?: number;
  pattern?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  minLength?: number;
  min?: number;
  max?: number;
  step?: number;
  readOnly?: boolean;
  name?: string;
  spellCheck?: boolean;
  ref?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  hasError?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  style?: React.CSSProperties;
  rows?: number;
  cols?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  labelClassname?: string;
}

export interface TextAreaProps extends Omit<InputProps, 'onBlur' | 'onFocus'> {
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}
