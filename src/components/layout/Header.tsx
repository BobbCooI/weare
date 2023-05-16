import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';

import ThemeToggle from './ThemeToggle';
import Image from 'next/image';
import logo from '@/public/logo.svg';
import Link from 'next/link';

const Header = () => {
  const color = useColorModeValue('gray.600', 'gray.300');

  return (
    <Flex
      borderBottom="1px solid #ccc"
      as="header"
      width="full"
      align="center"
      p={2}
    >
      <Link href="/">
        <HStack ml={3}>
          <Image
            alt="logo"
            src={logo}
            style={{ width: '2.3em', height: '2.3em' }}
          />
          <Text pl={'0.2em'} fontSize="3xl" fontWeight="bold" color={color}>
            Weare
          </Text>
        </HStack>
      </Link>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
