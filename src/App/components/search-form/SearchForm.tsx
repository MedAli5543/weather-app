import React from 'react'
import { useActions, useValues } from 'kea'
import { Button, Input, Select } from 'antd'

import { appLogic } from '../../appLogic'

import './styles.scss'

export function SearchForm() {
  const { setCity, setTemperatureUnit, fetchWeatherData } = useActions(appLogic)
  const { city, temperatureUnit } = useValues(appLogic)

  return (
    <div className="search-form">
      <Input
        className="city-field"
        value={city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
      />
      <Select
        className="temperature-unit-select"
        defaultValue={temperatureUnit}
        onChange={(value) => setTemperatureUnit(value)}
        options={[
          { value: 'celsius', label: 'Celsius' },
          { value: 'fahrenheit', label: 'Fahrenheit' },
        ]}
      />
      <Button className="submit-form-button" type="primary" onClick={fetchWeatherData}>
        Submit
      </Button>
    </div>
  )
}
