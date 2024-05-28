import {
  Box,
  Flex,
  Link,
  Text,
  Icon,
  HStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';
import NextLink from 'next/link';
const Footer = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const linkColor = useColorModeValue('gray.600', 'gray.300');
  const toast = useToast();
  const variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const onClickContact = () => {
    navigator.clipboard.writeText('rynguwork@gmail.com');
    toast({
      title: 'my email is copied to your clipboard!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const MotionBox = motion(Box);

  return (
    <MotionBox
      as="footer"
      bg={bgColor}
      py={5}
      borderTopWidth={1}
      borderTopColor="gray.200"
      variants={variants}
      initial="hidden"
      animate="show"
      bottom={0}
    >
      {/* Main content */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ base: 'center', md: 'flex-start' }}
        maxW="6xl"
        mx="auto"
        px={4}
        textAlign={{ base: 'center', md: 'left' }}
        wrap="wrap"
      >
        {/* Navigation */}
        <NextLink href="/about" color={linkColor}>
          About
        </NextLink>
        <Link
          onClick={onClickContact}
          color={linkColor}
        >
          Contact
        </Link>

        {/* Copyright */}
        <Text
          mb={{ base: 6, md: 0 }}
          fontSize="sm"
          color={linkColor}
          textAlign={{ base: 'center', md: 'left' }}
        >
          &copy; {new Date().getFullYear()} Weare. all rights reserved. ryan
          apcsa 22-24
        </Text>

        {/* Social media */}
        <HStack spacing={4}>
          <Link href="https://www.instagram.com/" isExternal>
            <Icon as={FaInstagram} boxSize={6} color={linkColor} />
          </Link>
        </HStack>
      </Flex>
    </MotionBox>
  );
};

export default Footer;
