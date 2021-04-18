import nextConnect from "next-connect";
import middleware from "../../util/Champ";

const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => {
  let doc = await req.db;

  //   res.json(doc, l);
  //   res.json(doc);
});
export default handler;
