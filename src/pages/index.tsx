import { AuthContext } from "@/contexts/AuthContext";
import { IAssets } from "@/interfaces";
import { formatDate } from "@/utils/formatDate";
import { Typography } from "antd";
import {CaretDownOutlined} from "@ant-design/icons";
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official";
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

  useEffect(() => {
    if(!authenticatedUser?.user) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    const getAssets = async () => {
      const { data } = await api.get('/assets')
      setAssets(data);
    }

    getAssets();
  }, [])

  const TypographTitle = {
    color: theme?.palette.primary.main,
    marginBottom: '1rem',
    cursor: 'pointer',
  };

  const TypographText = {
    color: theme?.palette.common.white,
    marginBottom: '1rem',
    fontSize: '1rem',
    fontWeight: 'bold',
  };

  const IconStyle = {
    color: theme?.palette.primary.main,
    backgroundColor: 'transparent',
    cursor: 'pointer',
  }

  const handleNavigation = (id: number) => {
    router.push(`/asset/${id}`);
  }

  return (
    <S.Container>
      {/* <button onClick={() => router.push(`/workorders/${}`)}>Workorders</button> */}
      {
        assets.map((asset) => {
          if(asset.assignedUserIds.includes(authenticatedUser?.user?.id || 0)) {
            const uniqueYAxisCategories = Array.from(new Set(asset.healthHistory.map(healthTimestamp => (healthTimestamp.status))));

            return(
              <S.CardContainer key={asset.id}>
                <S.InfoContainer>
                  <S.InfoContent>
                  <Typography.Title
                      level={2}
                      style={TypographTitle}
                      onClick={() => handleNavigation(asset.id)}
                    >{asset.name}</Typography.Title>
                    <S.CardContent>
                      <Typography.Text style={TypographText}>Modelo: {asset.model}</Typography.Text>
                      <Typography.Text style={TypographText}>Estado: {asset.status}</Typography.Text>
                      <Typography.Text style={TypographText}>Sensor(es): {asset.sensors.map(sensor => (`${sensor} `))}</Typography.Text>
                      <Typography.Text style={TypographText}>Nota da Saúde do Sistema: {asset.healthscore}</Typography.Text>
                      <S.SeeMore onClick={() => handleNavigation(asset.id)}>
                        <CaretDownOutlined style={IconStyle} />
                        <Typography.Text style={{
                          color: theme?.palette.primary.main,
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          marginLeft: '0.5rem',
                        }}>Ver mais</Typography.Text>
                      </S.SeeMore>

                    </S.CardContent>
                  </S.InfoContent>
                  <S.MachineImage src={asset.image} alt={'Image'} width={300} height={300} />
                </S.InfoContainer>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: {
                      type: 'line'
                    },
                    title: {
                      text: 'Saúde do Sistema'
                    },
                    xAxis: {
                      categories: asset.healthHistory.map(health => (formatDate(health.timestamp)))
                    },
                    yAxis: {
                      title: {
                        text: 'Operation System'
                      },
                      categories: uniqueYAxisCategories
                    },
                    series: [{
                      name: 'Saúde do Sistema Operacional',
                      data: asset.healthHistory.map((health, index) => (health.status === uniqueYAxisCategories[0] ? 0 : health.status === uniqueYAxisCategories[1] ? 1 : 2)),
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
