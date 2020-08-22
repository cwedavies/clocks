import React from "react";
import useFetch from "../../hooks/use-fetch";
import styles from "./version.module.css";

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
