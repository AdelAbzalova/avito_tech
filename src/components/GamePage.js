import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GameData from "./GameData";
import Loading from "./Loading";
import Error from "./Error";

export default function GamePage(props) {
  const [game, setGame] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const axios = require("axios");
  const { setupCache } = require("axios-cache-adapter");
  const cache = setupCache({
    maxAge: 5 * 60 * 1000,
  });
  const api = axios.create({
    adapter: cache.adapter,
  });

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      headers: {
        "X-RapidAPI-Key": "2db4ae875cmshc804e07e556fbf9p1241acjsn750ba9cc2e97",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
      cache: {
        maxAge: 5 * 60 * 1000,
      },
    };
    const fetchData = async () => {
      try {
        const response = await api(options);
        setGame(response.data);
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
  }, [id, retryCount]);

  return (
    <>
      {isLoading ? <Loading /> : isError ? <Error /> : <GameData game={game} />}
    </>
  );
}
