import { ForecastResponse } from '@/lib/types/weather_api';
import { Box, Divider, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type WeatherCardProps = {
  forecast: ForecastResponse;
};

const MetricsCard = ({ forecast }: { forecast: ForecastResponse }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const linkColor = useColorModeValue('gray.600', 'gray.300');
  const bgColor = useColorModeValue('gray.100', 'gray.900');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div initial="hidden" animate={isLoaded ? 'visible' : 'hidden'}>
      <Box
        bg={bgColor}
        borderRadius="lg"
        borderColor="black"
        borderWidth={3}
        boxShadow="md"
        transition="all 0.2s ease-in-out"
        _hover={{ transform: 'scale(1.01)' }}
        p="7"
      >
        <Text fontWeight="bold" fontSize="xl">
          Current Metrics
        </Text>
        <Box mt="4">
          <Text fontWeight="medium" fontSize="md" pb={2}>
            UV Index: {forecast.current.uv}
          </Text>
          <Divider />
          <Text fontWeight="medium" fontSize="md" pt={2} pb={2}>
            Humidity Level: {forecast.current.humidity}
          </Text>
          <Divider />
          <Text fontWeight="medium" fontSize="md" pt={2}>
            Condition: {forecast.current.condition.text}
          </Text>
        </Box>
      </Box>
    </motion.div>
  );
};

export default MetricsCard;
