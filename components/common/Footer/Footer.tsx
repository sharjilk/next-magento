import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className=" bg-gray-900 mt-28">
      <div className="container flex flex-col md:flex-row w-full justify-between items-center text-white py-6">
        <div className="flex space-x-4 items-center order-1">
          <Image
            src="/clothing.png"
            width={40}
            height={40}
            alt="Logo"
            priority={true}
          />
          <p className="font-semibold text-lg">Clothing Store</p>
        </div>
        <div className="order-3 md:order-2 text-center mt-4 md:mt-0">
          Copyright © 2023 Clothing Inc. All rights reserved.
        </div>
        <div className="flex space-x-6 items-center order-2 md:order-3 mt-4 md:mt-0">
          <p>Terms of use</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
