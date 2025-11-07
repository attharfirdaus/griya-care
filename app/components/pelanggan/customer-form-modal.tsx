import { useEffect, useState, useTransition } from "react";
import FormModal from "../ui/modal";
import { Button, Stack } from "@chakra-ui/react";
import Iconify from "../ui/iconify";
import InputField, { TextAreaField } from "../ui/input-field";
import BaseSelect from "../ui/select";
import { packageItems } from "~/seeder";
import { z } from "zod";
import { toaster } from "../ui/toaster";
import { supabase } from "~/supabase-client";
import { FormProvider, useForm } from "react-hook-form";
import type { Customer } from "~/types";

const CustomerSchema = z.object({
  name: z.string().min(1, "Nama pelanggan harus diisi"),
  phone: z
    .string()
    .min(8, "Nomor telepon minimal 8 digit")
    .regex(/^[0-9]+$/, "Nomor telepon hanya boleh berisi angka"),
  email: z.string().email("Format email tidak valid"),
  address: z.string().min(5, "Alamat terlalu pendek"),
  service_package: z.string().min(1, "Pilih paket langganan pelanggan"),
});

type CustomerForm = z.infer<typeof CustomerSchema>;

type CustomerModalProps = {
  onSuccess?: (customer: Customer, type: "add" | "edit") => void;
  type: "add" | "edit";
  customer?: Customer;
};

export default function CustomerFormModal({
  onSuccess,
  type,
  customer,
}: CustomerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const methods = useForm<CustomerForm>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      service_package: "",
    },
  });

  useEffect(() => {
    if (type === "edit" && customer) {
      methods.reset({
        name: customer.name ?? "",
        phone: customer.phone ?? "",
        email: customer.email ?? "",
        address: customer.address ?? "",
        service_package: customer.service_package ?? "",
      });
    }
  }, [type, customer, methods]);

  async function handleSubmit(data: CustomerForm) {
    const parsed = CustomerSchema.safeParse(data);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Data tidak valid";
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
          .from("customers")
          .insert({ ...parsed.data, status: "active" })
          .select()
          .single();
      } else if (type === "edit" && customer?.id) {
        response = await supabase
          .from("customers")
          .update(parsed.data)
          .eq("id", customer.id)
          .select()
          .single();
      }

      const { data: savedData, error } = response ?? {};

      if (error) {
        toaster.create({
          title:
            type === "add"
              ? "Gagal Menambahkan Pelanggan"
              : "Gagal Mengubah Pelanggan",
          description: error.message,
          type: "error",
        });
      } else {
        toaster.create({
          title: "Berhasil",
          description:
            type === "add"
              ? "Pelanggan berhasil ditambahkan"
              : "Pelanggan berhasil diperbarui",
          type: "success",
        });
        onSuccess?.(savedData as Customer, type);
        methods.reset();
        setIsOpen(false);
      }
    });
  }

  return (
    <FormModal
      title={type === "add" ? "Tambah Pelanggan" : "Ubah Pelanggan"}
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
            _hover={{ bgColor: "blue.400" }}
          >
            <Iconify icon="uil:plus" /> Tambah Pelanggan
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
          _hover={{
            bg: "gray.200",
          }}
        >
          Batalkan
        </Button>
      }
      saveButton={
        <Button
          type="submit"
          form="customer-form"
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
          id="customer-form"
        >
          <Stack gap={6} w={"full"}>
            <InputField
              placeholder="Masukkan nama pelanggan"
              name="name"
              label="Nama Lengkap"
              isRequired
            />
            <InputField
              placeholder="Contoh: 085279391730"
              name="phone"
              label="Nomor Telepon"
              isRequired
            />
            <InputField
              placeholder="Contoh: example@gmail.com"
              name="email"
              label="Email Pelanggan"
              type="email"
              isRequired
            />
            <TextAreaField
              placeholder="Masukkan alamat pelanggan"
              name="address"
              label="Alamat Pelanggan"
              isRequired
            />
            <BaseSelect
              name="service_package"
              label="Paket Langganan"
              placeholder="Pilih Paket Langganan"
              items={packageItems}
              size="md"
              isRequired
            />
          </Stack>
        </form>
      </FormProvider>
    </FormModal>
  );
}
