import axios from "axios";

const instance = axios.create({
  headers: {
    common: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTION_ACCESS_TOKEN}`,
    },
  },
});

export default instance;
