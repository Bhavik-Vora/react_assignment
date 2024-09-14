import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useColorModeValue } from '@chakra-ui/react';
import { register } from '../../Redux/action/user';
import { useDispatch } from 'react-redux';
const Register = () => {
 
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
 
    dispatch(register(myForm));
  };
  return (
    <>
      <Container h={'105vh'}>
  
      <VStack h={'full'} justifyContent="center" spacing={'4'}>

          <Heading children="Signup To Todo App" />

          <form style={{ width: '100%' }} onSubmit={submitHandler}>
            <Box my={'4'} display={'flex'} justifyContent="center">
              <Avatar size={'lg'} src={imagePrev} />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="name" children="Name" />
              <Input
                required
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter Your Name..."
                type={'name'}
                focusBorderColor="yellow.500"
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="email" children="Email Address" />
              <Input
                required
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter Your Email..."
                type={'email'}
                focusBorderColor="yellow.500"
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="password" children="Password" />
              <Input
                required
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Your Password.."
                type={'password'}
                focusBorderColor="yellow.500"
              />
            </Box>

            <Box my={'4'}>
              <FormLabel htmlFor="chooseAvatar" children="Choose a Avatar" />
              <Input
                accept="image/*"
                required
                id="chooseAvatar"
                type={'file'}
                css={fileUploadCss}
                focusBorderColor="yellow.500"
                onChange={changeImageHandler}
              />
            </Box>

            <Button my={'4'} colorScheme={'red'} type="submit">
              Sign Up
            </Button>

            <Box my="4">
              Already Signed Up ?{' '}
              <Link to="/login">
                <Button colorScheme="red" variant="link">
                  Login
                </Button>{' '}
                Here{' '}
              </Link>
            </Box>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Register;
