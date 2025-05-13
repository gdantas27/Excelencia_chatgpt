import React from 'react';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
