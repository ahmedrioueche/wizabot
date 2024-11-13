import React from 'react';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`border-light-muted/30 dark:border-dark-muted/30 bg-light-surface dark:bg-dark-surface rounded-lg border shadow-sm ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => {
    return <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />;
  }
);

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`text-light-text-primary dark:text-dark-text-primary text-2xl font-semibold leading-none tracking-tight ${className}`}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => {
    return <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />;
  }
);

CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardContent };
