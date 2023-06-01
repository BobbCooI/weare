import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const getSearchSuggestion = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { city } = req.query;
    const url = `https://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}&q=${city}`;

    const response = await axios.get(url);
    if (response.status !== 200) {
      return res.status(500).json({ success: false, error: 'Failed to retrieve search suggestions' });
    }

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'An error occurred while fetching search suggestions' });
  }
};

export default getSearchSuggestion;
