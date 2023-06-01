import {
  Box,
  Flex,
  Link,
  Text,
  Icon,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaSchool } from 'react-icons/fa';
import NextLink from 'next/link';
const Footer = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const linkColor = useColorModeValue('gray.600', 'gray.300');

  const variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
        <Link href="mailto:854582@lcps.org" color={linkColor}>
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
          apcsa 22-23
        </Text>

        {/* Social media */}
        <HStack spacing={4}>
          <Link href="https://www.instagram.com/shieunpark/" isExternal>
            <Icon as={FaInstagram} boxSize={6} color={linkColor} />
          </Link>
          <Link
            href="https://learn.lcps.org/course/6074661797/materials"
            isExternal
          >
            <Icon as={FaSchool} boxSize={6} color={linkColor} />
          </Link>
        </HStack>
      </Flex>
    </MotionBox>
  );
};

export default Footer;
