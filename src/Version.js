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

const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];

const Version = () => {
  const { data } = useFetch(`${process.env.PUBLIC_URL}/version.json`);

  if (!data) {
    return null;
  }

  const { commit } = data;
  const [start, rest] = splitAt(7)(commit);

  const url = `https://github.com/cwedavies/clocks/tree/${hash}`;

  return (
    <a className={styles.root} href={url}>
      <span className={styles.start}>{start}</span>
      <span className={styles.rest}>{rest}</span>
    </a>
  );
};

export default Version;
