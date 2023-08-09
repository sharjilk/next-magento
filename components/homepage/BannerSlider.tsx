'use client'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'

type bannerSliderprops = {
  __typename: string
  sys: {
    id: string
  }
  title: string
  subtitle: string
  buttonText: string
  link: string
  imageSrc: {
    url: string
  }
  imageWidth: string
  imageHeight: string
}[]

const BannerSlider = ({ slides }: { slides: bannerSliderprops }) => {
  return (
    <Swiper
      navigation={true}
      loop={true}
      modules={[Navigation]}
      slidesPerView={1}
    >
      {slides.map((slide) => {
        return (
          <SwiperSlide key={slide.sys.id}>
            <div className="relative">
              <img
                src={slide.imageSrc.url}
                alt={slide.title}
                className="w-full h-full"
                width={slide.imageWidth}
                height={slide.imageHeight}
              />
              <div className="absolute top-0 left-40 p-4 w-2/5 h-full justify-center flex flex-col">
                <h2 className="text-4xl font-bold">{slide.title}</h2>
                <p className="mt-6">{slide.subtitle}</p>

                <Link className="mt-6" href={slide.link}>
                  <Button size="lg" className="uppercase">
                    {slide.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default BannerSlider
