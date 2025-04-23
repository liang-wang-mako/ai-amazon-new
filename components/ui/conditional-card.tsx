import { cn } from '@/lib/utils';

interface ConditionalCardProps {
  variant?: 'default' | 'success' | 'error';
  isOutlined?: boolean;
  isHoverable?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ConditionalCard({
  variant = 'default',
  isOutlined = false,
  isHoverable = false,
  className,
  children,
}: ConditionalCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-4',
        // Variant styles
        {
          'bg-white text-slate-900': variant === 'default',
          'bg-green-50 text-green-900': variant === 'success',
          'bg-red-50 text-red-900': variant === 'error',
        },
        // Conditional border
        {
          'border border-slate-200': isOutlined && variant === 'default',
          'border border-green-200': isOutlined && variant === 'success',
          'border border-red-200': isOutlined && variant === 'error',
        },
        // Hover effects
        {
          'hover:shadow-md transition-shadow duration-200': isHoverable,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
