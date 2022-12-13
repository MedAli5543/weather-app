import React from 'react'

import { SearchForm, WeatherSlider, TemperatureGraph } from './components'

import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

import './App.scss'

export function App() {
  return (
    <div className="App">
      <div className="container">
        <SearchForm />
        <WeatherSlider />
        <TemperatureGraph />
      </div>
    </div>
  )
}
