const storedUsers: User[] = [];

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
