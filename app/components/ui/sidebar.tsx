import {
  Box,
  Center,
  HStack,
  Image,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router";
import Iconify from "./iconify";
import type { SidebarItem } from "~/routes/(dashboard)/_layout";

export default function Sidebar({
  listSidebar,
}: {
  listSidebar: SidebarItem[];
}) {
  return (
    <>
      <Box
        boxShadow={"inset -1px 0px 0px #F1F5F9"}
        position={"fixed"}
        overflow={"auto"}
        bgColor={"white"}
        h={"100svh"}
        w={"260px"}
        zIndex={200}
        px={"18px"}
        py={"20px"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Stack gap={"34px"}>
          <Center w={"full"}>
            <Text
              fontSize={"3xl"}
              color={"orange.500"}
              fontWeight={"bold"}
              fontStyle={"italic"}
              >
              Griya<Span color={"blue.600"}>Care</Span>
            </Text>
          </Center>
          <Stack w={"full"}>
            {listSidebar.map((item, index) => {
              return (
                <NavLink to={item.link} key={index}>
                  <HStack
                    alignItems={"center"}
                    gap={"10px"}
                    w={"full"}
                    _hover={{
                      bg: "orange.200",
                    }}
                    rounded={"lg"}
                    bg={"white"}
                    py={"10px"}
                    px={"8px"}
                  >
                    <Iconify
                      icon={item.icon}
                      boxSize={"24px"}
                      color={"#64748B"}
                    />
                    <Text
                      fontWeight={"medium"}
                      fontSize={"16px"}
                      color={"#64748B"}
                    >
                      {item.title}
                    </Text>
                  </HStack>
                </NavLink>
              );
            })}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
