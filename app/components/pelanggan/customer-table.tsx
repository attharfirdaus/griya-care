import { Button, HStack, Image, Stack, Table, Text } from "@chakra-ui/react";
import type { Customer } from "~/types";
import { TableSkeleton } from "../ui/table-skeleton";
import { useNavigate } from "react-router";
import slugify from "~/utils/slugify";
import Iconify from "../ui/iconify";
import CustomerFormModal from "./customer-form-modal";
import DeleteModal from "../universal/delete-modal";
import { useTransition } from "react";
import { supabase } from "~/supabase-client";
import { toaster } from "../ui/toaster";

type CustomerProps = {
  customers: Customer[];
  customersLoading: boolean;
  onSuccess?: (customer?: Customer, action?: "add" | "edit" | "delete") => void;
};

export default function CustomerTable({
  customers,
  customersLoading,
  onSuccess,
}: CustomerProps) {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  async function handleDelete(customer: Customer) {
    startTransition(async () => {
      const { error } = await supabase
        .from("customers")
        .delete()
        .eq("id", customer.id);

      if (error) {
        toaster.create({
          title: "Gagal Menghapus",
          description: error.message,
          type: "error",
        });
      } else {
        toaster.create({
          title: "Berasil",
          description: `Pelanggan ${customer.name} berhasil dihapus.`,
          type: "success",
        });

        onSuccess?.(customer, "delete");
      }
    });
  }

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
              maxW={"40px"}
            >
              No.
            </Table.ColumnHeader>
            <Table.ColumnHeader
              color={"black"}
              borderBottomColor={"gray.200"}
              px={4}
              fontWeight={"bold"}
              fontSize={"14px"}
              whiteSpace={"nowrap"}
            >
              Nama
            </Table.ColumnHeader>
            <Table.ColumnHeader
              color={"black"}
              borderBottomColor={"gray.200"}
              px={4}
              fontWeight={"bold"}
              fontSize={"14px"}
              whiteSpace={"nowrap"}
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
              borderBottomColor={"gray.200"}
            ></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {customersLoading ? (
            <TableSkeleton rows={5} cols={7} />
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
                  maxW={"40px"}
                >
                  {index + 1}
                </Table.Cell>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === customers.length ? "transparent" : "gray.200"
                  }
                  px={4}
                  whiteSpace={"normal"}
                  overflow={"hidden"}
                  wordBreak={"break-word"}
                >
                  {item.name}
                </Table.Cell>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === customers.length ? "transparent" : "gray.200"
                  }
                  px={4}
                  whiteSpace={"normal"}
                  wordBreak={"break-word"}
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
                  <Text
                    bgColor={
                      item.status === "active" ? "blue.400" : "orange.400"
                    }
                    color={"white"}
                    w={"fit"}
                    px={4}
                    py={"2px"}
                    rounded={"md"}
                  >
                    {item.status === "active" ? "Aktif" : "Tidak Aktif"}
                  </Text>
                </Table.Cell>
                <Table.Cell
                  borderBottomColor={
                    index + 1 === customers.length ? "transparent" : "gray.200"
                  }
                  px={4}
                  borderBottomEndRadius={
                    index + 1 === customers.length ? "xl" : "none"
                  }
                >
                  <Stack gap={1}>
                    <HStack gap={1}>
                      <CustomerFormModal
                        type="edit"
                        customer={item}
                        onSuccess={(newCustomer) =>
                          onSuccess?.(newCustomer, "edit")
                        }
                      />
                      <DeleteModal
                        title="Konfirmasi Hapus"
                        description="Anda yakin ingin menghapus data pelanggan tersebut?"
                        handleDelete={() => handleDelete(item)}
                        isPending={isPending}
                      />
                    </HStack>
                    <Button
                      variant={"outline"}
                      bg={"blue.50"}
                      borderColor={"blue.600"}
                      rounded={"lg"}
                      color={"blue.600"}
                      w={"full"}
                      size={"xs"}
                      onClick={() =>
                        navigate(`/pelanggan/${slugify(item.name)}`)
                      }
                      gap={0}
                      _hover={{ bg: "blue.600", color: "white" }}
                    >
                      Lihat Detail <Iconify icon="bx:chevron-right" />
                    </Button>
                  </Stack>
                </Table.Cell>
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
