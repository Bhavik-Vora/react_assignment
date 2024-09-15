import { Button, VStack, Box } from '@chakra-ui/react';
import React from 'react';
import { RiAddCircleFill, RiDashboardFill } from 'react-icons/ri';
import { SiTask } from 'react-icons/si';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
  const location = useLocation();

  const handleLogout = () => {
    // Clear the token cookie or call the logout API
    document.cookie = 'todotoken=; Max-Age=0'; // Clears the cookie
    window.location.reload(); // Refresh to reflect logout
  };

  return (
    <>
      <VStack
        height={"100vh"}
        spacing={'8'}
        p="16"
        boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
        color={'white'}
      >
        {/* Navigation Links */}
        <LinkButton
          url="/"
          Icon={RiDashboardFill}
          text="Home"
          active={location.pathname === '/'}
        />
        
        <LinkButton
          url="/add-task"
          Icon={RiAddCircleFill}
          text="Add Task"
          active={location.pathname === '/add-task'}
        />
        
        <LinkButton
          url="/tasks"
          Icon={SiTask}
          text="All Tasks"
          active={location.pathname === '/tasks'}
        />

        {/* Login/Logout Button */}
        <Box mt="auto"> {/* Push to bottom of sidebar */}
          {isLoggedIn ? (
            <Button colorScheme="purple" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button colorScheme="purple">Login</Button>
            </Link>
          )}
        </Box>
      </VStack>
    </>
  );
};

export default Header;

function LinkButton({ url, Icon, text, active }) {
  return (
    <Link to={url}>
      <Button
        fontSize={'lg'}
        variant={'ghost'}
        colorScheme={active ? 'purple' : ''}
      >
        <Icon style={{ margin: '4px' }} />
        {text}
      </Button>
    </Link>
  );
}
