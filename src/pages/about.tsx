import { Box, Text, Flex } from '@chakra-ui/react';

const About = () => {
  return (
    <Flex pt={'10%'} align="center" justify="center">
      <Box width="40%">
        <Text
          textAlign="center"
          fontSize="md"
          overflowWrap="break-word"
        >
          hello! this is ryan's ap computer science a project. it is very simple
          and definitely not the best, but this was all i could do with the time
          i had... it is 1:48am the night it is due.. may 31, 2023. i strive to improve this
          website and make this a good learning experience.
        </Text>
      </Box>
    </Flex>
  );
};

export default About;
