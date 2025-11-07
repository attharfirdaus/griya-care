export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  accessToken?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  service_package: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export type TicketPriority = "low" | "medium" | "high" | "critical";
export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export interface Ticket {
  id: string;
  ticket_number: string;
  customer_id: string;
  created_by: string;
  assigned_to?: string | null;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  created_at: string;
  updated_at: string;

  customer?: Customer;
  created_by_user?: User;
  assigned_to_user?: User | null;
  logs: TicketLog[];
}

export interface TicketLog {
  id: string;
  ticket_id: string;
  status_from?: TicketStatus | null;
  status_to: TicketStatus;
  changed_by: string;
  note?: string | null;
  created_at: string;

  ticket?: Ticket;
  changed_by_user?: User;
}
