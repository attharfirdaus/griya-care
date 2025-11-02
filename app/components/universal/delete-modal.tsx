import type { Customer } from "~/types";
import FormModal from "../ui/modal";
import { useState, useTransition } from "react";
import { Button, Text, VStack } from "@chakra-ui/react";
import Iconify from "../ui/iconify";

type DeleteModalProps = {
  title: string;
  description: string;
  isPending: boolean;
  handleDelete: () => void;
};

export default function DeleteModal({
  title,
  description,
  isPending,
  handleDelete,
}: DeleteModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormModal
      title={title}
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button
          variant={"outline"}
          bg={"red.50"}
          borderColor={"red.600"}
          rounded={"lg"}
          color={"red.600"}
          flex={1}
          size={"xs"}
          gap={1}
          _hover={{ bg: "red.600", color: "white" }}
        >
          Hapus <Iconify icon="bx:trash" />
        </Button>
      }
      actionTrigger={
        <Button
          rounded={"xl"}
          border={"1px solid black"}
          bg={"transparent"}
          color={"black"}
          _hover={{
            bg: "gray.200",
          }}
        >
          Batalkan
        </Button>
      }
      saveButton={
        <Button
          rounded={"xl"}
          bg={"red.500"}
          color={"white"}
          _hover={{ bg: "red.600" }}
          loading={isPending}
          onClick={() => handleDelete()}
        >
          Hapus
        </Button>
      }
    >
      <VStack align="center" gap={2}>
        <Iconify
          icon="uil:exclamation-circle"
          color="orange"
          boxSize="62px"
          mb={2}
        />
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="gray.800"
          textAlign="center"
        >
          {title}
        </Text>
        <Text fontSize="sm" color="gray.700" textAlign="center">
          {description}
        </Text>
      </VStack>
    </FormModal>
  );
}
