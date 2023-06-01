import { TiWeatherCloudy } from 'react-icons/ti';
import { ForecastDay, ForecastResponse } from '@/lib/types/weather_api';
import { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const InfoCard = ({ forecast }: { forecast: ForecastResponse }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const linkColor = useColorModeValue('gray.600', 'gray.300');
  const bgColor = useColorModeValue('gray.100', 'gray.900');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
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
        transition="all 0.2s ease-in-out"
        _hover={{ transform: 'scale(1.01)' }}
        className="hover:shadow-lg"
      >
        <Text fontWeight="bold" fontSize="xl">
          Current Information
        </Text>
        <Box mt="4">
          <Text fontWeight="medium" fontSize="md" pb={2}>
            UV Index: {forecast.current.uv}
          </Text>
          <Divider />
          <Text fontWeight="medium" fontSize="md" pt={2} pb={2}>
            Humidity Level {forecast.current.humidity}
          </Text>
          <Divider />
          <Text fontWeight="medium" fontSize="md" pt={2}>
            Condition {forecast.current.condition.text}
          </Text>{' '}
        </Box>
      </Box>
    </motion.div>
  );
};

export default InfoCard;
