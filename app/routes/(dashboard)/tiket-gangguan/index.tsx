import { Stack, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TicketActionBar from "~/components/tiket-gangguan/tiket-gangguan-action-bar";
import TicketsTable from "~/components/tiket-gangguan/tiket-gangguan-table";
import { useAuthStore } from "~/store/auth-store";
import { supabase } from "~/supabase-client";
import type { Ticket } from "~/types";

export default function TiketGangguan() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(false);

  const fetchTickets = useCallback(async () => {
    try {
      setTicketsLoading(true);

      const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .order("create_at", { ascending: false });

      if (error) {
        console.error("Gagal memuat tiket:", error.message);
      } else {
        setTickets(data ?? []);
      }
    } catch (err) {
      console.error("Error tak terduga:", err);
    } finally {
      setTicketsLoading(false);
    }
  }, []);

  function mutateTickets(ticket?: Ticket, action?: "add" | "edit" | "delete") {
    if (!ticket) {
      fetchTickets();
      return;
    }

    setTickets((prev) => {
      if (action === "add") {
        return [ticket, ...prev];
      }
      if (action === "edit") {
        return prev.map((t) => (t.id === ticket.id ? ticket : t));
      }
      if (action === "delete") {
        return prev.filter((t) => t.id !== ticket.id);
      }
      return prev;
    });
  }

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Stack gap={2} w={"full"}>
      <TicketActionBar onSuccess={mutateTickets}/>
        <TicketsTable tickets={tickets} ticketsLoading={ticketsLoading}/>
    </Stack>
  )
}
