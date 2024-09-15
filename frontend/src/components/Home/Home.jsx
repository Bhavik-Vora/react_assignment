import React, { useState, useEffect } from 'react';
import { Box, Grid, Heading, Button, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Text, useToast, VStack, Select } from '@chakra-ui/react';
import axios from 'axios';

const categories = ['Work', 'Personal', 'Urgent', 'Miscellaneous'];
const getCurrentDateTime = () => {
  const now = new Date();
  return now.toLocaleString();
};

const HomePage = () => {
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 1000);

    return () => clearInterval(timer); 
  }, []);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: '',
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const toast = useToast();


  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/user/task');
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Error',
        description: 'Failed to fetch tasks.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddTask = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/user/task', newTask);
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        category: '',
      });
      fetchTasks(); 
      toast({
        title: 'Task Added',
        description: 'Your task has been added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add task.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

 

  const getDueTasks = () => {
    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + 7);

    return tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return dueDate >= now && dueDate <= endDate;
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Grid minH={'100vh'} p={6} bg="#1A202C" templateColumns={['1fr', '3fr 1fr']}>
      <Box p={6} bg="gray.800" borderRadius="md" boxShadow="md">
        <VStack spacing={6} align="stretch">
          <Box mb={6}>
            <Heading color="white" textAlign={"center"}>Welcome back, {username}!</Heading>
            <Text color="gray.400" textAlign={"center"}>{getCurrentDateTime()}</Text>
          </Box>

          <Box bg="gray.700" p={6} borderRadius="md" boxShadow="md" textAlign={"center"}>
            <Heading size="md" color="white" mb={4}>Add New Task</Heading>
            <Input
              placeholder="Title"
              name="title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              mb={3}
              color="white"
              borderColor="purple.500"
              
            />
            <Input
              placeholder="Description"
              name="description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              mb={3}
              color="white"
              borderColor="purple.500"
            />
            <Input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              mb={3}
              color="white"
              borderColor="purple.500"
            />
            <Select
              name="category"
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              mb={3}
              color="white"
              borderColor="purple.500"
            >
              <option value="" disabled>Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
            <Button colorScheme="purple" onClick={handleAddTask}>
              Add Task
            </Button>
          </Box>

          <Box bg="gray.700" p={6} borderRadius="md" boxShadow="md" mt={6}>
            <Heading size="md" color="white" mb={4} textAlign={"center"}>Due Tasks (Next 7 Days)</Heading>
            <TableContainer>
              <Table variant="simple">
                <TableCaption>Tasks due from today to the next 7 days</TableCaption>
                <Thead>
                  <Tr>
                    <Th color="white">#</Th>
                    <Th color="white">Title</Th>
                    <Th color="white">Description</Th>
                    <Th color="white">Due Date</Th>
                    <Th color="white">Category</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {loading ? (
                    <Tr>
                      <Td colSpan="5" textAlign="center" color="white">Loading...</Td>
                    </Tr>
                  ) : getDueTasks().length === 0 ? (
                    <Tr>
                      <Td colSpan="5" textAlign="center" color="white">No data found</Td>
                    </Tr>
                  ) : (
                    getDueTasks().map((task, index) => (
                      <Tr key={task._id} bg="red.600">
                        <Td color="white">{index + 1}</Td>
                        <Td color="white">{task.title}</Td>
                        <Td color="white">{task.description}</Td>
                        <Td color="white">{task.dueDate}</Td>
                        <Td color="white">{task.category}</Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
      </Box>
      <Box p={6} bg="gray.800" borderRadius="md" boxShadow="md">
      </Box>
    </Grid>
  );
};

export default HomePage;
