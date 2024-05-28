import {
  Box,
  Flex,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import SearchBar from '@/components/SearchBar';
import { useEffect, useState } from 'react';
import { ForecastDay, Location } from '@/lib/types/weather_api';
import { getForecast } from '@/lib/utils';
import ForecastCard from '@/components/ForecastCard';
import MetricsCard from '@/components/MetricsCard';
import InfoCard from '@/components/InfoCard';
import HourlyCard from '@/components/HourlyCard';

const Home = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const [latUser, setLatUser] = useState<number>();
  const [longUser, setLonUser] = useState<number>();
  const [selectedSuggestion, setSelectedSuggestion] = useState<Location>();
  const [fetchedWeather, setFetchedWeather] = useState();
  const [selectedDayForHourly, setSelectedDayForHourly] =
    useState<ForecastDay>();

  const toast = useToast();

  // get user's relative location
  useEffect(() => {
    if (!navigator.geolocation) {
      toast({
        status: 'info',
        description: 'Geolocation is not supported by your browser',
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatUser(position.coords.latitude);
          setLonUser(position.coords.longitude);
        },
        () => {
          toast({
            status: 'error',
            description: 'Unable to retrieve your location',
          });
        }
      );
    }
  }, [toast]);

  useEffect(() => {
    const fetchAndSetForecast = async () => {
      const response = await getForecast(
        selectedSuggestion!.lat,
        selectedSuggestion!.lon
      );
      if (response.success) {
        setFetchedWeather(response.data);
        toast({
          description: `fetched weather for ${selectedSuggestion!.name}`,
          status: 'success',
          duration: 2000,
        });
      } else {
        // shouldn't happen unless a bug in the api
        toast({
          description: response.error + ' - Please report to developer',
          status: 'error',
          duration: 10000,
        });
      }
    };

    if (selectedSuggestion) {
      fetchAndSetForecast();
    }
  }, [selectedSuggestion, toast]);
  const handleSuggestionSelect = (suggestion: Location) => {
    setSelectedSuggestion(suggestion);
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      minHeight="82vh"
      w="full"
      bgColor={bgColor}
    >
      <Box mt={3} data-name="weather_stuff">
        <SearchBar
          onSuggestionSelect={handleSuggestionSelect}
          coords={
            latUser && longUser
              ? { latitude: latUser as number, longitude: longUser as number }
              : undefined
          }
        />
      </Box>
      {selectedSuggestion && fetchedWeather && (
        <>
          <Flex
            justifyContent="space-around"
            flex-wrap="wrap"
            bgColor={bgColor}
            borderWidth="4px"
            mt={2}
          >
            <Box flex="1" mx={2}>
              <MetricsCard forecast={fetchedWeather} />
            </Box>
            <Box flex="1" mx={2}>
              <InfoCard forecast={fetchedWeather} />
            </Box>
            <Box flex="1" mx={2}>
              <ForecastCard
                forecast={fetchedWeather}
                onDaySelect={setSelectedDayForHourly}
              />
            </Box>
          </Flex>
          <Box  mt={2}>
            {selectedDayForHourly && (
              <HourlyCard forecastday={selectedDayForHourly} />
            )}
          </Box>
        </>
      )}
      <NextSeo title="Home" />
    </Flex>
  );
};

export default Home;
