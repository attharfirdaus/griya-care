import { Center, Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router";
import Navbar from "~/components/ui/navbar";
import Sidebar from "~/components/ui/sidebar";
import { useInitializeAuth } from "~/hooks/useInitializeAuth";

export type SidebarItem = {
  title: string;
  link: string;
  icon: string;
};

export default function DashboardLayout() {
  const initialized = useInitializeAuth();

  const listSidebar: SidebarItem[] = [
    { title: "Pelanggan", link: "/pelanggan", icon: "fa7-solid:users" },
    {
      title: "Tiket Gangguan",
      link: "/tiket-gangguan",
      icon: "f7:tickets-fill",
    },
    { title: "Akun", link: "/akun", icon: "clarity:administrator-solid" },
  ];
  const location = useLocation();
  const activeItem = listSidebar.find((item) =>
    location.pathname.startsWith(item.link)
  );
  const pageTitle = activeItem ? activeItem.title : "Dashboard";

  return (
    <>
      <Flex>
        <Sidebar listSidebar={listSidebar} />
        <Stack
          ml={"260px"}
          w={"calc(100% - 260px)"}
          minH={"100vh"}
          bg={"gray.100"}
          position={"relative"}
        >
          <Flex w={"full"} justify={"end"}>
            <Navbar />
          </Flex>
          <Stack px={10} pt={"80px"} pb={10} gap={10}>
            {!initialized ? (
              <Center>
                <Spinner size={"xl"} color={"red.500"} borderWidth={"4px"} />
              </Center>
            ) : (
              <>
                <Text fontSize={"4xl"} color={"blue.600"} fontWeight={"bold"}>
                  {pageTitle}
                </Text>
                <Outlet />
              </>
            )}
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
