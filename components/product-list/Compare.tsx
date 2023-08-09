import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart2 } from 'lucide-react';

const Compare = () => {
  return (
    <Button
      className="w-6 h-6 p-0 border-none  hover:bg-transparent"
      variant="outline"
    >
      <BarChart2 className="h-6 w-6" />
    </Button>
  );
};

export default Compare;
