import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const options = {
  title: {
    text: 'My chart'
  },
  series: [{
    data: [1, 2, 3]
  }]
}

export default function Home() {
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    <h1>Hello Tractian!</h1>
    </div>
  )
}
