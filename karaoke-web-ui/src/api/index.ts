import { client } from './client';

export const getSomeData = async () => {
  try {
    const data = await client().get('/v1/data');
    return data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getUsers = async () => {
  try {
    const data = await client().get('/v1/users');
    return data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const addUser = async (username: string) => {
  try {
    await client().post('/v1/users', username);
  } catch (e) {
    throw new Error(e);
  }
};
