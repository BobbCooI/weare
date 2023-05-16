import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import SearchBar from '@/components/SearchBar';
import { useEffect, useState } from 'react';
import { Location } from '@/lib/types/weather_api';

const Home = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const [lat, setLat] = useState<number>();
  const [lon, setLon] = useState<number>();
  const [selectedSuggestion, setSelectedSuggestion] = useState<Location>();

  const toast = useToast();

  useEffect(() => {
    if (!navigator.geolocation) {
      toast({
        status: 'info',
        description: 'Geolocation is not supported by your browser',
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
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
          coords={{
            latitude: lat as number,
            longitude: lon as number,
          }}
        />
      </Box>
      {selectedSuggestion && (
        <Box>
          <Heading>Selected Suggestion:</Heading>
          <Text>{selectedSuggestion.name}</Text>
          {/* Render additional information about the selected weather suggestion. CHECKPOINT 1 */}
        </Box>
      )}
      <NextSeo title="Home" />
    </Flex>
  );
};

export default Home;
