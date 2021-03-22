import React from 'react';
import './App.css';
import Error from './Error';
import * as api from './api';
import Loading from './Loading';
import { Player } from './Player/Player';
import { Playlist, QueuedSong } from './Playlist/Playlist';

import { User } from './api';
import { SocketContext } from './SocketContext/SocketContext';

const API_ENDPOINT = 'http://localhost:5000/';

const App = () => {
  const socket = React.useContext(SocketContext);
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState('');
  const [users, setUsers] = React.useState<User[]>([]);
  const [playlist, setPlaylist] = React.useState<QueuedSong[]>([]);

  socket.on('updatedUsers', (users: User[]) => {
    setUsers(users);
  });

  React.useEffect(() => {
    socket.emit('newUser');
    // const waitForData = async () => {
    //   await getUsers();

    //   await addUser(socket.io.engine.id);

    //   setReady(true);
    // };

    // waitForData();
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
