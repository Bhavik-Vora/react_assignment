import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const server = "http://localhost:8081/api/v1/user"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch(`${server}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Store token in cookies or local storage
        document.cookie = `todotoken=${data.token}; path=/;`;
        // Redirect to home page or wherever you want
        navigate('/');
      } else {
        setError(data.message); // Display error message
      }
    } catch (err) {
      setError('An error occurred. Please try again.'); // Handle fetch error
    }
  };

  return (
    <Container h={'100vh'}>
      <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Heading>Welcome To Todo App</Heading>
        <form style={{ width: '100%' }} onSubmit={submitHandler}>
          {error && <Box color="red.500" mb="4">{error}</Box>}
          <Box my={'4'}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email..."
              type={'email'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              required
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password.."
              type={'password'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box>
            <Link to="/forgetpassword">
              <Button fontSize={'sm'} variant={'link'}>
                Forget Password?
              </Button>
            </Link>
          </Box>
          <Button my={'4'} colorScheme={'red'} type="submit">
            Login
          </Button>
          <Box my="4">
            New User?{" "}
            <Link to="/register">
              <Button colorScheme="red" variant="link">
                Sign Up
              </Button>{" "}
              Here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
