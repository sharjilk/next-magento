import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  return (
    <Button
      className="w-6 h-6 p-0 border-none hover:bg-transparent"
      variant="outline"
    >
      <Heart className="h-6 w-6" />
    </Button>
  );
};

export default Wishlist;
