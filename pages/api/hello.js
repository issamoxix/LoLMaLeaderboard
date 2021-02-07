import nextConnect from "next-connect";
import middleware from "../../util/dbc";

const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => {
  let doc = await req.db;
  let data = req.query;
  res.json(doc);
});
export default handler;
