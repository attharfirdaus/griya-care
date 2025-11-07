import { useEffect, useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import type { Ticket } from "~/types";
import { toaster } from "../ui/toaster";
import { supabase } from "~/supabase-client";
import FormModal from "../ui/modal";
import { Button, HStack, Stack } from "@chakra-ui/react";
import Iconify from "../ui/iconify";
import InputField, { TextAreaField } from "../ui/input-field";
import BaseSelect, { BaseCombobox } from "../ui/select";
import { ticketPriorityItems } from "~/seeder";

const TicketSchema = z.object({
  title: z.string().min(1, "Judul gangguan harus diisi"),
  description: z.string().min(1, "Deskripsi gangguan harus diisi"),
  priority: z.string().min(1, "Pilih prioritas gangguan"),
  assigned_to: z
    .string()
    .min(1, "Pilih agen NOC yang akan menyelesaikan gangguan"),
  customer_id: z.string().min(1, "Pilih pelanggan yang memiliki gangguan"),
});

type TicketForm = z.infer<typeof TicketSchema>;

type TicketModalProps = {
  onSuccess?: (ticket: Ticket, type: "add" | "edit") => void;
  type: "add" | "edit";
  ticket?: Ticket;
};

export default function TicketFormModal({
  onSuccess,
  type,
  ticket,
}: TicketModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [agents, setAgents] = useState<{ label: string; value: string }[]>([]);
  const [customers, setCustomers] = useState<
    { label: string; value: string }[]
  >([]);

  const methods = useForm<TicketForm>({
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      assigned_to: "",
      customer_id: "",
    },
  });

  useEffect(() => {
    async function fetchAgentsAndCustomers() {
      const { data: agentsData, error: agentsError } = await supabase
        .from("profiles")
        .select("id, name, role")
        .eq("role", "agent_noc");
      const { data: customersData, error: customerError } = await supabase
        .from("customers")
        .select("id, name")
        .order("name", { ascending: true });

      if (agentsError) {
        console.error("Gagal memuat data NOC:", agentsError);
        toaster.create({
          title: "Gagal Memuat Data NOC",
          description: agentsError.message,
          type: "error",
        });
        return;
      }
      if (customerError) {
        console.error("Gagal memuat data pelanggan:", customerError);
        toaster.create({
          title: "Gagal Memuat Data pelanggan",
          description: customerError.message,
          type: "error",
        });
        return;
      }

      setAgents(
        (agentsData ?? []).map((u) => ({
          label: u.name ?? "Tanpa nama",
          value: u.id,
        }))
      );
      setCustomers(
        (customersData ?? []).map((u) => ({
          label: u.name ?? "Tanpa nama",
          value: u.id,
        }))
      );
    }

    fetchAgentsAndCustomers();
  }, []);

  useEffect(() => {
    if (type === "edit" && ticket) {
      methods.reset({
        title: ticket.title ?? "",
        description: ticket.description ?? "",
        priority: ticket.priority ?? "",
        assigned_to: ticket.assigned_to ?? "",
      });
    }
  }, [type, ticket, methods]);

  async function handleSubmit(data: TicketForm) {
    const parsed = TicketSchema.safeParse(data);
    if (!parsed.success) {
      const message = parsed.error.issues[0].message ?? "Data tidak valid";
      toaster.create({
        title: "Validasi Gagal",
        description: message,
        type: "error",
        duration: 5000,
      });
      return;
    }

    startTransition(async () => {
      let response;

      if (type === "add") {
        response = await supabase
          .from("tickets")
          .insert({ ...parsed.data, status: "open" })
          .select()
          .single();
      } else if (type === "edit" && ticket?.id) {
        response = await supabase
          .from("tickets")
          .update(parsed.data)
          .eq("id", ticket.id)
          .select()
          .single();
      }

      const { data: savedData, error } = response ?? {};

      if (error) {
        toaster.create({
          title:
            type === "add" ? "Gagal Menambahkan Tiket" : "Gagal Mengubah Tiket",
          description: error.message,
          type: "error",
        });
      } else {
        toaster.create({
          title: "Berhasil",
          description:
            type === "add"
              ? "Tiket berhasil dibuat"
              : "Tiket berhasil diperbarui",
          type: "success",
        });
        onSuccess?.(savedData as Ticket, type);
        methods.reset();
        setIsOpen(false);
      }
    });
  }
  return (
    <FormModal
      title={type === "add" ? "Tambah Tiket" : "Ubah Tiket"}
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        type === "add" ? (
          <Button
            size={"xs"}
            variant={"solid"}
            borderRadius={"lg"}
            color={"white"}
            backgroundColor={"blue.500"}
            _hover={{ bg: "blue.400" }}
          >
            <Iconify icon="uil:plus" /> Tambah Tiket
          </Button>
        ) : (
          <Button
            variant={"outline"}
            bg={"green.50"}
            borderColor={"green.600"}
            rounded={"lg"}
            color={"green.600"}
            flex={1}
            size={"xs"}
            gap={1}
            _hover={{ bg: "green.600", color: "white" }}
          >
            Ubah <Iconify icon="tabler:edit" />
          </Button>
        )
      }
      actionTrigger={
        <Button
          rounded={"xl"}
          border={"1px solid black"}
          bg={"transparent"}
          color={"black"}
          _hover={{ bg: "gray.200" }}
        >
          Batalkan
        </Button>
      }
      saveButton={
        <Button
          type="submit"
          form="ticket-form"
          rounded={"xl"}
          bg={"blue.500"}
          color={"white"}
          _hover={{ bg: "blue.600" }}
          loading={isPending}
        >
          Simpan
        </Button>
      }
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          style={{ width: "100%" }}
          id="ticket-form"
        >
          <Stack gap={6} w={"full"}>
            <BaseCombobox
              name="customer_id"
              label="Nama Pelanggan"
              placeholder="Masukkan nama pelanggan yang mengalami gangguan"
              items={customers}
              size="md"
              isRequired
            />

            <InputField
              placeholder="Masukkan nama gangguan"
              name="title"
              label="Nama Gangguan"
              isRequired
            />
            <TextAreaField
              placeholder="Masukkan deskripsi gangguan"
              name="description"
              label="Deskripsi Gangguan"
              isRequired
            />
            <HStack w={"full"} gap={4}>
              <BaseSelect
                name="priority"
                label="Prioritas Tiket"
                placeholder="Pilih Prioritas Tiket"
                items={ticketPriorityItems}
                size="md"
                isRequired
              />
              <BaseSelect
                name="assigned_to"
                label="NOC yang Ditugaskan"
                placeholder="Masukkan NOC yang Ditugaskan"
                items={agents}
                size="md"
                isRequired
              />{" "}
            </HStack>
          </Stack>
        </form>
      </FormProvider>
    </FormModal>
  );
}
