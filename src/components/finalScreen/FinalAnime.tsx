import React from "react";
import { useEffect, useState } from "react";
import api from "../../anime_api/api";
import AnimeCard from "../card/AnimeCard";
import AnimeChart from "../chart/AnimeChart";
import "./FinalAnime.css";

interface yearTitle {
  year: number;
  count: number;
  title: Array<String>;
}

interface animeData {
  aired: any;
  images: any;
  rank: number;
  rating: string;
  title: string;
}

const FinalAnime = () => {
  const [chartData, setChartData] = useState([] as Array<any>);
  const [animeData, setAnimeData] = useState([] as Array<any>);

  useEffect(() => {
    api.animeData.getAnime().then((data: Array<any>) => {
      
      var yearArr = [] as Array<number>;
      var cardList = [] as Array<animeData>;

      data.map((item: any) => {
        if (item?.year) yearArr.push(item.year);
        if (item?.rank <= 20) cardList.push(item);
      });
      setAnimeData(cardList);

      var minYear = Math.min(...yearArr);
      var maxYear = Math.max(...yearArr);

      yearArr = [];
      for (var i = minYear; i <= maxYear; i++) {
        yearArr.push(i);
      }

      var count = 0;
      var titleArr = [] as Array<String>;
      var dataArr = [] as Array<yearTitle>;

      yearArr.map((yearItem) => {
        data.map((data: any) => {
          if (yearItem && data && data.rank <= 20) {
            if (yearItem === data.year) {
              count = count + 1;
              titleArr.push(data.title);
            }
          }
        });
        if (count > 0)
          dataArr.push({
            year: yearItem,
            count: count,
            title: titleArr,
          });
        count = 0;
        titleArr = [];
      });
      setChartData(dataArr);
    });
  }, []);

  return (
    <div className="anime-layout">
      <AnimeCard animeData={animeData} />
      <AnimeChart chartData={chartData} />
    </div>
  );
};

export default FinalAnime;
