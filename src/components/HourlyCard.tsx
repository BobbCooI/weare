import { ForecastDay, Hour } from '@/lib/types/weather_api';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
const HourlyCard = ({ forecastday }: { forecastday: ForecastDay }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const lineData = forecastday.hour.map((hour: Hour) => ({
    name: parseInt(hour.time.split(' ')[1].split(':')[0]),
    temp: hour.temp_f,
  }));
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <Box
          bg={bgColor}
          borderRadius="lg"
          borderColor="black"
          borderWidth={3}
          boxShadow="md"
          p="4"
          _hover={{ transform: 'scale(1.01)' }}
          transition="all 0.2s ease-in-out"
          className="hover:shadow-lg"
        >
          <Text fontWeight="bold" fontSize="xl">
            Hourly Forecast
          </Text>
          <Box mt="4">
            <LineChart
              width={600}
              height={300}
              data={lineData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line type="monotone" dataKey="temp" stroke="#8884d8" />

              <XAxis label="Hour" />
              <YAxis label="(°F)"/>
            </LineChart>
          </Box>
        </Box>
      </motion.div>
    </>
  );
};

export default HourlyCard;
