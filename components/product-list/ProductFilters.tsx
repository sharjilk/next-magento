'use client'

import { useEffect, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { X } from 'lucide-react'

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
  const router = useRouter()
  const pathname = usePathname()
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string[]
  }>({})

  useEffect(() => {
    const selectedOptionsFromParams: { [key: string]: string[] } = {}

    for (const filter of filters) {
      // The `attribute_code` is the name of the filter
      const attributeCode = filter.attribute_code
      const filterValueFromParams = searchParams[attributeCode]

      if (filterValueFromParams) {
        // The `searchParams` can be an array of strings or a string
        // This line always converts it to an array of strings
        selectedOptionsFromParams[attributeCode] = Array.isArray(
          filterValueFromParams
        )
          ? filterValueFromParams
          : [filterValueFromParams]
      }
    }

    setSelectedOptions(selectedOptionsFromParams)
  }, [searchParams, filters, setSelectedOptions])

  const handleCheckboxChange = useCallback(
    (attributeCode: string, optionValue: string) => {
      // Update selected options for the given attribute code
      const updatedSelectedOptions = updateSelectedOptions(
        attributeCode,
        optionValue,
        selectedOptions
      )
      // Update selected options in state
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [attributeCode]: updatedSelectedOptions,
      }))

      // Update query string
      const queryParams = { ...searchParams }
      queryParams[attributeCode] = updatedSelectedOptions

      const queryString = Object.keys(queryParams)
        .map((key) => {
          const values = queryParams[key]
          if (Array.isArray(values)) {
            return values.map((value) => `${key}=${value}`).join('&')
          }
          return `${key}=${values}`
        })
        .join('&')

      router.push(`${pathname}?${queryString}`)

      // Smoothly scroll to the top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [router, selectedOptions]
  )

  const handleFilterClose = useCallback(
    (attributeCode: string, optionValue: string) => {
      // Get the updated selected options
      const updatedSelectedOptions = updateSelectedOptions(
        attributeCode,
        optionValue,
        selectedOptions
      )

      // Set the updated selected options
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [attributeCode]: updatedSelectedOptions,
      }))

      // Update the query params
      const queryParams = { ...searchParams }
      queryParams[attributeCode] = updatedSelectedOptions

      // Generate the query string
      const queryString = Object.keys(queryParams)
        .map((key) => {
          const values = queryParams[key]
          if (Array.isArray(values)) {
            return values.map((value) => `${key}=${value}`).join('&')
          }
          return `${key}=${values}`
        })
        .join('&')

      // Update the URL
      router.push(`${pathname}?${queryString}`)

      // Smoothly scroll to the top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [router, selectedOptions]
  )

  function updateSelectedOptions(
    attributeCode: string,
    optionValue: string,
    selectedOptions: { [key: string]: string[] }
  ) {
    // Get the currently selected options for the attribute
    const currentSelectedOptions = selectedOptions[attributeCode] || []
    // Remove the option if it's already selected
    if (currentSelectedOptions.includes(optionValue)) {
      return currentSelectedOptions.filter((value) => value !== optionValue)
    } else {
      // Add the option if it's not already selected
      return [...currentSelectedOptions, optionValue]
    }
  }

  return (
    <>
      <div className="flex flex-col mb-4">
        {Object.keys(selectedOptions).length > 0 && (
          <p className="text-xl font-semibold pb-2">Filters</p>
        )}
        {Object.keys(selectedOptions).map((attributeCode) => (
          <div key={attributeCode}>
            <span>
              {
                filters.find(
                  (filter) => filter.attribute_code === attributeCode
                )?.label
              }
              :
            </span>
            <div
              key={attributeCode}
              className="flex px-2 flex-wrap items-center mb-2"
            >
              {selectedOptions[attributeCode].map((optionValue) => (
                <div
                  key={optionValue}
                  className="flex items-center bg-black text-white px-3 py-1 mt-2 mr-2 rounded space-x-1"
                >
                  <span>
                    {
                      filters
                        .find(
                          (filter) => filter.attribute_code === attributeCode
                        )
                        ?.options.find((option) => option.value === optionValue)
                        ?.label
                    }
                  </span>
                  <button
                    onClick={() =>
                      handleFilterClose(attributeCode, optionValue)
                    }
                    className="text-white hover:text-slate-400"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Accordion type="multiple" className="w-full">
        <p className="text-xl border-b-[1px] font-semibold pb-2">
          Shop By Filters
        </p>
        {filters.map((filter) => {
          return (
            <AccordionItem
              key={filter.attribute_code}
              value={filter.attribute_code}
            >
              <AccordionTrigger>{filter.label}</AccordionTrigger>
              <AccordionContent>
                {filter.options.map((option) => {
                  const isSelected = (
                    selectedOptions[filter.attribute_code] || []
                  ).includes(option.value)

                  return (
                    <div key={option.value} className="mb-4 ml-4">
                      <label
                        htmlFor={option.value}
                        className="flex items-center space-x-2 cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        <Checkbox
                          id={option.value}
                          checked={isSelected}
                          onCheckedChange={() =>
                            handleCheckboxChange(
                              filter.attribute_code,
                              option.value
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
    </>
  )
}

export default ProductFilters
