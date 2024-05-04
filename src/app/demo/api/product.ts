interface InventoryStatus {
    label: string;
    value: string;
}
export interface Product {
    id?: string;
    code?: string;
    customerName?: string;
    description?: string;
    price?: number;
    quantity?: number;
    // inventoryStatus?: InventoryStatus;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}