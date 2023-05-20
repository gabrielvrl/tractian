import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useEffect } from "react"
import { api } from "./api"

const options = {
  title: {
    text: 'My chart'
  },
  series: [{
    data: [1, 2, 3]
  }]
}

export default function Home() {
  useEffect(() => {
    const getAssets = async () => {
      const { data } = await api.get('/assets')
      console.log(data)
    }

    getAssets();
  }, [])

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}
