import nextConnect from "next-connect";
import middleware from "../../util/get_sum";

const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => {
  let doc = await req.db;
  let l = await req.ln;

  //   res.json(doc, l);
  res.json({ ...doc[0], Mrank: l });
});
export default handler;
