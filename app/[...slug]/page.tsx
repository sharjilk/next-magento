import { getApolloClient } from '@/framework/apollo/apollo-client'
import { Cms } from '@/components/cms'
import { Product } from '@/components/product-detail'
import { Category } from '@/components/product-list'
import { Header, Footer, NotFound } from '@/components/common'
import {
  getUrlResolver,
  getMenuCategories,
} from '@/framework/apollo/operations'

enum PageTypes {
  Product = 'PRODUCT',
  Category = 'CATEGORY',
  CmsPage = 'CMS_PAGE',
}

type PageType = {
  [key: string]: React.ReactNode
}

type renderPageContentType = {
  type: string
  uid: string
  url_key: string
  relative_url: string
}

type searchParamsType = { [key: string]: string | string[] | undefined }

const renderPageContent = (
  routeType: renderPageContentType,
  searchParams: searchParamsType
) => {
  const pages: PageType = {
    [PageTypes.CmsPage]: <Cms pageType={routeType?.type} />,
    [PageTypes.Product]: (
      <Product pageType={routeType?.type} urlKey={routeType?.url_key} />
    ),
    [PageTypes.Category]: (
      <Category
        pageType={routeType?.type}
        relativeUrl={routeType?.relative_url}
        categoryId={routeType?.uid}
        searchParams={searchParams}
      />
    ),
  }

  return pages[routeType?.type] || null
}

type PageProps = {
  params: {
    slug: string | string[]
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

const Page = async ({ params, searchParams }: PageProps) => {
  const apolloClient = getApolloClient()

  const generateUrl = (slug: string | string[]) => {
    if (Array.isArray(slug)) {
      return slug.join('/')
    } else if (typeof slug === 'string') {
      return slug
    } else {
      // Handle other cases (e.g., if slug is neither a string nor an array)
      return ''
    }
  }

  const slug = generateUrl(params?.slug)

  const promiseUrlResolver = getUrlResolver(apolloClient, slug)
  const promiseMenuCategories = getMenuCategories(apolloClient)
  const promises = [promiseUrlResolver, promiseMenuCategories]
  const [urlResolver, menuCategories] = await Promise.all(promises)

  if (!urlResolver) {
    return <NotFound />
  }

  const content = renderPageContent(urlResolver, searchParams)

  if (menuCategories) {
    return (
      <>
        <Header menu={menuCategories} />
        <main className="container">{content}</main>
        <Footer />
      </>
    )
  }
}

export default Page
