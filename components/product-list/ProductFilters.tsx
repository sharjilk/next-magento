'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import router from 'next/router'
import { useEffect, useState } from 'react'

interface ProductFiltersProps {
  filters: {
    label: string
    attribute_code: string
    count: number
    options: {
      label: string
      value: string
    }[]
    position: number
  }[]
  searchParams: { [key: string]: string | string[] | undefined }
}

const ProductFilters = ({ filters, searchParams }: ProductFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[]
  }>({})

  // const router = useRouter()

  useEffect(() => {
    // Function to handle filter changes on the client-side
    const handleFilterChange = (
      attributeCode: string,
      optionValue: string,
      checked: boolean
    ) => {
      setSelectedFilters((prevSelectedFilters) => {
        const currentSelectedOptions = prevSelectedFilters[attributeCode] || []
        const updatedSelectedOptions = checked
          ? [...currentSelectedOptions, optionValue]
          : currentSelectedOptions.filter((option) => option !== optionValue)
        return {
          ...prevSelectedFilters,
          [attributeCode]: updatedSelectedOptions,
        }
      })
    }

    // Function to update URL parameters based on selected filters
    const updateURLParameters = () => {
      const params = new URLSearchParams()
      for (const key in selectedFilters) {
        if (selectedFilters[key].length > 0) {
          params.append(key, selectedFilters[key].join(','))
        }
      }
      console.log('push roiter')
      // router.push({ pathname: router.pathname, search: params.toString() })
      // router.push(`/${relativeUrl}/?page=${Number(page) - 1}`)
    }

    // Call the updateURLParameters function whenever selectedFilters change
    updateURLParameters()
  }, [selectedFilters])

  return (
    <Accordion type="multiple" className="w-full">
      <p className="text-xl border-b-[1px] pb-2">Shop By Filters</p>
      {filters.map((filter) => {
        return (
          <AccordionItem value={filter.attribute_code}>
            <AccordionTrigger>{filter.label}</AccordionTrigger>
            <AccordionContent>
              {filter.options.map((option) => {
                const optionValue = option.value
                const isChecked = (
                  selectedFilters[filter.attribute_code] || []
                ).includes(optionValue)
                return (
                  <div className="mb-4 ml-4" key={optionValue}>
                    <label
                      htmlFor={optionValue}
                      className="flex items-center space-x-2 cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <Checkbox
                        id={optionValue}
                        checked={isChecked}
                        onChange={(e) =>
                          handleFilterChange(
                            filter.attribute_code,
                            optionValue,
                            e.target.checked
                          )
                        }
                      />
                      <span>{option.label}</span>
                    </label>
                  </div>
                )
              })}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default ProductFilters
