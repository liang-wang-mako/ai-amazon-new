import { Button } from '@/components/ui/button';
import { ButtonProps } from '@/components/ui/button';
import { Icon, IconProps } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface IconButtonProps extends ButtonProps {
  iconName: IconProps['name'];
  iconSize?: IconProps['size'];
  iconVariant?: IconProps['variant'];
  iconClassName?: string;
}

export function IconButton({
  iconName,
  iconSize = 'md',
  iconVariant = 'default',
  iconClassName,
  children,
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button className={className} {...props}>
      <Icon
        name={iconName}
        size={iconSize}
        variant={iconVariant}
        className={cn(children && 'mr-2', iconClassName)}
      />
      {children}
    </Button>
  );
}
