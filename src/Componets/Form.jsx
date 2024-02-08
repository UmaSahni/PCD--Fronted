import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Toast,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";
import axios from "axios";
import { BaseURL } from "../url";
import toast, { Toaster } from "react-hot-toast";
const Form = () => {
  const { token, auth } = useContext(AuthContext);
  //   console.log(token);
  const [name, setName] = useState("");
  const [specialize, setSpecialize] = useState("");
  const [view, setView] = useState([]);
  const [state, setState] = useState(false);
  const handleEveryOnes = () => {
    setState(!state);
    axios({
      method: "get",
      url: `${BaseURL}/details/all`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          toast.error("Please Login Again");
        }
        console.log(res);
        setView(res.data.data);
        setName("")
        setSpecialize("")
      })
      .catch((err) => {
        console.log(err);
      });
  };

 

  const handleImageClick = (value) => {
    setSpecialize(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, specialize, token);
    // Send a POST request
    axios({
      method: "post",
      url: `${BaseURL}/details/add`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ name, specialize }),
    })
      .then((response) => {
        toast.success(response.data.message);
        console.log(response);
      })
      .catch((error) => {
        toast.error("Please try to login again");
        console.error(error);
      });
  };

  return (
    <div>
      <Container>
        <Toaster />
        <Center>
          <Heading mt={3} mb={3} size="lg">
            Submit Your Specialization{" "}
          </Heading>
        </Center>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <form onSubmit={handleSubmit}>
            <Box>
              <label>Hello, My name is</label>
              <Input
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                padding={2}
                width={"50%"}
                variant="flushed"
                type="text"
              />
              .
            </Box>

            <Box>
              <label> I specialize in </label>
              <Input
                required
                value={specialize}
                onChange={(e) => setSpecialize(e.target.value)}
                padding={2}
                width={"30%"}
                variant="flushed"
                type="text"
              />
              <label>as following shown and this is my test submission.</label>

              <Flex>
                <Box>
                  <Image
                    _hover={{ border: "2px solid black" }}
                    onClick={() => handleImageClick("React")}
                    width={200}
                    height={200}
                    src="https://t4.ftcdn.net/jpg/04/34/08/85/240_F_434088588_IaSMVgtiLYAcczOCbLipZfPVEor5r5P0.jpg"
                    alt="React"
                  />
                  <Image
                    _hover={{ border: "2px solid black" }}
                    onClick={() => handleImageClick("GitHub")}
                    width={200}
                    height={180}
                    src="https://t4.ftcdn.net/jpg/03/85/94/11/240_F_385941143_1BqvbgfMom7UGFvhdYWVr1pHYdDPyBPp.jpg"
                    alt="Apple"
                  />
                </Box>
                <Box>
                  <Image
                    _hover={{ border: "2px solid black" }}
                    onClick={() => handleImageClick("Apple")}
                    width={200}
                    height={200}
                    src="https://t4.ftcdn.net/jpg/01/03/35/77/240_F_103357784_f691I6SVPVZLQ7qcVlHzVOqC2LuiRAWx.jpg"
                    alt="GitHub"
                  />
                  <Image
                    _hover={{ border: "2px solid black" }}
                    onClick={() => handleImageClick("PlayStore")}
                    width={200}
                    height={200}
                    src="playstore.png"
                    alt="Playstore"
                  />
                </Box>
              </Flex>
            </Box>

            <Flex gap={3}>
              <Button isDisabled={!auth} flex={1} type="submit" colorScheme="blue">
               {auth ? "Submit" : "Please login first" }   
              </Button>
              {auth &&  <Button onClick={handleEveryOnes}> View all </Button> }
               
            </Flex>
          </form>
        </Box>
        {state && (
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Submition of all users</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Specialization</Th>
                </Tr>
              </Thead>
              <Tbody>
                {view?.map((el) => {
                  return (
                    <Tr key={el._id}>
                      <Td>{el.name}</Td>
                      <Td>{el.specialize}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  );
};

export default Form;
