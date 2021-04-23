import nextConnect from "next-connect";
import middleware from "../../util/Champ";

const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => {
  let doc = await req.db;
  if (parseInt(req.query.code) == 0) {
    let ct = await req.ct;
    let db = await req.db;
    //   res.json(doc, l);
    //   res.json(doc);
    res.json({ data: db, ct });
  }
});
export default handler;
