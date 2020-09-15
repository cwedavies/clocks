import { useEffect, useState } from "react";

const useObservable = (observable, initialState) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    observable().subscribe(setState);
  }, [observable]);

  return state;
};

export default useObservable;
