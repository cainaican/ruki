interface InventoryStatus {
    label: string;
    value: string;
}
export interface IServerResponse {
    id?: string;
    code?: string;
    description?: string;
    quantity?: number;
    // inventoryStatus?: InventoryStatus;
    // inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}