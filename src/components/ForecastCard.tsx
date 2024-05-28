import { TiWeatherCloudy } from 'react-icons/ti';
import { ForecastDay, ForecastResponse } from '@/lib/types/weather_api';
import { useEffect, useState } from 'react';
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ForecastCard = ({ forecast , onDaySelect }: { forecast: ForecastResponse ,  onDaySelect: (day: ForecastDay) => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
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
        className="hover:shadow-lg"
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
          mt="8"
        >
          <Box>
            <Text fontWeight="bold" fontSize="2xl">
              {forecast.location.name}
            </Text>
            <Text fontWeight="medium" fontSize="md" color="gray.500">
              {new Date().toLocaleDateString()}
            </Text>
            <Box mt="4" display="flex" alignItems="center">
              <Icon as={TiWeatherCloudy} />
              <Text fontWeight="medium" fontSize="2xl" ml="2">
                {forecast.current.temp_f}° F
              </Text>
            </Box>
          </Box>
          <Box ml={{ base: '0', md: '8' }} mt={{ base: '8', md: '0' }}>
            <Flex flexDirection="column">
              {forecast.forecast.forecastday
                .slice(0, 5)
                .map((item: ForecastDay) => (
                  <Box key={item.date} m="2"
                    onClick={() => onDaySelect(item)}
                    cursor="pointer"
                  >
                    <Text fontWeight="medium" fontSize="md">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                      })}
                    </Text>
                    <Flex alignItems="center">
                      <Image
                        src={`https:${item.day.condition.icon}`}
                        alt="Weather Icon"
                        width="25"
                        height="25"
                      />
                      <Text fontWeight="medium" fontSize="md" ml="2">
                        {item.day.maxtemp_f}/{item.day.mintemp_f} ° F
                      </Text>
                    </Flex>
                  </Box>
                ))}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default ForecastCard;
