import HomeSubsection from "@/components/HomeSubsection";
import Layout from "@/components/Layout";
import MessagesSubsection from "@/components/MessagesSubsection";
import useGetUserData from "@/helpersAndHooks/useGetUserData";
import { Container, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();

  const { userData, setNeedsRefresh } = useGetUserData(router);

  const [activeTab, setActiveTab] = useState("home");

  return (
    <Layout makeLarge={false}>
      <Container
        maxW={"maxWidth"}
        display={"grid"}
        gridTemplateColumns={"repeat(4, 1fr)"}
        p={"10rem 0"}
      >
        <Container
          gridColumn={"1"}
          as={"nav"}
          display={"flex"}
          flexDir={"column"}
          maxW={"100%"}
          w={"100%"}
          borderRight={"2px solid transparent"}
          borderColor={"blackAlpha.400"}
        >
          <Box
            p={".5rem 0"}
            m={"1rem 0"}
            borderRight={"2px solid transparent"}
            borderColor={activeTab === "home" ? "blue.600" : ""}
            textAlign={"left"}
            as="button"
            onClick={() => {
              setActiveTab("home");
            }}
            _hover={{ textDecor: "underline" }}
          >
            Home
          </Box>
          <Box
            p={".5rem 0"}
            m={"1rem 0"}
            borderRight={"2px solid transparent"}
            borderColor={activeTab === "messages" ? "blue.600" : ""}
            textAlign={"left"}
            as="button"
            onClick={() => {
              setActiveTab("messages");
            }}
            _hover={{ textDecor: "underline" }}
          >
            Messages
          </Box>
          <Box
            borderRight={"2px solid transparent"}
            borderColor={activeTab === "posts" ? "blue.600" : ""}
            p={".5rem 0"}
            m={"1rem 0"}
            textAlign={"left"}
            as="button"
            onClick={() => {
              setActiveTab("posts");
            }}
            _hover={{ textDecor: "underline" }}
          >
            Posts
          </Box>
        </Container>
        {activeTab === "home" && userData && (
          <HomeSubsection
            userId={userData.id}
            messages={userData.conversation}
            posts={userData.posts}
          />
        )}
        {activeTab === "messages" && userData && (
          <MessagesSubsection
            messages={userData.conversation}
            userId={userData.id}
            setNeedsRefresh={setNeedsRefresh}
          />
        )}
      </Container>
    </Layout>
  );
}
