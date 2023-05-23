import { AuthContext, User } from "@/contexts/AuthContext";
import { Typography } from "antd";
import { useContext, useEffect, useState } from "react"
import { useTheme } from "styled-components";
import { api } from "../../api"
import * as S from "./styles"

interface IUnit {
  companyId: number;
  id: number;
  name: string;
}

interface ICompany {
  id: number;
  name: string;
}

export default function FullAssetAnalysis() {
  const theme = useTheme();
  const authenticatedUser = useContext(AuthContext);
  const [unit, setUnit] = useState<IUnit>({} as IUnit);
  const [company, setCompany] = useState<ICompany>({} as ICompany);

  useEffect(() => {
    const getUnits = async () => {
      const { data } = await api.get('/units')
      const userUnit = data.find((unit: IUnit) => unit.id === authenticatedUser?.user?.unitId);
      setUnit(userUnit);
    }

    getUnits();
  }, []);

  useEffect(() => {
    const getCompany = async () => {
      const { data } = await api.get('/companies')
      const userCompany = data.find((company: ICompany) => company.id === authenticatedUser?.user?.companyId);
      setCompany(userCompany);
    }

    getCompany();
  }, []);

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
      <S.ContentContainer>
        <Typography.Title
          level={2}
          style={TypographTitle}
        >{authenticatedUser?.user?.name}</Typography.Title>
        <S.InfoContainer>
          <S.InfoContent>
            <S.CardContent>
              <Typography.Text style={TypographText}>Id da empresa: {authenticatedUser?.user?.companyId}</Typography.Text>
              <Typography.Text style={TypographText}>Email: {authenticatedUser?.user?.email}</Typography.Text>
              <Typography.Text style={TypographText}>Id do Usuário: {authenticatedUser?.user?.id}</Typography.Text>
              <Typography.Text style={TypographText}>Usuário pertence a unidade de id: {authenticatedUser?.user?.unitId}</Typography.Text>
              <Typography.Text style={TypographText}>Nome da unidade: {unit.name}</Typography.Text>
              <Typography.Text style={TypographText}>Nome da empresa: {company.name}</Typography.Text>
            </S.CardContent>
          </S.InfoContent>
        </S.InfoContainer>
        </S.ContentContainer>
    </S.Container>
  )
}
