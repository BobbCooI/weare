import { useState, useEffect } from 'react';
import { darken } from '@chakra-ui/theme-tools';

import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Skeleton,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { getDistance, getSearchSuggestion } from '@/lib/utils';
import { Location } from '@/lib/types/weather_api';
import { motion } from 'framer-motion';

const SearchBar = ({
  onSuggestionSelect,
  coords,
}: {
  onSuggestionSelect: (suggestion: Location) => void;
  coords?: {
    latitude: number;
    longitude: number;
  };
}) => {
  // state settings
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // styling
  const linkColor = useColorModeValue('gray.600', 'gray.300');
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const toast = useToast();
  
 const handleSuggestionSelect = (suggestion: Location) => {
    onSuggestionSelect(suggestion);
    setShowSuggestions(false); // Hide suggestions after selecting
  };

  const handleFocus = () => {
    setShowSuggestions(true); // Show suggestions when focused
  };

  const handleBlur = () => {
    // delay hiding suggestions to allow click event to trigger
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100);
  };

  // search effects. debouncing makes it so auto seacrhes after 500 ms of no typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // fetches suggestions when a search term is entered and debounced
  useEffect(() => {
    const fetchSearchSuggestions = async () => {
      setLoading(true);
      setSuggestions([]);

      const response = await getSearchSuggestion(debouncedSearchTerm);
      if (response.success) {
        setSuggestions(response.data);
        setLoading(false);
      } else {
        // shouldn't happen unless a bug in the api
        toast({
          description: response.error + ' - Please report to developer',
          status: 'error',
          duration: 10000,
        });
      }
    };

    if (debouncedSearchTerm) {
      fetchSearchSuggestions();
    }
  }, [debouncedSearchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div style={{ position: 'relative' }}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input
          type="text"
          placeholder="Search for a city"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          color={linkColor}
        />
      </InputGroup>
      <List
        position="absolute"
        top="100%"
        left={0}
        width="100%"
        maxHeight={200}
        overflowY="scroll"
        borderRadius="5px"
        overflow="auto"
        mt={1}
        display={showSuggestions ? 'block' : 'none'}
      >
        {loading ? (
          <>
            <Skeleton height="3em" />
          </>
        ) : suggestions.length > 0 ? (
          <>
            {suggestions.map((suggestion: Location) => {
                   const distance = coords ? Math.round(getDistance(coords.latitude, coords.longitude, suggestion.lat, suggestion.lon) * 10) / 10 : 0;

             return (
             <motion.div
             key={suggestion.id}
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}>
             <ListItem
                bg="white"
                bgColor={bgColor}
                border="1px solid gray"
                borderRadius="lg"
                boxShadow="md"
                overflow="hidden"
                transition="all 0.2s ease-out"
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'lg',
                  cursor: 'pointer',
                  bg: darken(bgColor, 0.1),
                }}
                _active={{ transform: 'translateY(0)' }}
                mt="0.1em"
                mb="0.2em"
                px={3}
                py={2}
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                <Box color={linkColor}>
                  <Text fontSize="l" fontWeight="semibold">
                    {suggestion.name}
                  </Text>
                  <Text fontSize="sm" mb={2}>
                    {suggestion.region}{' '}
                    {coords
                      ? `  |   ${distance} mi. away`
                      : ''}
                  </Text>
                </Box>
              </ListItem>
              </motion.div>
            )})}
          </>
        ) : (
          <ListItem
            bg={bgColor}
            textAlign="center"
            p={2}
            border="1px solid #ccc"
            borderRadius="lg"
            boxShadow="md"
          >
            <Box>
              <Text fontSize="l" fontWeight="semibold" color={linkColor}>
                No suggestions found
              </Text>
            </Box>
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default SearchBar;
