import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";
// import { IoArrowBack } from "react-icons/io5";
// import { IoMdArrowRoundBack } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin: 20px;
  position: relative;
`;

const BackBtn = styled.button`
  position: absolute;
  left: 0;
  border: none;
  outline: none;
  font-size: 35px;
  background-color: transparent;
  height: 48px;
  width: 50px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.titleColor};
  flex: 2;
  text-align: center;
`;
const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  span:first-chile {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  color: ${(props) => props.theme.textColor};
  padding: 10px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 20px 0;
`;
const Tab = styled.span<{ isActive: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  padding: 10px 20px;
  text-align: center;
  font-weight: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.textColor};
  a {
    display: block;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
`;

interface IRouteState {
  state: {
    name: string;
  };
}

interface IinfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}
interface IpriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

const Coin = () => {
  const { coinId } = useParams();
  const prceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { state } = useLocation() as IRouteState;
  // const [loading, setLoading] = useState(false);
  // const [info, setInfo] = useState<IinfoData>();
  // const [priceinfo, setPriceInfo] = useState<IpriceData>();
  const { isLoading: infoLoading, data: infoData } = useQuery<IinfoData>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoinInfo(coinId!),
  });
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IpriceData>(
    {
      queryKey: ["tickers", coinId],
      queryFn: () => fetchCoinTickers(String(coinId)),
      // refetchInterval: 10000,
    }
  );

  const loading = infoLoading || tickersLoading;
  let navigate = useNavigate();
  return (
    <>
      <Container>
        <Helmet>
          <title>{state?.name || "Coin detail"}</title>
        </Helmet>
        <Header>
          <BackBtn onClick={() => navigate(-1)}>
            <IoChevronBack />
          </BackBtn>
          <Title>
            {loading ? <Loader>Loading...</Loader> : infoData?.name}
          </Title>
        </Header>

        <Overview>
          <OverviewItem>
            <span>RANK:</span>
            <span>{infoData?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>SYMBOL:</span>
            <span>${infoData?.symbol}</span>
          </OverviewItem>
          <OverviewItem>
            <span>PRICE:</span>
            <span>${tickersData?.quotes?.USD.price.toFixed(3)}</span>
          </OverviewItem>
        </Overview>

        <Description>{infoData?.description}</Description>

        <Overview>
          <OverviewItem>
            <span>Total Suply:</span>
            <span>{tickersData?.total_supply}</span>
          </OverviewItem>

          <OverviewItem>
            <span>Max Suply:</span>
            <span>{tickersData?.max_supply}</span>
          </OverviewItem>
        </Overview>

        <Tabs>
          <Tab isActive={chartMatch !== null}>
            <Link to={`/${coinId}/chart`}>Chart</Link>
          </Tab>
          <Tab isActive={prceMatch !== null}>
            <Link to={`/${coinId}/price`}>Price</Link>
          </Tab>
        </Tabs>

        <Outlet context={{ coinId }} />
      </Container>
    </>
  );
};

export default Coin;
