import "./App.css";
import { Container, Heading } from "@chakra-ui/react";
import AllRoutes from "./Componets/AllRoutes";
import Form from "./Componets/Form";

function App() {
  return (
    <Container>
      <Form />
      <AllRoutes />
    </Container>
  );
}

export default App;
