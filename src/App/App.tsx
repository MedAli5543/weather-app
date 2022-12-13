import React from 'react'
import { useValues } from 'kea'
import { Result, Button } from 'antd'
import { SearchForm, WeatherSlider, TemperatureGraph } from './components'

import { appLogic } from './appLogic'

import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

import './App.scss'

export function App() {
  const { error } = useValues(appLogic)

  return (
    <div className="App">
      <div className="container">
        <SearchForm />
        {error ? (
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={
              <Button onClick={() => window.location.reload()} type="primary">
                Back Home
              </Button>
            }
          />
        ) : (
          <>
            <WeatherSlider />
            <TemperatureGraph />
          </>
        )}
      </div>
    </div>
  )
}
