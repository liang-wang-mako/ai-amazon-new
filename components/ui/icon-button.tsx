import { Button } from '@/components/ui/button';
import { ButtonProps } from '@/components/ui/button';
import { Icon, IconProps } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface IconButtonProps extends ButtonProps {
  iconName: IconProps['name'];
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
  iconClassName?: string;
}

export function IconButton({
  iconName,
  iconSize = 'md',
  iconClassName,
  children,
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button className={className} {...props}>
      <Icon name={iconName} size={iconSize} className={cn(children && 'mr-2', iconClassName)} />
      {children}
    </Button>
  );
}
