import { useState, useTransition } from "react";
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

type AddCustomerForm = z.infer<typeof CustomerSchema>;

type AddCustomerModalProps = {
  onCustomerAdded?: (newCustomer: Customer) => void;
};

export default function AddCustomerModal({
  onCustomerAdded,
}: AddCustomerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const methods = useForm<AddCustomerForm>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      service_package: "",
    },
  });

  async function handleSubmit(data: AddCustomerForm) {
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
      const { data: insertedData, error } = await supabase
        .from("customers")
        .insert({ ...parsed.data, status: "active" })
        .select()
        .single();

      if (error) {
        toaster.create({
          title: "Gagal Menambahkan Pelanggan",
          description: error.message,
          type: "error",
        });
      } else {
        toaster.create({
          title: "Berhasil",
          description: "Pelanggan Berhasil Ditambahkan",
          type: "success",
        });
        methods.reset();
        setIsOpen(false);

        onCustomerAdded?.(insertedData as Customer);
      }
    });
  }

  return (
    <FormModal
      title="Tambah Pelanggan"
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
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
          form="add-customer-form"
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
          id="add-customer-form"
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
              placeholder="Pilih paket Langganan"
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
