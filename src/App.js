import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loading from "./components/Loading";
import Error from "./components/Error";
import NoData from "./components/NoData";

function App() {
  const articlesPerPage = [5, 10, 20, 30];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [howMany, setHowMany] = useState(10);

  const [pageNr, setPageNr] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    setPages(
      [pageNr - 2, pageNr - 1, pageNr, pageNr + 1, pageNr + 2].filter(
        (x) => x > 0
      )
    );
    setLoading(true);
    fetch(
      `https://api.spaceflightnewsapi.net/v3/articles?_limit=${howMany}&_start=${
        (pageNr - 1) * howMany
      }`
    )
      .then((response) => response.json())
      .then((actualData) => {
        setData(actualData);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(true);
      });

    return () => {
      abortController.abort();
    };
  }, [howMany, pageNr]);

  const handleChange = (event) => {
    setHowMany(event.target.value);
  };

  const elementC = (event) => {
    if (event == pageNr) {
      return "white";
    }
  };

  const elementBGC = (event) => {
    if (event == pageNr) {
      return "black";
    }
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  if (data.length === 0) {
    return <NoData />;
  }
  return (
    <div className="mainSite">
      <h1>Articles</h1>
      <div className="changeHowMany">
        <div className="label">Articles on page: </div>
        <select onChange={handleChange} value={howMany}>
          {articlesPerPage.map((element) => {
            return (
              <option key={`${element}option`} value={element}>
                {element}
              </option>
            );
          })}
        </select>
      </div>
      <div className="articlesContainer">
        {data.map((element) => {
          return (
            <div className="oneArticle" key={element.id}>
              <div className="nrArticle">
                {(pageNr - 1) * howMany + (data.indexOf(element) + 1)}
              </div>
              <Link className="imgLink" to={`/article/${element.id}`}>
                <img alt="article" src={element.imageUrl} />
              </Link>
              <div className="articleInfo">
                <Link to={`/article/${element.id}`}>
                  <div className="articleTitle">{element.title}</div>
                </Link>
                <div className="articlePublishedAt">
                  <strong>Published at: </strong>
                  {new Date(element.publishedAt).toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pages">
        {pages.map((element) => {
          return (
            <div
              className="pageIndex"
              key={`${element}page`}
              style={{
                color: elementC(element),
                backgroundColor: elementBGC(element),
              }}
              onClick={() => {
                setPageNr(element);
              }}
            >
              {element}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
