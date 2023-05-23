import { AuthContext, User } from "@/contexts/AuthContext";
import { Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react"
import { useTheme } from "styled-components";
import { api } from "../../api"
import * as S from "./styles"
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { userId } = router.query;
  const authenticatedUser = useContext(AuthContext);
  const [unit, setUnit] = useState<IUnit>({} as IUnit);
  const [company, setCompany] = useState<ICompany>({} as ICompany);
  const [allUsers, setAllUsers] = useState<User[]>([] as User[]);

  useEffect(() => {
    const getUnits = async () => {
      const { data } = await api.get('/units')
      const userUnit = data.find((unit: IUnit) => unit.id === authenticatedUser?.user?.unitId);
      setUnit(userUnit);
    }
    const getCompany = async () => {
      const { data } = await api.get('/companies')
      const userCompany = data.find((company: ICompany) => company.id === authenticatedUser?.user?.companyId);
      setCompany(userCompany);
    }

    const getUsers = async () => {
      const { data } = await api.get('/users')
      setAllUsers(data);
    }

    getUnits();
    getCompany();
    getUsers();
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
              <Typography.Text style={TypographText}>Id do usuário: {authenticatedUser?.user?.id}</Typography.Text>
              <Typography.Text style={TypographText}>Usuário pertence a unidade de id: {authenticatedUser?.user?.unitId}</Typography.Text>
              <Typography.Text style={TypographText}>Nome da unidade: {unit.name}</Typography.Text>
              <Typography.Text style={TypographText}>Nome da empresa: {company.name}</Typography.Text>
              <Typography.Text style={TypographText}>Seus colegas de empresa:</Typography.Text>
              <Typography.Text style={TypographText}>{allUsers.map(user => {
                if(user.name !== authenticatedUser?.user?.name && user.companyId === authenticatedUser?.user?.companyId){
                  return(
                    <div key={user.id}>
                      <UserOutlined />
                      <Typography.Text style={TypographText}>{user.name}<br /></Typography.Text>
                    </div>
                  )
                }
              })}</Typography.Text>

            </S.CardContent>
          </S.InfoContent>
        </S.InfoContainer>
        </S.ContentContainer>
    </S.Container>
  )
}
