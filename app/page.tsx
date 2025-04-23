import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { ConditionalCard } from '@/components/ui/conditional-card';
import { UserRegistrationForm } from '@/components/forms/user-registration-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <div className="flex gap-4">
        <IconButton iconName="shoppingCart">Add to Cart</IconButton>
        <IconButton iconName="heart" variant="outline">
          Add to Wishlist
        </IconButton>
        <IconButton iconName="search" variant="ghost">
          Search
        </IconButton>
      </div>

      <div className="flex gap-4">
        <IconButton iconName="menu" variant="outline" size="icon" iconSize="lg" />
        <IconButton iconName="user" variant="ghost" size="icon" iconSize="lg" />
        <IconButton iconName="settings" variant="secondary" size="icon" iconSize="lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        <ConditionalCard isOutlined isHoverable>
          <h3 className="font-semibold mb-2">Default Card</h3>
          <p className="text-sm">With outline and hover effect</p>
        </ConditionalCard>

        <ConditionalCard variant="success" isOutlined isHoverable className="text-center">
          <h3 className="font-semibold mb-2">Success Card</h3>
          <p className="text-sm">With custom className</p>
        </ConditionalCard>

        <ConditionalCard variant="error" isHoverable>
          <h3 className="font-semibold mb-2">Error Card</h3>
          <p className="text-sm">Without outline</p>
        </ConditionalCard>
      </div>

      <div className="w-full max-w-3xl">
        <ConditionalCard isOutlined>
          <h2 className="text-2xl font-bold mb-6 text-center">Register Account</h2>
          <UserRegistrationForm />
        </ConditionalCard>
      </div>
    </main>
  );
}
