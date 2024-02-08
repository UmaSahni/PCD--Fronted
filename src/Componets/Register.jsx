import {
  Container,
  Input,
  Box,
  Button,
  Text,
  Center,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../url";
const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, pass);
    axios
      .post(`${BaseURL}/user/reg`, { email, pass })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        navigate("/login")
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Container>
      <Center>
        <Heading mt={4} mb={4} size="lg">
          Register
        </Heading>
      </Center>
      <Toaster />
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <form onSubmit={handleSubmit}>
          <Box mb={4}>
            <label>Email</label>
            <Input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              padding={2}
              width={"100%"}
              type="password"
              placeholder="Enter your password"
            />
          </Box>
          <Button width={"full"} mb={2} type="submit" colorScheme="blue">
            Register
          </Button>
          <Text>
            <b>
              Already a user{" "}
              <span style={{ color: "red" }}>
                <Link to={"/login"}>Login</Link>
              </span>
            </b>
          </Text>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
