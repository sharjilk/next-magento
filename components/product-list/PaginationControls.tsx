'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useCallback } from 'react'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  relativeUrl: string
  totalPage: number
}

const PaginationControls = ({
  hasNextPage,
  hasPrevPage,
  relativeUrl,
  totalPage,
}: PaginationControlsProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'

  return (
    <div className="flex items-center justify-center my-8 space-x-4">
      <Button
        variant="outline"
        size="icon"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/${relativeUrl}/?page=${Number(page) - 1}`)
        }}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div>
        {page} / {totalPage}
      </div>
      <Button
        variant="outline"
        size="icon"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/${relativeUrl}/?page=${Number(page) + 1}`)
        }}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default PaginationControls
