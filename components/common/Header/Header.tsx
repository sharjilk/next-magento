import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, UserCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  HeaderSearch,
  HeaderMenu,
  HeaderUserMenu,
  StoreSwitcher,
} from '@/components/common/Header'

type HeaderProps = {
  menu: {
    uid: number
    name: string
    url_key: string
  }[]
}

const Header = ({ menu }: HeaderProps) => {
  return (
    <header>
      <div className="border hidden sm:block">
        <div className="container flex justify-between items-center">
          <StoreSwitcher />
          <div className="flex space-x-3">
            <Link href="/customer/account/login" className="">
              Sign In
            </Link>
            <span>|</span>
            <Link href="/customer/account/login" className="">
              Register
            </Link>
          </div>
        </div>
      </div>
      <div className="container pt-4 sm:relative">
        <div className="flex justify-between items-center mb-4">
          <div className="ml-12 sm:ml-0">
            <Link href="/" className="">
              <Image
                src="/clothing.png"
                width={60}
                height={60}
                alt="Logo"
                priority={true}
              />
            </Link>
          </div>
          <div className="flex space-x-4 pr-[12px]">
            {/* <HeaderUserMenu /> */}
            <Link className="" href="/customer/account/login">
              <UserCircle2 strokeWidth="1" className="h-8 w-8" />
            </Link>
            {/* <Link className="flex items-center" href="/wishlist">
              <Heart className="h-6 w-6" />
            </Link> */}
            <Link className="relative" href="/cart">
              <ShoppingBag strokeWidth="1" className="h-8 w-8" />
              <span className="bg-black text-white text-sm h-5 w-5 rounded-3xl text-center absolute right-[-12px] top-[-3px] ">
                0
              </span>
            </Link>
          </div>
        </div>
        <HeaderSearch />
      </div>
      <HeaderMenu menu={menu} />
    </header>
  )
}

export default Header
