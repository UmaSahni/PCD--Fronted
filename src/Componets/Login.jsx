import {
  Container,
  Input,
  Box,
  Button,
  Text,
  Center,
  Heading,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BaseURL } from "../url";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken, setAuth, auth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BaseURL}/user/login`, { email, pass })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);

        if (res.data.message == "Login successful") {
          setToken(res.data.token);
          setAuth(true);
        }

        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data.message);
      });
  };

  return (
    <Container >
      <Toaster />
      <Center>
        <Heading mt={4} mb={4} size="lg">
          Login Here
        </Heading>
      </Center>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <form onSubmit={handleSubmit}>
          <Box mb={4}>
            <label>Email</label>
            <Input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              padding={2}
              width={"100%"}
              type="email"
              placeholder="Enter your email"
            />
          </Box>
          <Box mb={4}>
            <label>Password</label>
            <Input
              required
              value={pass}
              onChange={(e) => setPassword(e.target.value)} // Update pass state
              padding={2}
              width={"100%"}
              type="password"
              placeholder="Enter your password"
            />
          </Box>
          <Flex justifyContent={"space-between"}>
            <Button width={"full"} mb={2} type="submit" colorScheme="blue">
              Login
            </Button>
          </Flex>

          <Text>
            <b>
              Not a user please{" "}
              <span style={{ color: "red" }}>
                <Link to={"/"}>Register</Link>{" "}
              </span>{" "}
            </b>
          </Text>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
