import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'

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
  return (
    <Accordion type="multiple" className="w-full">
      <p className="text-xl border-b-[1px] pb-2">Shop By Filters</p>
      {filters.map((filter) => {
        return (
          <AccordionItem value={filter.attribute_code}>
            <AccordionTrigger>{filter.label}</AccordionTrigger>
            <AccordionContent>
              {filter.options.map((option) => {
                return (
                  <div className="mb-4 ml-4">
                    <label
                      htmlFor={option.value}
                      className="flex items-center space-x-2 cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <Checkbox id={option.value} />
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
