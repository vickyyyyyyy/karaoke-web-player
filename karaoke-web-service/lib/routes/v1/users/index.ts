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
  console.log('stored users', storedUsers);
  storedUsers.push(user);
};

export const updateUser = (user: User) => {
  console.log('update user name', storedUsers);
  const index = storedUsers.findIndex((user) => user.id === user.id);
  if (index >= 0) {
    storedUsers[index] = user;
  }
};

export const removeUser = (id: string) => {
  console.log('remove user', id);
  storedUsers = storedUsers.filter((user) => user.id !== id);
};
