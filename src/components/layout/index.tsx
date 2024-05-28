import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
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
