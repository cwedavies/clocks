const { useState, useEffect } = require("react");

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e);
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

export default useFetch;
