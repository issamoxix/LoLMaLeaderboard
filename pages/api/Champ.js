import nextConnect from "next-connect";
import middleware from "../../util/Champ";

const handler = nextConnect();
handler.use(middleware);
export default handler;
