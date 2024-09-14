import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <Flex>
      <Box
        position="fixed"
        width="250px"
        height="100vh"
        boxShadow="-2px 0 10px rgba(107,70,193,0.5)"
        p="16"
        bg="white"
      >
        <Header />
      </Box>
      <Box
        ml="250px" 
        p="4"
        width="100%"
        height="100vh"
        overflowY="auto"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
