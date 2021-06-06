import axios from "axios";
import _ from "lodash";
import Arena from "are.na";

const ARENA_TOKEN = process.env.NEXT_PUBLIC_ARENA_ACCESS_TOKEN;
const NOTION_TOKEN = process.env.NEXT_PUBLIC_NOTION_ACCESS_TOKEN;
const NOTION_DB = process.env.NEXT_PUBLIC_NOTION_DB_ID;
const API_URL = `https://api.notion.com/v1`;

/*
- Get all DB pages
- Build clean data for each page
  - Get the corresponding Are.na assets
  - Get clean data (tags etc)
*/
export const getNotionPosts = async () => {
  setHeaders(NOTION_TOKEN);

  const arena = new Arena({
    accessToken: ARENA_TOKEN,
  });

  let posts = [];
  await getDatabasePages(NOTION_DB).then(async (response) => {
    const pages = response.data.results;
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const arenaProp = page.properties["Are.na Block ID"];
      const arenaId =
        arenaProp && arenaProp.rich_text && arenaProp.rich_text[0].plain_text;
      if (arenaId) {
        const images = await getImagesFromArena(arena, arenaId);

        // Deconstruct Notion objects
        const tags = page.properties["Tags"].multi_select;
        const clients = page.properties["Client"].multi_select;
        const title = page.properties["Name"].title[0].plain_text;
        posts.push({
          id: page.id,
          tags,
          clients,
          title,
          images,
        });
      }
    }
  });
  return posts;
};

const getImagesFromArena = async (arena, blockId) => {
  const block = await arena.block(blockId).get().catch(console.error);
  if (block && block.image) {
    return block.image;
  } else {
    return null;
  }
};

const setHeaders = (authToken) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  axios.defaults.headers.common["Notion-Version"] = `2021-05-13`;
};

const getDatabasePages = (dbId) =>
  axios.post(`${API_URL}/databases/${dbId}/query`);

const getPageBlocks = (pageId) =>
  axios.get(`${API_URL}/blocks/${pageId}/children`);
