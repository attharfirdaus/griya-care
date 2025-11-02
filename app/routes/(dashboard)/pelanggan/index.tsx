import { Stack } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
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

  const fetchCustomers = useCallback(async () => {
  try {
    setCustomersLoading(true);

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Gagal memuat pelanggan:", error.message);
    } else {
      setCustomers(data ?? []);
    }
  } catch (err) {
    console.error("⚠️ Error tak terduga:", err);
  } finally {
    setCustomersLoading(false);
  }
}, []);


  function mutateCustomers(
    customer?: Customer,
    action?: "add" | "edit" | "delete"
  ) {
    if (!customer) {
      fetchCustomers();
      return;
    }

    setCustomers((prev) => {
      if (action === "add") {
        return [customer, ...prev];
      }
      if (action === "edit") {
        return prev.map((c) => (c.id === customer.id ? customer : c));
      }
      if (action === "delete") {
        return prev.filter((c) => c.id !== customer.id);
      }
      return prev;
    });
  }

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Stack gap={2} w={"full"}>
      <CustomerActionBar onSuccess={mutateCustomers} />
      <CustomerTable
        customers={customers}
        customersLoading={customersLoading}
        onSuccess={mutateCustomers}
      />
    </Stack>
  );
}
