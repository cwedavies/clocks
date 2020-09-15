import { useContext } from "react";
import Context from "./WebsocketContext";

const useWebsocket = () => useContext(Context);

export default useWebsocket;
