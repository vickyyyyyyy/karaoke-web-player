import React from 'react';
import './App.css';
import Error from './Error';
import * as api from './api';
import Loading from './Loading';
import { io, Socket } from 'socket.io-client';
import { Player } from './Player/Player';
import { Playlist, QueuedSong } from './Playlist/Playlist';
import { v4 as uuidv4 } from 'uuid';
import { User } from './api';

const API_ENDPOINT = 'http://localhost:5000/';

const App = () => {
  const [socket, setSocket] = React.useState<Socket | undefined>();
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState('');
  const [users, setUsers] = React.useState<User[]>([]);
  const [playlist, setPlaylist] = React.useState<QueuedSong[]>([]);

  const getUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (e) {
      setError(true);
    }
  };

  const addUser = async (socketId: string) => {
    try {
      // generate a random username
      const newUsername = uuidv4();
      await api.addUser({ name: newUsername, id: socketId });
      await getUsers();
    } catch (e) {
      setError(true);
    }
  };

  React.useEffect(() => {
    // connect once at the start
    const newSocket = io(API_ENDPOINT, {
      transports: ['websocket', 'polling'],
    });
    setSocket(newSocket);

    const waitForData = async () => {
      await getUsers();

      await addUser(newSocket.io.engine.id);

      setReady(true);
    };

    waitForData();
  }, []);

  return (
    <div className='container'>
      <h1>Karaoke</h1>
      <div>
        <h2>Online Users</h2>
        {users.map((user, index) => (
          <div key={`${index}-${user}`}>
            <span>{user.name}</span>
          </div>
        ))}
      </div>
      <Player url={playlist?.[0]?.url} />
      <Playlist playlist={playlist} setPlaylist={setPlaylist} />
      {error ? <Error /> : ready ? <span>{data}</span> : <Loading />}
    </div>
  );
};

export default App;
