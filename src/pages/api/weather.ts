// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next';

const getWeather = (req: NextApiRequest, res: NextApiResponse) => {
  const { city } = req.query;


  res.json({ name: 'John Doe' });
};

export default getWeather;
