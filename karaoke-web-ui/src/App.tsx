import React from 'react';
import './App.css';
import Error from './Error';
import * as api from './api';
import Loading from './Loading';
import { Player } from './Player/Player';
import { Playlist, QueuedSong } from './Playlist/Playlist';
import { v4 as uuidv4 } from 'uuid';

import { User } from './api';
import { SocketContext } from './SocketContext/SocketContext';

const API_ENDPOINT = 'http://localhost:5000/';

const App = () => {
  const socket = React.useContext(SocketContext);
  const [username, setUserName] = React.useState(uuidv4());
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState('');
  const [users, setUsers] = React.useState<User[]>([]);
  const [playlist, setPlaylist] = React.useState<QueuedSong[]>([]);

  socket.on('updatedUsers', (users: User[]) => {
    setUsers(users);
  });

  React.useEffect(() => {
    socket.emit('newUser', username);
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
      <Player url={playlist?.[0]?.url} />
      <Playlist
        playlist={playlist}
        setPlaylist={setPlaylist}
        username={username}
      />
      {/* {error ? <Error /> : ready ? <span>{data}</span> : <Loading />} */}
      <div>
        <h2>Online Users</h2>
        {users.map((user, index) => (
          <div key={`${index}-${user}`}>
            <span>
              {user.name === username ? (
                <div>
                  <b>{username}</b>
                </div>
              ) : (
                user.name
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
