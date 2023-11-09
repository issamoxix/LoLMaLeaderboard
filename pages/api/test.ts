// pages/api/hello.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  let secret = process.env.MGURL || "empty"
  res.status(200).json({ message: `Hello from the API! ${secret}` });
};
