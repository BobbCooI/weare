// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const getSearchSuggestion = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { city } = req.query;
  //request weather api search autocomplete with axios
  //return response
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}&q=${city}`
    );
    if (response.status !== 200) {
     return res.json({ success: false, error: 'no' });
    };
    res.json({ success: true, data: response.data });
  } catch (e) {
    console.error(e);
    res.status(404).end()
  }
};

export default getSearchSuggestion;
