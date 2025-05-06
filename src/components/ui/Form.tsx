import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Form = forwardRef<HTMLFormElement, HTMLAttributes<HTMLFormElement>>(
  ({ className, ...props }, ref) => (
    <form
      ref={ref}
      className={cn('space-y-6', className)}
      {...props}
    />
  )
);
Form.displayName = 'Form';

const FormField = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('space-y-2', className)}
      {...props}
    />
  )
);
FormField.displayName = 'FormField';

const FormLabel = forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'block text-sm font-medium text-gray-700',
        className
      )}
      {...props}
    />
  )
);
FormLabel.displayName = 'FormLabel';

const FormDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-500', className)}
      {...props}
    />
  )
);
FormDescription.displayName = 'FormDescription';

const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm font-medium text-red-500', className)}
      {...props}
    />
  )
);
FormMessage.displayName = 'FormMessage';

export {
  Form,
  FormField,
  FormLabel,
  FormDescription,
  FormMessage,
};