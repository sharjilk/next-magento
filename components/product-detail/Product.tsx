import { getApolloClient } from '@/framework/apollo/apollo-client'
import { getProductDetail } from '@/framework/apollo/operations'
import {
  Breadcrumb,
  ProductOptions,
  AddToCart,
  Media,
} from '@/components/product-detail'
import { ChevronRight, Heart, BarChart2, StarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface PageProps {
  pageType: string
  urlKey: string
}

const Product = async ({ pageType, urlKey }: PageProps) => {
  const apolloClient = getApolloClient()

  const promiseProductDetail = getProductDetail(apolloClient, urlKey)

  const promises = [promiseProductDetail]
  const [productDetail] = await Promise.all(promises)

  const {
    name,
    categories,
    price_range,
    configurable_options,
    media_gallery_entries,
    description,
  } = productDetail.products.items[0]

  const price = (priceRange: any) => {
    return `${priceRange.maximum_price.final_price.currency} ${priceRange.maximum_price.final_price.value}`
  }

  const createMarkup = () => {
    return { __html: description.html }
  }

  return (
    <div>
      <div className="flex my-8 text-[16px] items-center">
        <Breadcrumb breadcrumb={categories} />
        <ChevronRight className="mx-4 h-6 w-6" />
        <span className="text-gray-500">{name}</span>
      </div>
      <div className="flex flex-row flex-wrap">
        {/* Media */}
        <div className="w-full sm:w-1/3 md:w-3/5 pr-4">
          <div className="sticky top-0 w-full">
            <Media media={media_gallery_entries} />
          </div>
        </div>

        {/* Product Detail */}
        <div className="w-full sm:w-2/3 md:w-2/5">
          <div className="flex justify-between mb-6 pb-6 border-b-[1px] border-black">
            <div>
              <h1 className="text-2xl mb-4">{name}</h1>
              <p className="text-lg">{price(price_range)}</p>
            </div>
            <div>
              <div className="flex">
                <StarIcon className="h-6 w-6 text-yellow-500" />
                <StarIcon className="h-6 w-6 text-yellow-500" />
                <StarIcon className="h-6 w-6 text-yellow-500" />
                <StarIcon className="h-6 w-6 text-yellow-500" />
                <StarIcon className="h-6 w-6 text-gray-300" />
              </div>
              <Link
                className="float-right mt-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                href="#"
              >
                2 reviews
              </Link>
            </div>
          </div>
          <ProductOptions productOptions={configurable_options} />
          <AddToCart />
          <div className="my-6 py-6 border-t-[1px]">
            <Button variant="link">
              <Heart className="mr-2 h-6 w-6" /> Add to Wishlist
            </Button>
            <Button variant="link">
              <BarChart2 className="mr-2 h-6 w-6" /> Add to Compare
            </Button>
          </div>
        </div>

        <div className="my-8 pt-8 border-t-[1px]">
          <p className="text-lg font-semibold mb-4">Product Description</p>
          <div
            className="product-description"
            dangerouslySetInnerHTML={createMarkup()}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Product
