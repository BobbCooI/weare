import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Link as ChakraLink,
  useColorMode,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { chakra } from '@chakra-ui/react';

const Page404 = () => {
  const { colorMode } = useColorMode();
  const MotionBox = motion(chakra.div);

  return (
    <Flex minHeight="70vh" direction="column" justifyContent="center">
      <NextSeo title="404 Not Found" />
      <MotionBox
        animate={{ y: 20 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
        width={{ base: '100%', sm: '70%', md: '60%' }}
        margin="0 auto"
      >
        <Image src="/404error.svg" alt="Error 404 not found Illustration" />
      </MotionBox>
      <Text textAlign="center" fontSize="xs" color="gray">
        <ChakraLink
          href="https://stories.freepik.com/web"
          isExternal
          rel="noopener noreferrer"
        ></ChakraLink>
      </Text>

      <Box marginY={4}>
        <Heading textAlign="center" size="lg">
          Page not Found.
        </Heading>

        <Box textAlign="center" marginTop={4}>
          <Text fontSize="sm" color="gray">
            It&apos;s Okay!
          </Text>
          <Button
            as={Link}
            href="/"
            backgroundColor={colorMode === 'light' ? 'gray.300' : 'teal.500'}
            size="sm"
          >
            Let&apos;s Head Back
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Page404;
