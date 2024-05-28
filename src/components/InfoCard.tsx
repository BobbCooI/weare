import { Alert, ForecastResponse } from '@/lib/types/weather_api';
import { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const InfoCard = ({ forecast }: { forecast: ForecastResponse }) => {
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
        _hover={{ transform: 'scale(1.01)' }}
        transition="all 0.2s ease-in-out"
        className="hover:shadow-lg"
      >
        <Text fontWeight="bold" fontSize="xl">
          Current Information
        </Text>
        <Box mt="4">
          {forecast.alerts
            ? forecast.alerts.map((alert: Alert, ind: number) => (
                <>
                  <Text fontWeight="medium" fontSize="md" pb={2}>
                    Alert {ind} : {alert.headline} effecting {alert.areas}
                  </Text>
                  <Text fontWeight="medium" fontSize="sm" pb={2}>
                    {alert.effective}
                  </Text>
                  <Divider />
                </>
              ))
            : 'Alerts: NONE'}
        </Box>
      </Box>
    </motion.div>
  );
};

export default InfoCard;
