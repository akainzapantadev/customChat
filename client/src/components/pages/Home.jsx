import { Container } from "react-bootstrap";
import { ChichatLogo } from "../index";

function Home() {
  return (
    <Container className="mt-5">
      <center>
        <img className="img-fluid" src={ChichatLogo}></img>

        <div className="p-md-5">
          <p className="px-md-5">
            Welcome to <strong>Chichat</strong>, a web application developed by
            <strong> Akaindev</strong>. Chichat is is a demo application to
            showcase the capabilities of the MERN stack and the potential of
            real-time communication. It is not intended for production use but
            rather to demonstrate the power and versatility of modern web
            technologies.
          </p>

          <p className="px-md-5">
            Chichat allows you to connect with others in a seamless and instant
            manner. With its modern and user-friendly interface, you can engage
            in conversations, share ideas, and connect with friends, family, or
            colleagues from anywhere in the world.
          </p>
        </div>
      </center>
    </Container>
  );
}

export default Home;
