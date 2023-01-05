import axios from "axios";
import { BaseUrl } from "./api_constants";

interface result {
  data: any;
}

export default {
  animeData: {
    getAnime: () =>
      axios
        .get(BaseUrl + "/top/anime", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((result: result) => {
          return result.data.data;
        }),
  },
};
