'use client';

import { IconButton } from '@/components/ui/icon-button';
import { useAuthStore } from '@/lib/stores/auth';
import { useCartStore } from '@/lib/stores/cart';
import { useUIStore } from '@/lib/stores/ui';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';

export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { itemCount, total } = useCartStore();
  const { toggleCart, toggleSidebar, toggleSearch } = useUIStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <IconButton
          iconName="menu"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        />

        <div className="flex items-center space-x-4">
          <IconButton iconName="search" variant="ghost" size="icon" onClick={toggleSearch} />
          <IconButton iconName="shoppingCart" variant="ghost" size="icon" onClick={toggleCart}>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </IconButton>
        </div>

        <div className="flex-1" />

        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm">Welcome, {user?.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <Icon name="logOut" className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm">
              <Icon name="user" className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
