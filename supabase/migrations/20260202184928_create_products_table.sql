/*
  # Create Products Table for Anchorage Maritime Marketplace

  1. Purpose
    - Store product listings for the location-based maritime marketplace
    - Enable sellers (boat & island-based) to list items for discovery by nearby users
    - MVP scope: informational listings only (no orders/payments)

  2. New Tables
    - `products` - Main product listing table
      - `id` (uuid, primary key) - Unique product identifier
      - `seller_id` (uuid, FK to auth.users) - Product creator/seller
      - `title` (text) - Short product name
      - `description` (text) - Detailed product description
      - `category` (text) - Product category (food, fish, crafts, nautical, etc.)
      - `price` (numeric) - Informational price for negotiation
      - `currency` (text) - Currency code (USD, EUR, etc.)
      - `image_url` (text) - Main product image URL
      - `gallery` (text array) - Additional product images
      - `latitude` (numeric) - Seller's current latitude
      - `longitude` (numeric) - Seller's current longitude
      - `location_label` (text) - Human-readable location description
      - `is_active` (boolean) - Visibility flag for listings
      - `available_quantity` (integer) - Optional stock indicator
      - `is_mobile_seller` (boolean) - True for boats, false for fixed locations
      - `created_at` (timestamptz) - Listing creation timestamp
      - `updated_at` (timestamptz) - Last modification timestamp

  3. Indexes
    - seller_id - For querying products by specific seller
    - category - For category-based filtering
    - is_active - For active products queries
    - (latitude, longitude) - For spatial location queries
    - created_at - For sorting by newest listings

  4. Security
    - Enable RLS on products table
    - Policy: Anonymous users can view active products
    - Policy: Authenticated users can view all products (including their drafts)
    - Policy: Sellers can manage only their own products
    - Policy: Only authenticated users can create products

  5. Data Integrity
    - price must be positive (constraint)
    - seller_id required (FK to auth.users)
    - title required
    - category required
    - currency defaults to USD
    - is_active defaults to true
    - is_mobile_seller defaults to false
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  category text NOT NULL,
  price numeric(10, 2) NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  image_url text,
  gallery text[] DEFAULT ARRAY[]::text[],
  latitude numeric(10, 8) NOT NULL,
  longitude numeric(11, 8) NOT NULL,
  location_label text,
  is_active boolean DEFAULT true,
  available_quantity integer,
  is_mobile_seller boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT price_positive CHECK (price > 0)
);

CREATE INDEX idx_products_seller_id ON products(seller_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_location ON products(latitude, longitude);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active products"
  ON products FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users view all products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Sellers create products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers view own products"
  ON products FOR SELECT
  TO authenticated
  USING (auth.uid() = seller_id OR is_active = true);

CREATE POLICY "Sellers update own products"
  ON products FOR UPDATE
  TO authenticated
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers delete own products"
  ON products FOR DELETE
  TO authenticated
  USING (auth.uid() = seller_id);