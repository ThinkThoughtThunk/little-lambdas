type State = { products: Product[]; cart: ShoppingCart };

// Helper Types

type Product = { id: ProductId; name: String; price: Price };

type ShoppingCart = ProductInCart[];
type ProductInCart = [ProductId, Quantity];

type ProductId = number;
type Quantity = number;

type Cost = number;
type Currency = 'USD' | 'EUR' | 'GBP';
type Price = [Currency, Cost];
