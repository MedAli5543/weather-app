import React from 'react'
import { useValues } from 'kea'
import { Skeleton } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { DotChartOutlined } from '@ant-design/icons'

import { appLogic } from '../../appLogic'

import 'swiper/css'
import 'swiper/css/navigation'

import './styles.scss'

export function WeatherSlider() {
  const { isLoading, weatherData } = useValues(appLogic)
  return (
    <div>
      {isLoading ? (
        <>
          <Skeleton.Node active={true} style={{ width: 269.333, height: 300, marginRight: 30 }}>
            <DotChartOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
          </Skeleton.Node>
          <Skeleton.Node active={true} style={{ width: 269.333, height: 300, marginRight: 30 }}>
            <DotChartOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
          </Skeleton.Node>
          <Skeleton.Node active={true} style={{ width: 269.333, height: 300 }}>
            <DotChartOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
          </Skeleton.Node>
        </>
      ) : (
        <Swiper slidesPerView={3} spaceBetween={30} navigation modules={[Navigation]} className="mySwiper">
          {weatherData.map(({ date, temperature, temperatureUnit }, index) => (
            <SwiperSlide key={`slider#${index}`}>
              <div>
                Temp: {temperature} {temperatureUnit === 'celsius' ? <span>&#8451;</span> : <span>&#8457;</span>}
              </div>
              <div>Day: {date}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}
