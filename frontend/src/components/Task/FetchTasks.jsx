import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Button, Input, Textarea, Select, useToast } from '@chakra-ui/react';

const categories = ['Work', 'Personal', 'Urgent', 'Miscellaneous'];

const FetchTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: '',
  });
  const toast = useToast();

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/api/v1/user/task');
      setTasks(response.data);
    } catch (error) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/user/task/delete/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast({
        title: 'Task Deleted',
        description: 'The task has been deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setError('Failed to delete task');
    }
  };

  const startEditing = (task) => {
    setEditingTask(task._id);
    setEditForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      category: task.category,
    });
  };

  const saveTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/user/tasks/${taskId}`, editForm);
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, ...editForm } : task
      ));
      setEditingTask(null);
      toast({
        title: 'Task Updated',
        description: 'The task has been updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      setError('Failed to update task');
    }
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Box p={['0', '16']} overflowX="auto" bg="#1A202C">
        <Heading textTransform={'uppercase'} children="All Tasks" my="16" textAlign={["center", "left"]} color="white" />
        <TableContainer>
          <Table variant="simple">
            <TableCaption color="white">All tasks</TableCaption>
            <Thead>
              <Tr>
                <Th color="white">#</Th>
                <Th color="white">Title</Th>
                <Th color="white">Description</Th>
                <Th color="white">Due Date</Th>
                <Th color="white">Category</Th>
                <Th color="white">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <Tr>
                  <Td colSpan="6" textAlign="center" color="white">Loading...</Td>
                </Tr>
              ) : tasks.length === 0 ? (
                <Tr>
                  <Td colSpan="6" textAlign="center" color="white">No data found</Td>
                </Tr>
              ) : (
                tasks.map((task, index) => (
                  <Tr key={task._id}>
                    <Td color="white">{index + 1}</Td>
                    <Td>
                      {editingTask === task._id ? (
                        <Input 
                          name="title"
                          value={editForm.title} 
                          onChange={handleChange} 
                        />
                      ) : (
                        task.title
                      )}
                    </Td>
                    <Td>
                      {editingTask === task._id ? (
                        <Textarea 
                          name="description"
                          value={editForm.description} 
                          onChange={handleChange} 
                        />
                      ) : (
                        task.description
                      )}
                    </Td>
                    <Td>
                      {editingTask === task._id ? (
                        <Input 
                          type="date"
                          name="dueDate"
                          value={editForm.dueDate} 
                          onChange={handleChange} 
                        />
                      ) : (
                        task.dueDate
                      )}
                    </Td>
                    <Td>
                      {editingTask === task._id ? (
                        <Select 
                          name="category"
                          value={editForm.category} 
                          onChange={handleChange} 
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </Select>
                      ) : (
                        task.category
                      )}
                    </Td>
                    <Td>
                      {editingTask === task._id ? (
                        <>
                          <Button 
                            colorScheme="purple" 
                            mr={2} 
                            onClick={() => saveTask(task._id)}
                          >
                            Save
                          </Button>
                          <Button 
                            colorScheme="purple" 
                            onClick={cancelEditing}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            colorScheme="purple" 
                            mr={2} 
                            onClick={() => startEditing(task)}
                          >
                            Edit
                          </Button>
                          <Button 
                            colorScheme="purple" 
                            onClick={() => deleteTask(task._id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
};

export default FetchTasks;
