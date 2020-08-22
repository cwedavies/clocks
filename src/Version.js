import React, { useEffect, useState } from "react";

import styles from "./version.module.css";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    error,
    loading: data === null && error === null,
  };
};

const Version = () => {
  const { data } = useFetch(`${process.env.PUBLIC_URL}/version.json`);

  if (!data || !data.commit) {
    return null;
  }

  const { commit } = data;
  const short = commit.slice(0, 7);

  const url = `https://github.com/cwedavies/clocks/tree/${commit}`;

  return (
    <a className={styles.root} href={url}>
      {short}
    </a>
  );
};

export default Version;
