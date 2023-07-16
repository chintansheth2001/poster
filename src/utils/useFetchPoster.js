import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchPoster(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posters, setPosters] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/data/page${pageNumber}.json`,
      params: {},
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPageTitle(res.data.page.title);
        setPosters((prevPosters) => {
          return [...prevPosters, ...res.data.page["content-items"].content];
        });
        const totalPage = Math.ceil(
          res.data.page["total-content-items"] /
            res.data.page["page-size-requested"]
        );
        setHasMore(totalPage > res.data.page["page-num-requested"]);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
        setError(true);
      });
    return () => cancel();
  }, [pageNumber]);
  return { loading, error, posters, hasMore, pageTitle };
}
