export interface Product {
    _id: string; 
    title: string; 
    price: number;
    description: string; 
    condition: string; 
    category: string; 
    imageUrl: string; 
    seller: { _id: string; username: string }; 
}
