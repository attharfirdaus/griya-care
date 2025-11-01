import { Image, Stack, Table, Text } from "@chakra-ui/react";
import type { Customer } from "~/types";
import { TableSkeleton } from "../ui/table-skeleton";

type CustomerProps = {
  customers: Customer[];
  customersLoading: boolean;
};

export default function CustomerTable({
  customers,
  customersLoading,
}: CustomerProps) {
  return (
    <Table.ScrollArea>
      <Table.Root size={"sm"} stickyHeader>
        <Table.Header fontSize={"12px"}>
          <Table.Row bg={"#E2E8F0"} h={"46px"}>
            <Table.ColumnHeader
              borderTopStartRadius={"xl"}
              color={"black"}
              borderBottomColor={"gray.200"}
              px={4}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              No.
            </Table.ColumnHeader>
            <Table.ColumnHeader
              color={"black"}
              borderBottomColor={"gray.200"}
              px={4}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              Nama
            </Table.ColumnHeader>
            <Table.ColumnHeader
              color={"black"}
              borderBottomColor={"gray.200"}
              px={4}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              Alamat
            </Table.ColumnHeader>
            <Table.ColumnHeader
              color={"black"}
              borderBottomColor={"gray.200"}
              px={4}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              No. Telp
            </Table.ColumnHeader>
            <Table.ColumnHeader
              color={"black"}
              borderBottomColor={"gray.200"}
              px={4}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              Paket Langganan
            </Table.ColumnHeader>
            <Table.ColumnHeader
              color={"black"}
              borderBottomColor={"gray.200"}
              px={4}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              Status Langganan
            </Table.ColumnHeader>
            <Table.ColumnHeader
              borderTopEndRadius={"xl"}
              color={"black"}
              borderBottomColor={"gray.200"}
              px={4}
              fontWeight={"bold"}
              fontSize={"14px"}
            ></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {customersLoading ? (
            <TableSkeleton rows={5} cols={6} />
          ) : customers.length > 0 ? (
            customers.map((item, index) => (
              <Table.Row key={item.id} bg={"white"} color={"black"} h={"46px"}>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === customers.length ? "transparent" : "gray.200"
                  }
                  px={4}
                  borderBottomStartRadius={
                    index + 1 === customers.length ? "xl" : "none"
                  }
                >
                  {index + 1}
                </Table.Cell>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === customers.length ? "transparent" : "gray.200"
                  }
                  px={4}
                >
                  {item.name}
                </Table.Cell>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === customers.length ? "transparent" : "gray.200"
                  }
                  px={4}
                >
                  {item.address}
                </Table.Cell>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === customers.length ? "transparent" : "gray.200"
                  }
                  px={4}
                >
                  {item.phone}
                </Table.Cell>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === customers.length ? "transparent" : "gray.200"
                  }
                  px={4}
                >
                  {item.service_package}
                </Table.Cell>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === customers.length ? "transparent" : "gray.200"
                  }
                  px={4}
                >
                  {item.status === "active" ? "Aktif" : "Tidak Aktif"}
                </Table.Cell>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === customers.length ? "transparent" : "gray.200"
                  }
                  px={4}
                  borderBottomEndRadius={
                    index + 1 === customers.length ? "xl" : "none"
                  }
                ></Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell
                colSpan={7}
                justifyContent={"center"}
                backgroundColor={"white"}
                borderBottomColor="gray.200"
              >
                <Stack
                  align="center"
                  justify="center"
                  w="full"
                  py={6}
                  spaceY={0}
                >
                  <Image src="/images/no-data.png" alt="No data" w="160px" />
                  <Text fontSize="lg" fontWeight="bold" color={"gray.700"}>
                    Tidak Ditemukan
                  </Text>
                  <Text textAlign="center" mt={2} color="gray.500">
                    Tidak ada data pelanggan yang ditemukan.
                  </Text>
                </Stack>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}
