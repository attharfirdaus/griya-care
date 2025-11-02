import { Button, HStack, Menu, Portal } from "@chakra-ui/react";
import Iconify from "./iconify";
import { useAuthStore } from "~/store/auth-store";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);

  return (
    <HStack
      justifyContent={"end"}
      alignItems={"center"}
      px={"24px"}
      py={"8px"}
      w={"full"}
      h={"60px"}
      position={"fixed"}
      zIndex={100}
      bg={"white"}
    >
      <HStack
        justifyContent={"center"}
        alignItems={"center"}
        gap={"14px"}
        w={"fit"}
        h={"full"}
      >
        <Iconify icon="bx:bell" boxSize={"24px"} color={"gray.500"} />
        <HStack
          alignItems={"center"}
          justifyContent={"center"}
          gap={"8px"}
          w={"fit"}
          h={"full"}
          pr={"8px"}
        >
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                variant={"outline"}
                size={"sm"}
                color={"gray.500"}
                _hover={{ bg: "gray.100" }}
                _expanded={{ bg: "gray.200" }}
                rounded={"lg"}
                borderWidth={"2px"}
                borderColor={"gray.500"}
              >
                {user?.name}
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content bg={"white"} rounded={"lg"} boxShadow={"sm"}>
                  <Menu.Item value="keluar" color={"fg.error"} bg={"white"}>
                    Keluar
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </HStack>
      </HStack>
    </HStack>
  );
}
