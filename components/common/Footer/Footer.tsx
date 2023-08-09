import React from 'react'
import Image from 'next/image'
import { Link } from 'lucide-react'

const Footer = () => {
  return (
    <div className=" bg-gray-900 mt-28">
      <div className="container flex w-full justify-between items-center text-white py-6">
        <div className="flex space-x-4 items-center">
          <Image
            src="/clothing.png"
            width={40}
            height={40}
            alt="Logo"
            priority={true}
          />
          <p className="font-semibold text-lg">Clothing Store</p>
        </div>
        <div className="">
          Copyright © 2023 Clothing Inc. All rights reserved.
        </div>
        <div className="flex space-x-6 items-center">
          <p>Terms of use</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
