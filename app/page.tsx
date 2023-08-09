import type { Metadata } from 'next'
import { Header, Footer } from '@/components/common'
import {
  getMenuCategories,
  getCmsHomePageContentful,
} from '@/framework/apollo/operations'
import { BannerSlider, ProductWidget } from '@/components/homepage'
import { getApolloClient } from '@/framework/apollo/apollo-client'
import { getApolloClientContentful } from '@/framework/apollo/apollo-client-contenful'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Homepage',
  description: 'Dubai best shopping store',
}

const Home = async () => {
  const apolloClient = getApolloClient()
  const apolloClientContentful = getApolloClientContentful()

  const homepageId: string = '41YBKkamVxuo3Xn3fnylqe'

  const promiseMenuCategories = getMenuCategories(apolloClient)
  const promiseCmsHomePageContentful = getCmsHomePageContentful(
    apolloClientContentful,
    homepageId
  )

  const promises = [promiseMenuCategories, promiseCmsHomePageContentful]
  const [menuCategories, cmsHomePageContentful] = await Promise.all(promises)

  const mediumBanner3col =
    cmsHomePageContentful?.nextHomepage?.middleContentCollection?.items?.filter(
      (item: any) => item.__typename === 'Next3ColumnMediumBanner'
    )

  const mediumBanner3colContent = mediumBanner3col.reduce(
    (acc: any, item: any) => {
      if (item.bannerCollection && item.bannerCollection.items) {
        acc.push(...item.bannerCollection.items)
      }
      return acc
    },
    []
  )
  const wideBannerArray =
    cmsHomePageContentful?.nextHomepage?.middleContentCollection?.items?.filter(
      (item: any) => item.__typename === 'NextWideBanner'
    )
  const wideBanner = wideBannerArray[0]

  const productWidgetSku =
    cmsHomePageContentful?.nextHomepage?.middleContentCollection?.items?.filter(
      (item: any) => item.__typename === 'NextProductWidget'
    )

  if (menuCategories) {
    return (
      <>
        <Header menu={menuCategories} />
        <div className="container">
          <BannerSlider
            slides={
              cmsHomePageContentful?.nextHomepage?.heroBannerCollection?.items
            }
          />

          {/* 3 column banner */}
          <div className="flex flex-row justify-between space-x-8 mt-8">
            {mediumBanner3colContent &&
              mediumBanner3colContent?.map((item: any) => {
                return (
                  <div className="flex flex-col w-1/3 relative">
                    <img
                      src={item?.image?.url}
                      alt={item?.title}
                      className="w-full h-full"
                    />
                    <div className="absolute bottom-0 right-0 bg-black text-white px-6 py-4">
                      <h2 className="text-lg uppercase">{item?.title}</h2>
                      <p>{item?.subtitle}</p>
                    </div>
                  </div>
                )
              })}
          </div>

          {/* Wide Banner */}
          {wideBanner && (
            <div className="flex items-center justify-center w-full my-20">
              <div className="w-2/4">
                <h2 className="text-[26px] font-semibold mb-4 uppercase">
                  {wideBanner?.title}
                </h2>
                <p className="text-lg mb-4">{wideBanner?.subtitle}</p>
                <p>{wideBanner?.paragraph}</p>
                <Link
                  className="bg-black text-white py-3 rounded-sm uppercase px-6 inline-block mt-6"
                  href={wideBanner?.buttonLink}
                >
                  {wideBanner?.buttonText}
                </Link>
              </div>
              <Image
                src={wideBanner?.image?.url}
                alt={wideBanner?.title}
                width={550}
                height={360}
              />
            </div>
          )}

          {/* Product Widget from contentful */}
          <ProductWidget productSku={productWidgetSku[0]} />
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
