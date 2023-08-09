'use client'

import { useEffect, useState } from 'react'

type ProductOptionValue = {
  uid: string
  default_label: string
  label: string
  store_label: string
  use_default_value: boolean
  value_index: number
  swatch_data: {
    value: string
  }
}

type ProductOptionProps = {
  attribute_code: string
  attribute_id: string
  uid: string
  label: string
  values: ProductOptionValue[]
}

interface SelectedOptionsState {
  [attribute_code: string]: string
}

const ProductOptions = ({
  productOptions,
}: {
  productOptions: ProductOptionProps[]
}) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsState>(
    {}
  )

  const handleOptionChange = (attributeCode: string, valueLabel: string) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [attributeCode]: valueLabel,
    }))
  }

  return (
    <>
      {productOptions?.map((option) => (
        <div className="mb-6 border-b-[1px] pb-6" key={option.attribute_id}>
          <p className="text-lg mb-4">{option.label}</p>
          <div className="flex flex-row items-center flex-wrap">
            {option.values?.map((value) => (
              <div
                onClick={() =>
                  handleOptionChange(option.attribute_code, value.default_label)
                }
                key={value.uid}
                className={`flex flex-col items-center mr-4 cursor-pointer rounded-sm border-2 
                ${
                  option.attribute_code === 'fashion_color' ? 'border-none' : ''
                }
                ${
                  selectedOptions[option.attribute_code] ===
                    value.default_label &&
                  option.attribute_code !== 'fashion_color'
                    ? 'border-2 border-black'
                    : ''
                }`}
              >
                {option.attribute_code === 'fashion_color' ? (
                  <div
                    style={{ backgroundColor: value.swatch_data.value }}
                    className={`w-10 h-10 rounded-full ${
                      selectedOptions[option.attribute_code] ===
                      value.default_label
                        ? 'border-2 border-black'
                        : ''
                    }`}
                  ></div>
                ) : (
                  <input
                    type="radio"
                    name={option.attribute_code}
                    id={value.uid}
                    className="mr-2 hidden"
                  />
                )}
                <label
                  htmlFor={value.uid}
                  className={`cursor-pointer ${
                    option.attribute_code === 'fashion_color'
                      ? 'text-[12px]'
                      : 'text-lg w-10 h-10 text-center leading-10 border-2 border-transparent box-content'
                  }
                  `}
                >
                  {option.attribute_code === 'fashion_color'
                    ? value.default_label
                    : value.swatch_data.value}
                </label>
              </div>
            ))}
            {selectedOptions[option.attribute_code] && (
              <p className="ml-4">
                Selected: {selectedOptions[option.attribute_code]}
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default ProductOptions
