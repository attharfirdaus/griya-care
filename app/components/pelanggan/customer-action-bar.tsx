import { Button, HStack, Input, InputGroup } from "@chakra-ui/react";
import BaseSelect from "../ui/select";
import { packageItemsWithAll, packageStatusItems } from "~/seeder";
import Iconify from "../ui/iconify";
import AddCustomerModal from "./add-customer-modal";
import type { Customer } from "~/types";

export default function CustomerActionBar({
  onCustomerAdded,
}: {
  onCustomerAdded?: (customer: Customer) => void;
}) {
  return (
    <HStack justify={"space-between"} align={"center"} w={"full"}>
      <HStack gap={2} w={80}>
        <BaseSelect
          placeholder="Paket Langganan"
          items={packageItemsWithAll}
          size="xs"
        />
        <BaseSelect
          placeholder="Status Langganan"
          items={packageStatusItems}
          size="xs"
        />
      </HStack>
      <HStack gap={2}>
        <InputGroup
          endElement={<Iconify icon="uil:search-alt" />}
          color={"black"}
          backgroundColor={"white"}
          borderRadius={"lg"}
        >
          <Input
            borderColor={"#E2E8F0"}
            borderWidth={"1.5px"}
            borderRadius={"lg"}
            placeholder="Cari nama pelanggan"
            size={"xs"}
            w={"250px"}
            css={{ "--focus-color": "colors.blue.300" }}
          />
        </InputGroup>
        <AddCustomerModal onCustomerAdded={onCustomerAdded} />
      </HStack>
    </HStack>
  );
}
