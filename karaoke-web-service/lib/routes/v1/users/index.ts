const storedUsers: string[] = [];

export const getUsers = () => {
  console.log('get users', storedUsers);
  return storedUsers;
};

export const addUser = (user: string) => {
  console.log('stored users', storedUsers);
  storedUsers.push(user);
};