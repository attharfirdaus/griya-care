import { HStack, Input, InputGroup } from "@chakra-ui/react";
import type { Ticket } from "~/types";
import BaseSelect from "../ui/select";
import { ticketPriorityItemsWithAll, ticketStatusItems } from "~/seeder";
import Iconify from "../ui/iconify";
import TicketFormModal from "./tiket-gangguan-form-modal";

export default function TicketActionBar({
  onSuccess,
}: {
  onSuccess?: (ticket: Ticket, action: "add" | "edit") => void;
}) {
  return (
    <HStack justify={"space-between"} align={"center"} w={"full"}>
      <HStack gap={2} w={80}>
        <BaseSelect
          placeholder="Prioritas"
          items={ticketPriorityItemsWithAll}
          size="xs"
        />
        <BaseSelect placeholder="Status" items={ticketStatusItems} size="xs" />
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
            placeholder="Cari judul tiket"
            size={"xs"}
            w={"250px"}
            css={{ "--focus-color": "colors.blue.300" }}
          />
        </InputGroup>
        <TicketFormModal
          onSuccess={(newTicket) => onSuccess?.(newTicket, "add")}
          type="add"
        />
      </HStack>
    </HStack>
  );
}
