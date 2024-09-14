import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import { RiAddCircleFill, RiDashboardFill } from 'react-icons/ri';
import { SiTask } from 'react-icons/si';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <>
      <VStack
        spacing={'8'}
        p="16"
        boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
      >
      
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
