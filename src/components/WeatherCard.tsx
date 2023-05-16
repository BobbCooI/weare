import { Box, Flex, Icon, Switch, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { WeatherIcon } from './WeatherIcon';
import { GetStaticProps } from 'next';
import { getForecast, getWeather } from '@/lib/utils';
import {TiWeatherCloudy} from 'react-icons/ti';
type WeatherCardProps = {
  city: string;
  temperatureUnit: 'C' | 'F';
  setTemperatureUnit: React.Dispatch<React.SetStateAction<'C' | 'F'>>;
};

export const WeatherCard = ({
  city,
  temperatureUnit,
  setTemperatureUnit,
}: WeatherCardProps) => {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  useEffect(() => {
    const fetchWeatherData = async () => {
      const weatherData = await getWeather();
      const forecastData = await getForecast();
      setWeather(weatherData);
      setForecast(forecastData);
    };

    fetchWeatherData();
  }, [city]);

  const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemperatureUnit(event.target.checked ? 'F' : 'C');
  };

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      align="center"
      justify="center"
      mt="8"
    >
      <Box>
        <Text fontWeight="bold" fontSize="2xl">
          {weather?.name}
        </Text>
        <Text fontWeight="medium" fontSize="md" color="gray.500">
          {new Date().toLocaleDateString()}
        </Text>
        <Box mt="4" display="flex" alignItems="center">
          <Icon as={TiWeatherCloudy} />
          <Text fontWeight="medium" fontSize="2xl" ml="2">
            {Math.round(
              temperatureUnit === 'C'
                ? weather?.main.temp
                : (weather?.main.temp * 9) / 5 + 32
            )}
            °{temperatureUnit}
          </Text>
        </Box>
        <Box mt="4">
          <Switch
            colorScheme="green"
            isChecked={temperatureUnit === 'F'}
            onChange={handleUnitChange}
          >
            Fahrenheit
          </Switch>
        </Box>
      </Box>
      <Box ml={{ base: '0', md: '8' }} mt={{ base: '8', md: '0' }}>
        <Flex>
          {forecast?.list.slice(0, 5).map((item: any) => (
            <Box key={item.dt} m="2">
              <Text fontWeight="medium" fontSize="md">
                {new Date(item.dt_txt).toLocaleDateString('en-US', {
                  weekday: 'short',
                })}
              </Text>
              <Flex alignItems="center">
                <WeatherIcon icon={item.weather[0].icon} size={8} />
                <Text fontWeight="medium" fontSize="md" ml="2">
                  {Math.round(
                    temperatureUnit === 'C'
                      ? item.main.temp
                      : (item.main.temp * 9) / 5 + 32
                  )}
                  °{temperatureUnit}
                </Text>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const forecastRes = await getWeather()
  const weatherRes = await getForecast();

  // Pass post data to the page via props
  return {
    props: {
      forecast: await forecastRes,
      weather: await weatherRes
    },
  };
};
