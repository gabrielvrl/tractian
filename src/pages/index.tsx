import { AuthContext } from "@/contexts/AuthContext";
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useRouter } from "next/router";
import { useContext, useEffect } from "react"
import { api } from "../api"

export default function Home() {
  const router = useRouter();
  const authenticatedUser = useContext(AuthContext);
  console.log(authenticatedUser?.user)

  useEffect(() => {
    const getAssets = async () => {
      const { data } = await api.get('/assets')
      console.log(data)
    }

    getAssets();
  }, [])

  useEffect(() => {
    if(!authenticatedUser?.user) {
      router.push('/login');
    }
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
