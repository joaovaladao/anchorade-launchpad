import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Pencil, Trash2, LogOut, Package, X, Check, User as UserIcon } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  is_active: boolean;
  is_mobile_seller: boolean;
  available_quantity: number;
  created_at: string;
}

interface ProductForm {
  title: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  is_mobile_seller: boolean;
  available_quantity: string;
}

const emptyForm: ProductForm = {
  title: '',
  description: '',
  price: '',
  category: 'food',
  image_url: '',
  is_mobile_seller: false,
  available_quantity: '1',
};

const categories = [
  { value: 'food', label: 'Food & Drinks' },
  { value: 'fish', label: 'Fresh Seafood' },
  { value: 'crafts', label: 'Handmade & Crafts' },
  { value: 'nautical', label: 'Sailor Supplies' },
];

interface SellerDashboardProps {
  user: User;
  onSignOut: () => void;
  onProfileClick: () => void;
}

export default function SellerDashboard({ user, onSignOut, onProfileClick }: SellerDashboardProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchMyProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      title,
      description,
      price,
      category,
      image_url,
      is_active,
      is_mobile_seller,
      available_quantity,
      created_at
    `)
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError('');
  };

  const openEdit = (product: Product) => {
    setForm({
      title: product.title,
      description: product.description || '',
      price: product.price.toString(),
      category: product.category,
      image_url: product.image_url || '',
      is_mobile_seller: product.is_mobile_seller,
      available_quantity: product.available_quantity.toString(),
    });
    setEditingId(product.id);
    setShowForm(true);
    setError('');
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      setError('Product title is required');
      return;
    }
    const price = parseFloat(form.price);
    if (isNaN(price) || price < 0) {
      setError('Please enter a valid price');
      return;
    }
    const quantity = parseInt(form.available_quantity, 10);
    if (isNaN(quantity) || quantity < 0) {
      setError('Please enter a valid quantity');
      return;
    }

    setSaving(true);
    setError('');

    const productData = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      price,
      category: form.category,
      image_url: form.image_url.trim() || null,
      is_mobile_seller: form.is_mobile_seller,
      available_quantity: quantity,
      seller_id: user.id,
    };

    if (editingId) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingId);
      if (error) setError(error.message);
    } else {
      const { error } = await supabase
        .from('products')
        .insert(productData);
      if (error) setError(error.message);
    }

    setSaving(false);
    if (!error) {
      setShowForm(false);
      fetchMyProducts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) console.error('Delete error:', error);
    else fetchMyProducts();
  };

  const displayName = user.user_metadata?.full_name || user.email;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-sky-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onProfileClick}
                className="p-2 bg-gradient-to-br from-sky-600 to-sky-700 rounded-lg border border-sky-400/30 hover:from-sky-500 hover:to-sky-600 transition-all"
                title="My Account"
              >
                <UserIcon className="text-white" size={24} strokeWidth={1.5} />
              </button>
              <div>
                <h1 className="text-lg font-bold text-white">Seller Dashboard</h1>
                <p className="text-sky-300/70 text-xs">{displayName}</p>
              </div>
            </div>
            <button
              onClick={onSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 transition-smooth text-sm"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Package size={24} className="text-sky-300" />
              <h2 className="text-2xl font-bold text-white">My Products</h2>
              <span className="ml-2 px-2 py-0.5 bg-sky-500/20 text-sky-300 text-xs rounded-full">
                {products.length}
              </span>
            </div>
            <button
              onClick={openCreate}
              className="button-hover-glow flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold rounded-xl shadow-lg transition-smooth text-sm"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>

          {loading ? (
            <div className="text-sky-300 text-center py-20">Loading your products...</div>
          ) : products.length === 0 && !showForm ? (
            <div className="text-center py-20">
              <Package size={48} className="text-sky-500/30 mx-auto mb-4" />
              <p className="text-sky-200/70 text-lg mb-2">No products yet</p>
              <p className="text-sky-300/50 text-sm mb-6">Start by adding your first product to the marketplace</p>
              <button
                onClick={openCreate}
                className="button-hover-glow px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold rounded-xl shadow-lg transition-smooth"
              >
                Add Your First Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-800/50 rounded-2xl border border-sky-500/20 overflow-hidden hover:border-sky-400/40 transition-smooth group"
                >
                  {product.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white text-lg line-clamp-1">{product.title}</h3>
                      {!product.is_active && (
                        <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full">Inactive</span>
                      )}
                    </div>
                    <p className="text-sky-200/60 text-xs uppercase tracking-wider mb-2">
                      {categories.find(c => c.value === product.category)?.label || product.category}
                    </p>
                    {product.description && (
                      <p className="text-sky-100/70 text-sm mb-3 line-clamp-2">{product.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-sky-300">${product.price.toFixed(2)}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 transition-smooth"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-smooth"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => setShowForm(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-sky-500/20 shadow-2xl p-8 animate-scale-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingId ? 'Edit Product' : 'New Product'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-sky-200 transition-smooth"
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-sky-100 mb-2">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  maxLength={100}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white placeholder-sky-300/50 focus:outline-none focus:border-sky-400/60 transition-smooth"
                  placeholder="Product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-100 mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  maxLength={500}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white placeholder-sky-300/50 focus:outline-none focus:border-sky-400/60 transition-smooth resize-none"
                  placeholder="Describe your product"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sky-100 mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-100 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.available_quantity}
                    onChange={(e) =>
                      setForm({ ...form, available_quantity: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-100 mb-2">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

{/* 
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sky-100 mb-2">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white placeholder-sky-300/50 focus:outline-none focus:border-sky-400/60 transition-smooth"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sky-100 mb-2">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white focus:outline-none focus:border-sky-400/60 transition-smooth"
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div> */}

              <div>
                <label className="block text-sm font-medium text-sky-100 mb-2">Image URL</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white placeholder-sky-300/50 focus:outline-none focus:border-sky-400/60 transition-smooth"
                  placeholder="https://..."
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_mobile_seller}
                  onChange={(e) => setForm({ ...form, is_mobile_seller: e.target.checked })}
                  className="w-4 h-4 rounded border-sky-500/30 bg-slate-900/50 text-sky-500 focus:ring-sky-500/50"
                />
                <span className="text-sm text-sky-100">⛵ I'm a mobile seller (sailboat vendor)</span>
              </label>

              <button
                onClick={handleSave}
                disabled={saving}
                className="button-hover-glow w-full px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold rounded-xl shadow-lg transition-smooth flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Check size={18} />
                {saving ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
