import { Product, Section } from '../types';

const allProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Mango Assortment',
    category: 'Food & Drinks',
    price: '$8.50',
    image: 'https://images.pexels.com/photos/262294/pexels-photo-262294.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Golden, ripe mangoes picked fresh this morning from our island orchard.',
    seller: 'Maria\'s Island Orchard',
    sellerType: 'island',
    badge: 'Fresh',
    section: 'fresh-islands'
  },
  {
    id: '2',
    name: 'Handwoven Basket',
    category: 'Handmade & Crafts',
    price: '$24.00',
    image: 'https://images.pexels.com/photos/3714895/pexels-photo-3714895.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Authentic woven basket made by local artisans using traditional techniques.',
    seller: 'Caribbean Crafts Co.',
    sellerType: 'island',
    badge: 'Local',
    section: 'fresh-islands'
  },
  {
    id: '3',
    name: 'Coconut Oil (1L)',
    category: 'Food & Drinks',
    price: '$12.00',
    image: 'https://images.pexels.com/photos/5938231/pexels-photo-5938231.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Cold-pressed virgin coconut oil from local palm plantations.',
    seller: 'Tropical Essentials',
    sellerType: 'island',
    badge: 'Organic',
    section: 'fresh-islands'
  },
  {
    id: '4',
    name: 'Fish Catch of the Day',
    category: 'Food & Drinks',
    price: '$16.50',
    image: 'https://images.pexels.com/photos/5737445/pexels-photo-5737445.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Fresh catch from this morning\'s fishing trip. Cleaned and ready to cook.',
    seller: 'Captain João\'s Catch',
    sellerType: 'sailboat',
    badge: 'Fresh',
    section: 'fresh-islands'
  },
  {
    id: '5',
    name: 'Lobster Tail (1pc)',
    category: 'Food & Drinks',
    price: '$22.00',
    image: 'https://images.pexels.com/photos/7974351/pexels-photo-7974351.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Premium lobster tail, sweet and succulent. Perfect for special meals.',
    seller: 'Deep Sea Divers Co.',
    sellerType: 'sailboat',
    badge: 'Fresh',
    section: 'food-drinks'
  },
  {
    id: '6',
    name: 'Dragon Fruit Box',
    category: 'Food & Drinks',
    price: '$14.99',
    image: 'https://images.pexels.com/photos/5632530/pexels-photo-5632530.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Vibrant pink dragon fruits, delicious and packed with vitamins.',
    seller: 'Island Harvest',
    sellerType: 'island',
    section: 'food-drinks'
  },
  {
    id: '7',
    name: 'Rum Selection Pack',
    category: 'Food & Drinks',
    price: '$35.00',
    image: 'https://images.pexels.com/photos/3407881/pexels-photo-3407881.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Three premium local rum varieties from the Caribbean islands.',
    seller: 'Rum Artisans Ltd.',
    sellerType: 'island',
    section: 'food-drinks'
  },
  {
    id: '8',
    name: 'Fresh Catch Bundle',
    category: 'Food & Drinks',
    price: '$28.50',
    image: 'https://images.pexels.com/photos/8169369/pexels-photo-8169369.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Assorted fresh fish, sea bass, snapper and grouper - caught today.',
    seller: 'Fisherman\'s Market',
    sellerType: 'sailboat',
    section: 'food-drinks'
  },
  {
    id: '9',
    name: 'Rope & Line Kit',
    category: 'Sailor Supplies',
    price: '$45.00',
    image: 'https://images.pexels.com/photos/3775857/pexels-photo-3775857.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Professional marine rope and fishing line. Weather-resistant and durable.',
    seller: 'Nautical Gear Hub',
    sellerType: 'sailboat',
    badge: 'New',
    section: 'sailor-supplies'
  },
  {
    id: '10',
    name: 'Marine Paint Set',
    category: 'Sailor Supplies',
    price: '$32.00',
    image: 'https://images.pexels.com/photos/1199122/pexels-photo-1199122.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'UV-resistant marine paint for boat maintenance and repairs.',
    seller: 'Sailors Supply Store',
    sellerType: 'island',
    section: 'sailor-supplies'
  },
  {
    id: '11',
    name: 'Compass Navigation Tool',
    category: 'Sailor Supplies',
    price: '$18.50',
    image: 'https://images.pexels.com/photos/261128/pexels-photo-261128.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Waterproof compass with luminous dial. Essential for navigation.',
    seller: 'Navigation Masters',
    sellerType: 'sailboat',
    section: 'sailor-supplies'
  },
  {
    id: '12',
    name: 'Fishing Tackle Set',
    category: 'Sailor Supplies',
    price: '$38.00',
    image: 'https://images.pexels.com/photos/4552622/pexels-photo-4552622.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Complete fishing tackle set with hooks, lures, and storage box.',
    seller: 'Fisherman\'s Paradise',
    sellerType: 'sailboat',
    section: 'sailor-supplies'
  },
  {
    id: '13',
    name: 'Woven Palm Hat',
    category: 'Handmade & Crafts',
    price: '$16.00',
    image: 'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Traditional woven palm hat, perfect for sun protection and style.',
    seller: 'Artisan Collective',
    sellerType: 'island',
    section: 'crafts'
  },
  {
    id: '14',
    name: 'Hand-carved Wood Figurine',
    category: 'Handmade & Crafts',
    price: '$28.00',
    image: 'https://images.pexels.com/photos/4555356/pexels-photo-4555356.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Beautiful hand-carved wooden figurine depicting local wildlife.',
    seller: 'Master Carvers Guild',
    sellerType: 'island',
    badge: 'Local',
    section: 'crafts'
  },
  {
    id: '15',
    name: 'Beaded Necklace Collection',
    category: 'Handmade & Crafts',
    price: '$20.00',
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Handmade beaded necklaces with colorful patterns inspired by Caribbean culture.',
    seller: 'Island Jewels',
    sellerType: 'island',
    section: 'crafts'
  },
  {
    id: '16',
    name: 'Woven Wall Tapestry',
    category: 'Handmade & Crafts',
    price: '$45.00',
    image: 'https://images.pexels.com/photos/5730175/pexels-photo-5730175.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Large woven tapestry with traditional island patterns. A statement piece.',
    seller: 'Caribbean Textiles',
    sellerType: 'island',
    section: 'crafts'
  },
  {
    id: '17',
    name: 'Local Spice Blend',
    category: 'Food & Drinks',
    price: '$9.50',
    image: 'https://images.pexels.com/photos/6765369/pexels-photo-6765369.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Homemade spice blend with tropical flavors - great for Caribbean dishes.',
    seller: 'Island Kitchen',
    sellerType: 'island',
    section: 'food-drinks'
  },
  {
    id: '18',
    name: 'Anchor Maintenance Kit',
    category: 'Sailor Supplies',
    price: '$52.00',
    image: 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Complete kit for anchor maintenance and rope care.',
    seller: 'Harbor Master Supply',
    sellerType: 'sailboat',
    badge: 'New',
    section: 'sailor-supplies'
  }
];

export const sections: Section[] = [
  {
    id: 'fresh-islands',
    title: 'Fresh from the Islands',
    description: 'Today\'s harvest and daily catches',
    products: allProducts.filter(p => p.section === 'fresh-islands')
  },
  {
    id: 'food-drinks',
    title: 'Food & Drinks',
    description: 'Culinary delights from local sellers',
    products: allProducts.filter(p => p.section === 'food-drinks' && !p.section.includes('fresh'))
  },
  {
    id: 'sailor-supplies',
    title: 'Sailor Supplies',
    description: 'Everything you need for the waves',
    products: allProducts.filter(p => p.section === 'sailor-supplies')
  },
  {
    id: 'crafts',
    title: 'Handmade & Local Crafts',
    description: 'Authentic artisan products',
    products: allProducts.filter(p => p.section === 'crafts')
  }
];

export const allGridProducts = allProducts;
