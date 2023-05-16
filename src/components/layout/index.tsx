import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const linkColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Header />
      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}

export default Layout;
