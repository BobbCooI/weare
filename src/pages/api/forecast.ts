// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const getForecast = (req: NextApiRequest, res: NextApiResponse) => {
  const { city } = req.query;
  //fetch the weather forecast with axios


  res.json({ name: 'John Doe' });
};

export default getForecast;
