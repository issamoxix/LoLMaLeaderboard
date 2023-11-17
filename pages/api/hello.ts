import nextConnect from 'next-connect';
import middleware from '../../util/dbc';


const handler = nextConnect();

handler.use(middleware);

export default handler;
