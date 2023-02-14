import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import AuthContext from "@/context/AuthContext";
import { useContext, useState, useRef, useEffect } from "react";
import LoginModal from "./LoginModal";
import { handleLogout } from "@/helpersAndHooks/handleLogout";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { useClickOutsideToClose } from "@/helpersAndHooks/useClickOutsideToClose";

export default function Header() {
  const { user, setUser } = useContext(AuthContext);

  const [loginBtnClicked, setClicked] = useState(false);
  const [userBtn, setUserBtnClicked] = useState(false);
  const [narrowScreen, setIsNarrowScreen] = useState(false);

  const buttonRef = useRef(null);
  const paragraphRef = useRef(null);
  const svgRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const smallScreen = window.matchMedia("(max-width: 420px)").matches;
    setIsNarrowScreen(smallScreen);
  }, []);

  const closeOnOutsideClick = useClickOutsideToClose(
    setUserBtnClicked,
    buttonRef,
    paragraphRef,
    svgRef
  );

  return (
    <>
      <Flex
        w="100%"
        h="fit-content"
        as="header"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex
          as="a"
          href="#"
          fontFamily="heading"
          fontSize="6xl"
          onClick={() => {
            router.push("/");
          }}
        >
          {!narrowScreen ? (
            <>
              <Box as="p">Jams</Box>
              <Box as="p" color="red.600">
                list
              </Box>
            </>
          ) : (
            <>
              <Box as="p">J</Box>
              <Box as="p" color="red.600">
                List
              </Box>
            </>
          )}
        </Flex>
        {user ? (
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            h={"40px"}
            minW={"120px"}
            w={"fit-content"}
            position={"relative"}
          >
            <Flex
              as="button"
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"100%"}
              h={"100%"}
              onClick={() => setUserBtnClicked(!userBtn)}
              cursor={"pointer"}
              ref={buttonRef}
            >
              <Box as="p" fontWeight={"900"} ref={paragraphRef}>
                {user.username}
              </Box>
              <ChevronDownIcon ref={svgRef} h={"100%"} m={"0.5rem"} />
            </Flex>
            <Box
              as="nav"
              position={"absolute"}
              top={"95%"}
              visibility={userBtn ? "visible" : "hidden"}
              maxW={"120px"}
              display={"grid"}
              gridTemplateColumns={"repeat(1, 1fr)"}
              gap={".4rem"}
              bg={"gray.300"}
              p={".4rem"}
            >
              <Button
                onClick={() => {
                  router.push(`/user/${user.id}`);
                }}
              >
                Dashboard
              </Button>
              <Button
                onClick={() => {
                  handleLogout({
                    setUser,
                    onSuccess: () => {
                      router.push("/");
                    },
                    handleError: toast.error,
                  });
                }}
              >
                Log Out
              </Button>
            </Box>
          </Flex>
        ) : (
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => setClicked(true)}>
                Log In
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>Sign Up</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        )}
        {loginBtnClicked && <LoginModal close={setClicked} />}
      </Flex>
      <ToastContainer position="top-left" />
    </>
  );
}
