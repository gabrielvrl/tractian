import { AuthContext, User } from "@/contexts/AuthContext";
import { IAssets } from "@/interfaces";
import { formatDate } from "@/utils/formatDate";
import { Typography } from "antd";
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import { useTheme } from "styled-components";
import { api } from "../../api"
import * as S from "./styles"

export default function FullAssetAnalysis() {
  const theme = useTheme();
  const router = useRouter();
  const { FullAssetAnalysis } = router.query;
  const [asset, setAsset] = useState<IAssets>({} as IAssets);
  const uniqueYAxisCategories = Array.from(new Set(asset?.healthHistory?.map(healthTimestamp => (healthTimestamp.status))));
  

  useEffect(() => {
    const getAssets = async () => {
      const { data } = await api.get(`/assets/${FullAssetAnalysis}`)
      setAsset(data);
    }

    getAssets();
  }, [])

  const TypographTitle = {
    color: theme?.palette.primary.main,
    marginBottom: '1rem',
  };

  const TypographText = {
    color: theme?.palette.common.white,
    marginBottom: '1rem',
    fontSize: '1rem',
    fontWeight: 'bold',
  };

  //   ### **Important:**

  // - Show all features of assets;
  // - Show companies, units and users;
  // - Actions such as delegating responsibility, updating assets, company, unit and users;
  // - Use graphs to show health levels, status and so on.

  return (
    <S.Container>
      <S.CardContainer key={asset.id}>
        <Typography.Title
          level={2}
          style={TypographTitle}
        >{asset.name}</Typography.Title>
        <S.InfoContainer>
          <S.InfoContent>
            <S.CardContent>
              <Typography.Text style={TypographText}>Id da empresa: {asset.companyId}</Typography.Text>
              <Typography.Text style={TypographText}>Id do maquinário: {asset.id}</Typography.Text>
              <Typography.Text style={TypographText}>Id da unidade: {asset.unitId}</Typography.Text>
              <Typography.Text style={TypographText}>Modelo: {asset.model}</Typography.Text>
              <Typography.Text style={TypographText}>Estado: {asset.status}</Typography.Text>
              <Typography.Text style={TypographText}>Sensor(es): {asset?.sensors?.map(sensor => (`${sensor} `))}</Typography.Text>
              <Typography.Text style={TypographText}>Nota da Saúde do Sistema: {asset.healthscore}</Typography.Text>

              {
                asset?.metrics?.lastUptimeAt && <Typography.Text style={TypographText}>Data da Ultima Coleta Uptime(Ligada): {formatDate(asset?.metrics?.lastUptimeAt)}</Typography.Text>
              }
              {
                asset?.metrics?.totalCollectsUptime && <Typography.Text style={TypographText}>Total de Coletas Uptime(Ligada): {asset?.metrics?.totalCollectsUptime} horas</Typography.Text>
              }
              {
                asset?.metrics?.totalUptime && <Typography.Text style={TypographText}>Total de Horas de Coletas Uptime(Ligada): {asset?.metrics?.totalUptime} horas</Typography.Text>
              }
              {
                asset?.specifications?.maxTemp && <Typography.Text style={TypographText}>Temperatura Máxima em Celsius: {asset?.specifications?.maxTemp}°C</Typography.Text>
              }
              {
                asset?.specifications?.power && <Typography.Text style={TypographText}>Temperatura Máxima em Celsius: {asset?.specifications?.power}</Typography.Text>
              }
              {
                asset?.specifications?.rpm && <Typography.Text style={TypographText}>Temperatura Máxima em Celsius: {asset?.specifications?.rpm}</Typography.Text>
              }
              
              
            </S.CardContent>
          </S.InfoContent>
          <S.MachineImage src={asset?.image} alt={'Image'} width={300} height={300} />
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
              categories: asset?.healthHistory?.map(health => (formatDate(health.timestamp)))
            },
            yAxis: {
              title: {
                text: 'Operation System'
              },
              categories: uniqueYAxisCategories
            },
            series: [{
              name: 'Saúde do Sistema Operacional',
              data: asset?.healthHistory?.map((health) => (health.status === uniqueYAxisCategories[0] ? 0 : health.status === uniqueYAxisCategories[1] ? 1 : 2)),
            }],
          }}
        />
        </S.CardContainer>
    </S.Container>
  )
}
