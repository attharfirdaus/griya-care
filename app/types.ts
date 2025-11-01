export type Customer = {
    id: string,
    name: string,
    phone: string,
    email: string,
    address: string,
    service_package: string,
    status: 'active' | 'inactive',
    created_at: string,
    updated_at: string
}