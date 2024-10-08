import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Link as ChakraLink,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { chakra } from '@chakra-ui/react';


const Page500 = () => {
  const colorMode = useColorModeValue('gray.300', 'teal.500');

const MotionBox = motion(chakra.div);
  return (
    <Flex minHeight="70vh" direction="column" justifyContent="center">
      <NextSeo title="500 Server Side Error Occured" />
      <MotionBox
        animate={{ y: 20 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
        width={{ base: '100%', sm: '70%', md: '60%' }}
        margin="0 auto"
      >
        <Image src="/underConstruction.svg" alt="Error 500 Illustration" />
      </MotionBox>
      <Text textAlign="center" fontSize="xs" color="gray">
        <ChakraLink
          href="https://stories.freepik.com/web"
          isExternal
          rel="noopener noreferrer"
        >
          Illustration by Freepik Stories
        </ChakraLink>
      </Text>

      <Box marginY={4}>
        <Heading textAlign="center" size="lg">
          Oops! Something went wrong at our end 🙇‍♂️.
        </Heading>

        <Box textAlign="center" mt={4}>
          <Button as={Link} href="/" bgColor={colorMode} size="sm">
            Let&apos;s Head Back
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Page500;
