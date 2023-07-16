import React, { useState } from "react";
import useFetchPoster from "../utils/useFetchPoster";
import Card from "./Card";
import Header from "./Header";

const Listing = () => {
  const [pageNumber, setPageNumber] = React.useState(1);
  const { loading, error, posters, hasMore, pageTitle } =
    useFetchPoster(pageNumber);
  const [query, setQuery] = React.useState("");
  const observer = React.useRef();
  const [filterPoster, setFilterPoster] = useState(posters);

  const lastCardElementRef = React.useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((items) => {
        if (items[0].isIntersecting && hasMore) {
          setPageNumber((prePageNumber) => prePageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  React.useEffect(() => {
    setFilterPoster(
      posters.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, posters]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleBlur = () => {
    setQuery("");
  };

  return (
    <>
      <Header
        title={pageTitle}
        handleSearch={handleSearch}
        handleBlur={handleBlur}
        query={query}
      />
      {query}
      <div className="listing">
        {filterPoster.map((i, ind) => {
          if (posters.length === ind + 1) {
            return (
              <div ref={lastCardElementRef} key={ind}>
                <Card item={i} />
              </div>
            );
          } else {
            return (
              <div key={ind}>
                <Card item={i} />
              </div>
            );
          }
        })}
      </div>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </>
  );
};

export default Listing;
