import React from 'react';

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={`border-light-muted/30 dark:border-dark-muted/30 [&>svg]:text-light-text-primary dark:text-dark-text-primary relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7 ${className}`}
        {...props}
      />
    );
  }
);

Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <h5
        ref={ref}
        className={`text-light-text-primary dark:text-dark-text-primary mb-1 font-medium leading-none tracking-tight ${className}`}
        {...props}
      />
    );
  }
);

AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`text-light-text-secondary dark:text-dark-text-secondary text-sm [&_p]:leading-relaxed ${className}`}
        {...props}
      />
    );
  }
);

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
