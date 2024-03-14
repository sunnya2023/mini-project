import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.textColor};
`;
const Loader = styled.span`
  display: block;
  text-align: center;
`;

interface IRouteState {
  state: {
    name: string;
  };
}
const Coin = () => {
  const [loading, setLoading] = useState(false);
  const { coinId } = useParams();
  const { state } = useLocation() as IRouteState;
  const [info, setInfo] = useState({});
  const [priceinfo, setPriceInfo] = useState({});

  //   https://api.coinpaprika.com/v1/coins/btc-bitcoin
  // https://api.coinpaprika.com/v1/tickers/btc-bitcoin
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      console.log(infoData);
      console.log(priceData);
    })();
  }, []);

  return (
    <>
      <Container>
        <Header>
          <Title>{state?.name || "Loading..."}</Title>
        </Header>
        {loading ? <Loader>Loading...</Loader> : <span>{info.name}</span>}
      </Container>
    </>
  );
};

export default Coin;
