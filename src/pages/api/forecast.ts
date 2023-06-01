// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const getForecast = async (req: NextApiRequest, res: NextApiResponse) => {
  const [lat, lon] = (req.query['q'] as string)?.split(',');
  //fetch the weather forecast with axios
  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lon}&days=3&aqi=no&alerts=no`;

    const response = await axios.get(url);
    if (response.status !== 200) {
      return res.status(500).json({ success: false, error: 'Failed to retrieve forecast data' });
    }

    return res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'An error occurred while fetching forecast data' });
  }

};

export default getForecast;
