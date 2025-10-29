import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Sidebar from "~/components/ui/sidebar";

export type SidebarItem = {
  title: string;
  link: string;
  icon: string;
};

export default function DashboardLayout() {
  const listSidebar: SidebarItem[] = [
    { title: "Pelanggan", link: "/pelanggan", icon: "fa7-solid:users" },
    {
      title: "Tiket Gangguan",
      link: "/tiket-gangguan",
      icon: "f7:tickets-fill",
    },
    { title: "Akun", link: "/akun", icon: "clarity:administrator-solid" },
  ];

  return (
    <>
      <Flex>
        <Sidebar listSidebar={listSidebar} />
      </Flex>
      <Box
        ml={"260px"}
        w={"calc(100% - 260px)"}
        minH={"100vh"}
        bg={"gray.50"}
        p={6}
      >
        <Outlet />
      </Box>
    </>
  );
}
