import { getApolloClient } from '@/framework/apollo/apollo-client'
import { getProductForWidget } from '@/framework/apollo/operations'
import Link from 'next/link'
import Image from 'next/image'
import { AddToCart, Compare, Price, Wishlist } from '../product-list'

type productWidgetProps = {
  productSku: {
    __typename: string
    title: string
    productSku: {}
  }
}

const ProductWidget = async ({ productSku }: productWidgetProps) => {
  const apolloClient = getApolloClient()

  const promiseProductForWidget = getProductForWidget(
    apolloClient,
    productSku.productSku
  )
  const promises = [promiseProductForWidget]
  const [productForWidget] = await Promise.all(promises)

  return (
    <div className="mt-24">
      <h2 className="text-[26px] font-semibold text-center">
        {productSku.title}
      </h2>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {productForWidget &&
          productForWidget?.items?.map((item: any) => {
            return (
              <div
                className="group relative overflow-hidden md:border py-6"
                key={item.uid}
              >
                <Link href={item.url_key + item.url_suffix}>
                  <Image
                    src={item.image.url}
                    width={640}
                    height={640}
                    alt={item.name}
                  />
                  <div className="text-center mt-4 md:text-lg font-semibold">
                    {item.name}
                  </div>
                </Link>
                <Price
                  className="md:text-[16px] text-center"
                  price={item.price_range.maximum_price}
                  productType={item.__typename}
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
            )
          })}
      </div>
    </div>
  )
}

export default ProductWidget
