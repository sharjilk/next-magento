import React from 'react'

type priceProps = {
  price: {
    final_price: {
      currency: string
      value: number
    }
    regular_price: {
      currency: string
      value: number
    }
  }
  productType: string
  className?: string
}

const Price = ({ price, productType, className }: priceProps) => {
  return (
    <>
      {productType === 'SimpleProduct' && (
        <p className={className}>
          {price?.final_price?.currency} {price?.final_price?.value}
        </p>
      )}
      {productType === 'ConfigurableProduct' && (
        <p className={className}>
          As low as: {price?.final_price?.currency} {price?.final_price?.value}
        </p>
      )}
    </>
  )
}

export default Price
