import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import middleware from '../../util/dbc';

interface CustomRequest extends NextApiRequest {
  db: any; // Adjust the type based on your middleware
  ct: any; // Adjust the type based on your middleware
}

const handler = nextConnect<CustomRequest, NextApiResponse>();

handler.use(middleware);

handler.get(async (req: CustomRequest, res: NextApiResponse) => {
  try {
    let doc = await req.db;
    let data = req.query;
    let ct = await req.ct;

    res.json({
      data: doc,
      ct: ct,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default handler;
