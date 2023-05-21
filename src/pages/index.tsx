import { AuthContext } from "@/contexts/AuthContext";
import { IAssets } from "@/interfaces";
import { formatDate } from "@/utils/formatDate";
import { Typography } from "antd";
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import { useTheme } from "styled-components";
import { api } from "../api"
import * as S from "./homeStyles"

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const authenticatedUser = useContext(AuthContext);
  const [assets, setAssets] = useState<IAssets[]>([] as IAssets[]);

  console.log(assets)

  useEffect(() => {
    const getAssets = async () => {
      const { data } = await api.get('/assets')
      setAssets(data);
    }

    getAssets();
  }, [])

  useEffect(() => {
    if(!authenticatedUser?.user) {
      router.push('/login');
    }
  }, []);

  const TypographTitle = {
    color: theme?.palette.common.white,
    marginBottom: '1rem',
  };

  const TypographText = {
    color: theme?.palette.common.white,
    marginBottom: '1rem',
    fontSize: '1rem',
    fontWeight: 'bold',
  };

  return (
    <S.Container>
      {
        assets.map((asset) => {
          if(JSON.stringify(asset.assignedUserIds).includes(authenticatedUser!.user!.username)) {
            return(
              <S.CardContainer key={asset.id}>
                <Typography.Title
                  level={2}
                  style={TypographTitle}
                >{asset.name}</Typography.Title>
                <S.CardContent>
                  <Typography.Text style={TypographText}>Modelo: {asset.model}</Typography.Text>
                  <Typography.Text style={TypographText}>Estado: {asset.status}</Typography.Text>
                  <Typography.Text style={TypographText}>Empresa: {asset.companyId}</Typography.Text>
                  <Typography.Text style={TypographText}>Sensores: {asset.sensors.map(sensor => (`${sensor} `))}</Typography.Text>
                </S.CardContent>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: {
                      type: 'line'
                    },
                    title: {
                      text: 'Health History'
                    },
                    xAxis: {
                      categories: asset.healthHistory.map(healthTimestamp => (formatDate(healthTimestamp.timestamp)))
                    },
                    yAxis: {
                      title: {
                        text: 'Operation System'
                      },
                      categories: asset.healthHistory.map(healthTimestamp => (healthTimestamp.status))
                    },
                    series: [{
                      name: 'Saúde do Sistema Operacional',
                      data: asset.healthHistory.map((_, index) => (index))
                    }],
                  }}
                />
              </S.CardContainer>
            )
          }
        })
      }

    </S.Container>
  )
}
