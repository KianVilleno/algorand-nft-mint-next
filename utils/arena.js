const Arena = require("are.na");

const TOKEN = process.env.NEXT_PUBLIC_ARENA_ACCESS_TOKEN;

export const getArenaPosts = async () => {
  const arena = new Arena({
    accessToken: TOKEN,
  });

  arena
    .channel("scrolling-by")
    .get()
    .then((chan) => {
      chan.contents.map((item) => {
        console.log(item);
      });
    })
    .catch((err) => console.log(err));

  console.log("GETTING...");

  return {};
};
