import {io} from 'socket.io-client'

export const initSocket = async () => {
  const options = {
    'force new connection': true,
    reconnectionAttempt: 'Infinity',
    timeout: 50,
    transports: ['websocket'],
  };

  return io(process.env.REACT_APP_SERVER_URL, options);
}