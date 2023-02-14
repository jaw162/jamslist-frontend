import {
  Flex,
  keyframes,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getBigger = keyframes`
    0% {
        visibility: visible;
        transform: scale(0, 0);
    }
    100% {
        visibility: visible;
        transform: scale(1, 1);
    }
`;

const darkenBackground = keyframes`
    0% {
        background-color: rgba(0,0,0,0);
    }

    100% {
        background-color: rgba(0,0,0,.3);
    }
`;

const slideAway = keyframes`
    0% {
        visibility: visible;
        transform: translateY(0);
    }
    100% {
        visibility: hidden;
        transform: translateY(100%);
    }

`;

export default function LoginModal({
  close,
}: {
  close: (arg: boolean) => void;
}) {
  const { setUser, handleLogin } = useContext(AuthContext);
  const [triggerCloseAnim, setTrigger] = useState(false);
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });

  const { username, password } = loginInfo;

  const handleChange = (
    field: keyof typeof loginInfo,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setLoginInfo({ ...loginInfo, [field]: e.currentTarget.value });
  };

  const animateOnOpen = `${getBigger} .1s ease-in .05s 1 normal forwards`;
  const darkenOnOpen = `${darkenBackground} .1s ease-in .05s 1 normal forwards`;
  const slideOnClose = `${slideAway} .1s ease-in .05s 1 normal forwards`;

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      position={"fixed"}
      h={"100%"}
      w={"100%"}
      top={"0"}
      left={"0"}
      zIndex={"1000"}
      animation={triggerCloseAnim ? slideOnClose : darkenOnOpen}
      onAnimationEnd={triggerCloseAnim ? () => close(false) : undefined}
      onClick={e => {
        const target = e.target as HTMLDivElement;
        if (target.children.namedItem("form")) setTrigger(true);
      }}
    >
      <form
        name="form"
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();

          if (!username || !password)
            return toast.error("Please fill in all fields.");

          handleLogin({
            username,
            password,
            setUser,
            handleError: toast.error,
            onSuccess: () => {
              setLoginInfo({ username: "", password: "" });
              toast.success("Success", { autoClose: 2000 });
              setTimeout(() => setTrigger(true), 1000);
            },
          });
        }}
      >
        <FormControl
          display={"flex"}
          flexDir={"column"}
          justifyContent={"space-evenly"}
          maxW={"300px"}
          h={"25rem"}
          bg={"white"}
          p={"1.5rem"}
          position={"relative"}
          transform={"scale(0, 0)"}
          visibility={"hidden"}
          animation={animateOnOpen}
          borderRadius={"10px"}
          border={"5px solid"}
          borderColor={"blue.400"}
        >
          <CloseIcon
            cursor={"pointer"}
            pos={"absolute"}
            top={"0"}
            right={"0"}
            m={"1rem"}
            onClick={() => setTrigger(true)}
          />
          <FormLabel>Username</FormLabel>
          <Input
            type="username"
            onChange={e => handleChange("username", e)}
            value={loginInfo.username}
          />
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            onChange={e => handleChange("password", e)}
            value={loginInfo.password}
          />
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
    </Flex>
  );
}
