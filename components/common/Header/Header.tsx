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
    <>
      <div className="border">
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
      <div className="container">
        <div className="flex items-center justify-between pt-3 pb-3">
          <div>
            <Link href="/" className="flex items-center">
              <Image
                src="/clothing.png"
                width={60}
                height={60}
                alt="Logo"
                priority={true}
              />
            </Link>
          </div>
          <div className="flex space-x-6">
            <HeaderSearch />

            {/* <HeaderUserMenu /> */}
            <Link className="flex items-center" href="/customer/account/login">
              <UserCircle2 className="h-6 w-6" />
            </Link>
            {/* <Link className="flex items-center" href="/wishlist">
              <Heart className="h-6 w-6" />
            </Link> */}
            <Link className="flex items-center relative" href="/cart">
              <ShoppingBag className="h-6 w-6" />
              <span className="bg-black text-white text-sm h-5 w-5 rounded-3xl text-center absolute right-[-12px] top-[-3px] ">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
      <HeaderMenu menu={menu} />
    </>
  )
}

export default Header
