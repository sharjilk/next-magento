import { getApolloClient } from '@/framework/apollo/apollo-client'
import {
  getProductList,
  getProductFiltersByCategory,
} from '@/framework/apollo/operations'
import Link from 'next/link'
import { ChevronRight, LayoutList, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  CategoryProducts,
  PaginationControls,
  ProductFilters,
} from '@/components/product-list'

interface PageProps {
  pageType: string
  categoryId: string
  searchParams: { [key: string]: string | string[] | undefined }
  relativeUrl: string
}

const Category = async ({
  pageType,
  categoryId,
  searchParams,
  relativeUrl,
}: PageProps) => {
  const apolloClient = getApolloClient()

  const page = searchParams['page'] ?? '1'
  const pageSize = '6'

  // const ProductAttributeSortInput = {}
  const ProductAttributeSortInput = { position: 'ASC' }

  const filters = {
    category_uid: {
      in: [categoryId],
    },
    // price: {
    //   from: '70',
    //   to: '90',
    // },
  }
  // const filters = {
  //   sku: {
  //     in: ['VD09', 'VD08', 'VD03', 'VD05', 'VD10', 'VD01', 'VD12', 'VD07'],
  //   },
  //   price: { from: '70', to: '90' },
  // }

  const promiseCategoryList = getProductList(
    apolloClient,
    categoryId,
    page,
    pageSize,
    filters,
    ProductAttributeSortInput
  )

  const promises = [promiseCategoryList]
  const [categoryList] = await Promise.all(promises)

  const { data } = categoryList
  const { name, description } = data.categories.items[0]
  const items = data.products.items

  const totalPageCount = data.products.page_info.total_pages
  const hasNextPage = Number(page) < totalPageCount
  const hasPrevPage = Number(page) > 1

  const createCategoryDescriptionMarkup = () => {
    return { __html: description }
  }

  return (
    <div>
      {/* Product description and breadcrumb */}
      <div className="flex my-4">
        <Link href="/">Home</Link>
        <ChevronRight className="h-6 w-6 mx-3" />
        <span className="text-gray-500">{name}</span>
      </div>
      <h1 className="text-3xl my-8">{name}</h1>
      <div className="flex w-full justify-center align-center h-full space-x-12">
        <div
          className="flex align-middle justify-center items-center text-2xl"
          dangerouslySetInnerHTML={createCategoryDescriptionMarkup()}
        ></div>
      </div>

      <div className="flex flex-row flex-wrap">
        <aside className="w-full sm:w-1/3 md:w-1/5 pr-4">
          <div className="sticky top-0 w-full">
            <ProductFilters
              filters={data.products.aggregations}
              searchParams={searchParams}
            />
          </div>
        </aside>
        <div className="w-full sm:w-2/3 md:w-4/5">
          {/* Product nav bar */}
          <div className="flex justify-between">
            <div className="flex items-center">
              <Button variant="secondary" className="p-0 w-10 h-10">
                <LayoutGrid className="h-6 w-6" />
              </Button>
              <Button variant="secondary" className="ml-2 p-0 w-10 h-10">
                <LayoutList className="h-6 w-6" />
              </Button>
              <span className="ml-4">
                Total {data.products.total_count} items
              </span>
            </div>
            <div className="flex items-center">
              <span className="mr-4">Sort by</span>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="position">Position</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product list */}
          <CategoryProducts products={items} />

          {/* Pagination */}
          <PaginationControls
            relativeUrl={relativeUrl}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            totalPage={data.products.page_info.total_pages}
          />
        </div>
      </div>
    </div>
  )
}

export default Category
