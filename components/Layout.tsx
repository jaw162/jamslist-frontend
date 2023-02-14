import { Container } from "@chakra-ui/react";
import Header from "./Header";
import HomePageHero from "./HomePageHero";
import Footer from "./Footer";

export default function Layout({
  children,
  makeLarge,
}: {
  children: React.ReactNode;
  makeLarge: boolean;
}) {
  return (
    <Container as="main" p={0} m={0} w="100%" maxW="100%" bg="offWhite">
      <Container maxW={"maxWidth"}>
        <Header />
      </Container>
      {makeLarge && <HomePageHero />}
      {children}
      <Container maxW={"100%"} bg={"gray.200"}>
        <Footer />
      </Container>
    </Container>
  );
}
