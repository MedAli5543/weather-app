import React from 'react'
import { useValues } from 'kea'
import { Line } from '@ant-design/plots'
import { Button, Skeleton } from 'antd'
import { ExportToCsv } from 'export-to-csv'
import { DotChartOutlined } from '@ant-design/icons'

import { appLogic } from '../../appLogic'

import './styles.scss'

export function TemperatureGraph() {
  const { weatherData, isLoading } = useValues(appLogic)

  const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'weather_data',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  }
  const config = {
    data: weatherData,
    xField: 'date',
    yField: 'temperature',
  }

  const csvExporter = new ExportToCsv(options)

  return (
    <div>
      <Button className="download-csv" onClick={() => csvExporter.generateCsv(weatherData)}>
        Download CSV
      </Button>
      <div className="temperature-graph">
        {isLoading ? (
          <Skeleton.Node active={true} style={{ width: '800px', height: '508px' }}>
            <DotChartOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
          </Skeleton.Node>
        ) : (
          <>
            <h4 className="graph-title">Temperature</h4>
            <Line {...config} />
          </>
        )}
      </div>
    </div>
  )
}
