import { LucideIcon, LucideProps } from 'lucide-react';
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  User,
  Settings,
  Home,
  Package,
  Users,
  CreditCard,
  BarChart,
  LogOut,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash,
  Pencil,
  Check,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type IconProps = LucideProps & {
  name: keyof typeof icons;
};

// Icon sizes
export const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-7 w-7',
} as const;

// Icon variants
export const iconVariants = {
  default: '',
  solid: 'fill-current',
  outline: 'stroke-2',
} as const;

// All available icons
export const icons = {
  shoppingCart: ShoppingCart,
  heart: Heart,
  search: Search,
  menu: Menu,
  user: User,
  settings: Settings,
  home: Home,
  package: Package,
  users: Users,
  creditCard: CreditCard,
  barChart: BarChart,
  logOut: LogOut,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  plus: Plus,
  trash: Trash,
  pencil: Pencil,
  check: Check,
  x: X,
} as const;

export function Icon({
  name,
  size = 'md',
  variant = 'default',
  className,
  ...props
}: IconProps & {
  size?: keyof typeof iconSizes;
  variant?: keyof typeof iconVariants;
}) {
  const IconComponent = icons[name];

  return (
    <IconComponent className={cn(iconSizes[size], iconVariants[variant], className)} {...props} />
  );
}
