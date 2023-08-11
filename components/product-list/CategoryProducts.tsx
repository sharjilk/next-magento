'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useEffect, useState } from 'react'
import { Price, AddToCart, Wishlist, Compare } from '@/components/product-list'

type productsProps = {
  products: {
    uid: number
    name: string
    __typename: string
    small_image: {
      url: string
    }
    price_range: {
      minimum_price: {
        final_price: {
          currency: string
          value: number
        }
        regular_price: {
          value: number
          currency: string
        }
      }
      maximum_price: {
        final_price: {
          currency: string
          value: number
        }
        regular_price: {
          currency: string
          value: number
        }
      }
    }
    url_key: string
    url_suffix: string
  }[]
}

interface ProductItemState {
  uid: number
  name: string
  __typename: string
  small_image: {
    url: string
  }
  price_range: {
    minimum_price: {
      final_price: {
        currency: string
        value: number
      }
      regular_price: {
        value: number
        currency: string
      }
    }
    maximum_price: {
      final_price: {
        currency: string
        value: number
      }
      regular_price: {
        currency: string
        value: number
      }
    }
  }
  url_key: string
  url_suffix: string
}

const CategoryProducts = ({ products }: productsProps) => {
  const [categoryProducts, setCategoryProducts] =
    useState<ProductItemState[]>(products)

  useEffect(() => {
    setCategoryProducts(products)
  }, [products])

  return (
    <div>
      {/* Product list */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        {categoryProducts?.map((product) => (
          <div className="group relative overflow-hidden" key={product.uid}>
            <Link href={product.url_key + product.url_suffix}>
              <Image
                src={product.small_image.url}
                width={640}
                height={640}
                alt={product.name}
                sizes="(min-width: 1520px) 365px, (min-width: 780px) 24.44vw, (min-width: 640px) calc(33.33vw - 18px), calc(50vw - 24px)"
              />
              <div className="text-center mt-4 md:text-lg font-semibold">
                {product.name}
              </div>
            </Link>
            <Price
              className="md:text-[16px] text-center"
              price={product.price_range.minimum_price}
              productType={product.__typename}
            />
            <div className="flex justify-between items-center mt-4">
              <AddToCart className="md:max-w-[60%] w-full mx-auto rounded uppercase" />
              <div
                className="flex flex-col transition transform 
                translate-x-8 ease-in-out p-3 invisible 
                absolute group-hover:visible top-0 right-0
                group-hover:translate-x-0"
              >
                <span className="mb-3">
                  <Wishlist />
                </span>
                <span>
                  <Compare />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryProducts
