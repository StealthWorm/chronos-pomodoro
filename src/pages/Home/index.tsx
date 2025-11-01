
import { Container } from "../../components/Container";
import { Countdown } from "../../components/Countdown";
import { Form } from "../../components/Form";

export function Home() {
  return (
    <>
      <Container>
        <Countdown />
      </Container>
      <Container>
        <Form />
      </Container>
    </>
  )
}