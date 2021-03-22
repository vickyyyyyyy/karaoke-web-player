import { client } from "./client";

export const getSomeData = async () => {
  try {
    const data = await client().get("/v1/data");
    return data.data;
  }
  catch (e) {
    throw new Error(e);
  }
};
