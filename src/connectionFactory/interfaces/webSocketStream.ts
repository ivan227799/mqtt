import { Duplex } from "stream";
import { WebSocketOptions } from "./webSocketOptions";
import { URL } from 'url'

export interface WebSocketStream extends Duplex {
  setReadable?: any;
  setWritable?: any;
  socket?: WebSocket;
  opts?: WebSocketOptions
  websocketSubProtocol?: any
  url?: URL;
}