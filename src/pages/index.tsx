import { AssetsContext } from "@/contexts/AssetsContext"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useContext, useEffect } from "react"
import { api } from "./api"

export default function Home() {
  const { assets } = useContext(AssetsContext);

  console.log(assets)

  useEffect(() => {
    const getAssets = async () => {
      const { data } = await api.get('/assets')
      console.log(data)
    }

    getAssets();
  }, [])

  return (
    <div>
      {/* <HighchartsReact
        highcharts={Highcharts}
        options={assets}
      /> */}
    </div>
  )
}
