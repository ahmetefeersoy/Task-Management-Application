import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface FormTextareaProps {
  label: string;
  id: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
  rows?: number;
  required?: boolean;
  className?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  id,
  placeholder,
  register,
  error,
  rows = 3,
  required = false,
  className = '',
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        {...register}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormTextarea;
