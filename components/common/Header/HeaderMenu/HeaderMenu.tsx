'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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
  const [menuCategories, setMenuCategories] = useState<MenuItemState[] | null>(
    null
  )

  useEffect(() => {
    setMenuCategories(menu)
  }, [menu])

  return (
    <div className="bg-black text-white">
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
  )
}

export default HeaderMenu
