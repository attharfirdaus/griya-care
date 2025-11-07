import { Image, Stack, Table, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import type { Ticket } from "~/types";
import { TableSkeleton } from "../ui/table-skeleton";
import { formatDate } from "~/utils/date";

type TicketProps = {
  tickets: Ticket[];
  ticketsLoading: boolean;
  onSuccess?: (ticket?: Ticket, action?: "add" | "edit" | "delete") => void;
};

export default function TicketsTable({
  tickets,
  ticketsLoading,
  onSuccess,
}: TicketProps) {
  const navigate = useNavigate();

  return (
    <Table.ScrollArea w={"100%"} overflowX={"hidden"}>
      <Table.Root size={"sm"} stickyHeader w={"full"} tableLayout={"auto"}>
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
              Nomor
            </Table.ColumnHeader>
            <Table.ColumnHeader
              color={"black"}
              borderBottomColor={"gray.200"}
              px={4}
              fontWeight={"bold"}
              fontSize={"14px"}
              whiteSpace={"nowrap"}
            >
              Judul Gangguan
            </Table.ColumnHeader>
            <Table.ColumnHeader
              color={"black"}
              borderBottomColor={"gray.200"}
              px={4}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              Tanggal Dibuat
            </Table.ColumnHeader>
            <Table.ColumnHeader
              color={"black"}
              borderBottomColor={"gray.200"}
              px={4}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              Prioritas
            </Table.ColumnHeader>
            <Table.ColumnHeader
              color={"black"}
              borderBottomColor={"gray.200"}
              px={4}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              Status
            </Table.ColumnHeader>
            <Table.ColumnHeader
              borderTopEndRadius={"xl"}
              borderBottomColor={"gray.200"}
            ></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {ticketsLoading ? (
            <TableSkeleton rows={5} cols={6} />
          ) : tickets.length > 0 ? (
            tickets.map((item, index) => (
              <Table.Row
                key={item.ticket_number}
                bg={"white"}
                color={"black"}
                h={"46px"}
              >
                <Table.Cell
                  borderBottomColor={
                    index + 1 === tickets.length ? "transparent" : "gray.200"
                  }
                  px={4}
                  borderBottomStartRadius={
                    index + 1 === tickets.length ? "xl" : "none"
                  }
                >
                  {item.ticket_number}
                </Table.Cell>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === tickets.length ? "transparent" : "gray.200"
                  }
                  px={4}
                  whiteSpace={"normal"}
                  overflow={"hidden"}
                  wordBreak={"break-word"}
                >
                  {item.title}
                </Table.Cell>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === tickets.length ? "transparent" : "gray.200"
                  }
                  px={4}
                >
                  {formatDate(item.created_at)}
                </Table.Cell>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === tickets.length ? "transparent" : "gray.200"
                  }
                  px={4}
                >
                  {item.priority}
                </Table.Cell>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === tickets.length ? "transparent" : "gray.200"
                  }
                  px={4}
                >
                  {item.status}
                </Table.Cell>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === tickets.length ? "transparent" : "gray.200"
                  }
                  px={4}
                  borderBottomEndRadius={
                    index + 1 === tickets.length ? "xl" : "none"
                  }
                ></Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell
                colSpan={6}
                justifyContent={"center"}
                backgroundColor={"white"}
                borderBottomColor={"gray.200"}
              >
                <Stack
                  align={"center"}
                  justify={"center"}
                  w={"full"}
                  py={6}
                  gap={0}
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
