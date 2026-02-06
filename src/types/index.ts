export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  seller: string;
  sellerType: 'sailboat' | 'island' | 'tourist';
  badge?: string;
  section: string;
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  products: Product[];
}
