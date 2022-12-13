import { actions, kea, listeners, path, reducers, selectors, afterMount } from 'kea'
import { message } from 'antd'

import type { appLogicType } from './appLogicType'

type WeatherData = {
  date: string
  temperature: number
  temperatureUnit: string
}

export const appLogic = kea<appLogicType>([
  path(['App', 'appLogic']),
  actions({
    setTemperatures: (temperatures) => ({ temperatures }),
    setDates: (dates) => ({ dates }),
    setCity: (city) => ({ city }),
    setTemperatureUnit: (temperatureUnit) => ({ temperatureUnit }),
    setFetchError: (error) => ({ error }),
    fetchWeatherData: true,
  }),
  reducers({
    temperatures: [
      [],
      {
        setTemperatures: (_, { temperatures }) => temperatures,
      },
    ],
    dates: [
      [],
      {
        setDates: (_, { dates }) => dates,
      },
    ],
    city: [
      'tunis',
      {
        setCity: (_, { city }) => city,
      },
    ],
    temperatureUnit: [
      'celsius',
      {
        setTemperatureUnit: (_, { temperatureUnit }) => temperatureUnit,
      },
    ],
    isLoading: [
      true,
      {
        fetchWeatherData: () => true,
        setFetchError: () => false,
        setDates: () => false,
        setTemperatures: () => false,
      },
    ],
    error: [
      null,
      {
        setCity: () => null,
        setTemperatureUnit: () => null,
        setFetchError: (_, { error }) => error,
      },
    ],
  }),
  selectors({
    weatherData: [
      (selectors) => [selectors.temperatures, selectors.dates, selectors.temperatureUnit],
      (temperatures, dates, temperatureUnit) => {
        const weatherData: WeatherData[] = []

        for (let i = 0; i < temperatures.length; i++) {
          weatherData.push({
            date: dates[i],
            temperature: temperatures[i],
            temperatureUnit,
          })
        }

        return weatherData
      },
    ],
  }),
  listeners(({ actions, values }) => ({
    fetchWeatherData: async (_, breakpoint) => {
      await breakpoint(300)

      const { setTemperatures, setDates, setFetchError } = actions
      const { temperatureUnit, city } = values

      const getCityCoordinates = async (cityName) => {
        const API_URL = 'https://api.api-ninjas.com/v1/city?name='
        const API_KEY = 'ZGwlTRLA5cM30/vVy/8jkw==4m5rooSEc9mVIDr2'

        let response

        try {
          response = await fetch(API_URL + cityName, {
            headers: {
              'X-Api-Key': API_KEY,
            },
          })
        } catch (error) {}

        const data = await response.json()

        if (data.length) {
          const { latitude, longitude } = data[0]

          return { latitude, longitude }
        }

        setFetchError('Unvalid City Name! Please enter an valid city name!')
        return message.error('Unvalid City Name! Please enter an valid city name!')
      }

      try {
        const { latitude, longitude } = await getCityCoordinates(city)

        const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&timezone=auto&past_days=1&temperature_unit=${temperatureUnit}`

        const response = await fetch(API_URL)
        const data = await response.json()
        const {
          daily: { temperature_2m_max, time },
        } = data

        console.log('___________RES_________', city, latitude, longitude, data)

        setTemperatures(temperature_2m_max)
        setDates(time)
      } catch (error) {
        console.log('___________ERROR________', error, city)
      }
    },
  })),
  afterMount(({ actions }) => {
    actions.fetchWeatherData()
  }),
])
