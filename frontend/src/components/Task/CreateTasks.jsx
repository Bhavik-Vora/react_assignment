import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, Heading, Input, Select, VStack } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import axios from 'axios';

const categories = [
  "Web development",
  "Artificial Intelligence",
  "Data Structure & Algorithm",
  "App Development",
  "Data Science",
  "Game Development",
];

const CreateTasks = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await axios.post('/api/v1/tasks', { title, description, category, dueDate });
      setMessage('Task created successfully!');
      setTitle('');
      setDescription('');
      setDueDate('');
      setCategory('');
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
  }, [error, message]);

  return (
    <Grid minH={"100vh"} templateColumns={["1fr", "5fr 1fr"]}>
      <Container py="16">
        <form onSubmit={submitHandler}>
          <Heading textTransform={"uppercase"} children="Create Task" my="16" textAlign={["center", "left"]} />
          <VStack m="auto" spacing={"8"}>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" type={"text"} focusBorderColor="purple.300" />
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" type={"text"} focusBorderColor="purple.300" />
            <Input value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due Date" type={"date"} focusBorderColor="purple.300" />
            <Select focusBorderColor="purple.300" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Category</option>
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </Select>
            <Button isLoading={loading} w="full" colorScheme={"purple"} type="submit">Create Task</Button>
          </VStack>
        </form>
      </Container>
    </Grid>
  );
};

export default CreateTasks;
