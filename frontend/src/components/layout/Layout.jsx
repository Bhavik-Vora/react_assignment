import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';

// Function to get the token from cookies
const getTokenFromCookies = () => {
  const token = document.cookie.split('; ').find(row => row.startsWith('todotoken='));
  return token ? token.split('=')[1] : null;
};

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the token exists on component mount
  useEffect(() => {
    const token = getTokenFromCookies();
    if (token) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  return (
    <Flex>
      {/* Sidebar with Header */}
      <Box
        position="fixed"
        width="250px"
        height="100vh"
        boxShadow="-2px 0 10px rgba(107,70,193,0.5)"
        p="4"
        bg="#1A202C"
      >
        <Header isLoggedIn={isLoggedIn} /> {/* Pass the login state to Header */}
      </Box>

      {/* Main content area */}
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
