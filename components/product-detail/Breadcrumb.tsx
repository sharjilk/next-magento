'use client'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type breadcrumbProps = {
  breadcrumb: {
    breadcrumbs: any
    category_uid: string
    category_name: string
    category_url_path: string
  }[]
}

interface BreadcrumbItemState {
  category_uid: string
  category_name: string
  category_url_path: string
}

const Breadcrumb = ({ breadcrumb }: breadcrumbProps) => {
  const [breadcrumbItem, setbreadcrumbItem] =
    useState<BreadcrumbItemState[]>(breadcrumb)

  useEffect(() => {
    const breadcrumbsArray = breadcrumb
      .map((breadcrumb) => breadcrumb.breadcrumbs)
      .flat()

    setbreadcrumbItem(breadcrumbsArray.filter((item) => item !== null))
  }, [breadcrumb])

  return (
    <div className="flex items-center">
      <Button variant="link" className="p-0 h-auto">
        <Link href="/">Home</Link>
      </Button>
      {breadcrumbItem?.map((item, index) => (
        <span className="flex" key={index}>
          {item?.category_uid && <ChevronRight className="mx-4 h-6 w-6" />}
          <Button variant="link" className="p-0 h-auto">
            <Link href={`/${item?.category_url_path}.html`}>
              {item?.category_name}
            </Link>
          </Button>
        </span>
      ))}
    </div>
  )
}

export default Breadcrumb
