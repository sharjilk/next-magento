'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, Menu } from 'lucide-react'

type HeaderProps = {
  menu: {
    uid: number
    name: string
    url_key: string
  }[]
}

interface MenuItemState {
  uid: number
  name: string
  url_key: string
}

const HeaderMenu = ({ menu }: HeaderProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [menuCategories, setMenuCategories] = useState<MenuItemState[] | null>(
    null
  )

  useEffect(() => {
    setMenuCategories(menu)
  }, [menu])

  return (
    <>
      {/* Desktop menu */}
      <div className="bg-black text-white hidden sm:flex">
        <div className="container">
          <ul className="flex w-full space-x-6">
            {menuCategories &&
              menuCategories?.map((item) => (
                <li key={item.uid}>
                  <Link
                    href={`${item.url_key}.html`}
                    className="py-4 block hover:text-slate-300"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="absolute top-0 left-[1rem] items-center justify-between py-8 flex sm:hidden">
        <nav>
          <section className="MOBILE-MENU flex lg:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <Menu className="h-8 w-8" strokeWidth={1} />
            </div>
          </section>
        </nav>
        <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
      </div>
      <div
        className={
          isNavOpen ? 'showMenuNav sm:hidden' : 'hideMenuNav sm:hidden'
        }
      >
        <div
          className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
          onClick={() => setIsNavOpen(false)}
        >
          <X className="h-8 w-8" />
        </div>
        <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
          {menuCategories &&
            menuCategories?.map((item) => (
              <li
                className="border-b border-gray-400 my-8 uppercase"
                key={item.uid}
              >
                <Link href={`${item.url_key}.html`}>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default HeaderMenu
