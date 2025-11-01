import { Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CustomerActionBar from "~/components/pelanggan/customer-action-bar";
import CustomerTable from "~/components/pelanggan/customer-table";
import { useAuthStore } from "~/store/auth-store";
import { supabase } from "~/supabase-client";
import type { Customer } from "~/types";

export default function Pelanggan() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersLoading, setCustomersLoading] = useState(false);

  useEffect(() => {
    async function fetchCustomers() {
      setCustomersLoading(true);
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal memuat pelanggan:", error);
      } else {
        setCustomers(data ?? []);
      }

      setCustomersLoading(false);
    }

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Stack gap={2} w={"full"}>
      <CustomerActionBar
        onCustomerAdded={(newCustomer) =>
          setCustomers((prev) => [newCustomer, ...prev])
        }
      />
      <CustomerTable
        customers={customers}
        customersLoading={customersLoading}
      />
    </Stack>
  );
}
