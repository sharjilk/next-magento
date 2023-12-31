'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

const HeaderSearch = () => {
  return (
    <form
      className="flex relative sm:absolute sm:top-[26px] sm:right-[130px] sm:w-[300px] sm:max-w-full"
      onSubmit={(e) => {
        e.preventDefault
      }}
    >
      <Input type="text" placeholder="Search..." className="border-black" />
      <Button
        className=" border-none absolute right-[1px] top-[1px] w-[38px] h-[38px]"
        variant="outline"
        size="icon"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
}

export default HeaderSearch
