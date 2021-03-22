let storedUsers: User[] = [];

export const getUsers = () => {
  console.log('get users', storedUsers);
  return storedUsers;
};

export interface User {
  name: string;
  id: string;
}

export const addUser = (user: User) => {
  storedUsers.push(user);
  console.log('stored users', storedUsers);
};

export const updateUser = (user: User) => {
  const index = storedUsers.findIndex((user) => user.id === user.id);
  if (index >= 0) {
    storedUsers[index] = user;
  }
  console.log('update user name', storedUsers);
};

export const removeUser = (id: string) => {
  console.log('remove user', id);
  storedUsers = storedUsers.filter((user) => user.id !== id);
};
