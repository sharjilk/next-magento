'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Plus, Minus } from 'lucide-react'

const AddToCart = () => {
  const [quantity, setQuantity] = useState(1)

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1)
    }
  }

  return (
    <>
      <p className="text-lg mb-4">Quantity</p>
      <div className="flex items-center justify-between">
        <div className="flex mr-4">
          <Button
            size="icon"
            variant="outline"
            className="rounded-none rounded-l border-black"
            onClick={handleDecrease}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-12 h-10 text-center border border-black border-l-0 border-r-0 rounded-none outline-none focus-visible:ring-0"
          />
          <Button
            size="icon"
            variant="outline"
            className="rounded-none rounded-r border-black"
            onClick={handleIncrease}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          size="lg"
          className="text-sm md:text-lg px-4 md-px-6 font-normal w-2/4 uppercase"
        >
          <ShoppingCart className="mr-2 h-4 w-4 md:w-6 md:h-6" /> Add to Cart
        </Button>
      </div>
    </>
  )
}

export default AddToCart
