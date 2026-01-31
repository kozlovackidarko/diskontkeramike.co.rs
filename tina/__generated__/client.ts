import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '178dc3e7dd434b735a97383c5c59ab119f902e9c', queries,  });
export default client;
  