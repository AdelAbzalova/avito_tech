import GameCard from "./GameCard";
import { useState, useEffect } from "react";
import PlatformFilter from "./PlatformFilter";
import { Row, Col, Button } from "antd";
import GenreFilter from "./GenreFilter";
import Loading from "./Loading";
import Error from "./Error";
import Sort from "./Sort";

export default function MainPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [platform, setPlatform] = useState();
  const [genre, setGenre] = useState();
  const [sort, setSort] = useState();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const isCategory = genre ? `&category=${genre}` : "";
    const isPlatform = platform ? `${platform}` : "all";
    const isSort = sort ? `&sort-by=${sort}` : "";
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${isPlatform}${isCategory}${isSort}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "2db4ae875cmshc804e07e556fbf9p1241acjsn750ba9cc2e97",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        const result = await response.json();
        if (result.status !== 0) {
          setData(result);
        } else {
          setData();
        }
        setIsLoading(false);
      } catch (error) {
        if (retryCount < 3) {
          setRetryCount((prevRetryCount) => prevRetryCount + 1);
        } else {
          setIsError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [platform, sort, genre, retryCount]);

  const gameCard =
    data &&
    data.map((game) => (
      <Col xl={5} md={7} sm={10} xs={22} key={game.id}>
        <GameCard game={game} />
      </Col>
    ));

  function clearFilters() {
    setPlatform();
    setGenre();
    setSort();
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        <div>
          <Row gutter={[0, 12]} justify="center" className="mtb-20">
            <Col xs={20} md={10} lg={6}>
              Платформа:
              <PlatformFilter setPlatform={setPlatform} platform={platform} />
            </Col>
            <Col xs={20} md={10} lg={6}>
              Жанр: <GenreFilter setGenre={setGenre} genre={genre} />
            </Col>
            <Col xs={20} md={10} lg={6}>
              Сортировать по: <Sort setSort={setSort} sort={sort} />
            </Col>
            <Col xs={20} md={10} lg={2}>
              <Button danger onClick={clearFilters}>
                Очистить
              </Button>
            </Col>
          </Row>

          <Row gutter={[16, 16]} justify="center">
            {gameCard}
          </Row>
        </div>
      )}
    </>
  );
}
