import { UserCircle2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select'

const StoreSwitcher = () => {
  return (
    <Select defaultValue="main_default">
      <SelectTrigger className="w-auto border-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="main_default">UAE</SelectItem>
          <SelectItem value="other_second">KSA</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default StoreSwitcher
