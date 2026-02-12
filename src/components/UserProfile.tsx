import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Mail, Calendar, User as UserIcon, Save, Anchor } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface UserProfileProps {
  user: User;
  onBack: () => void;
  onSignOut: () => void;
}

export default function UserProfile({ user, onBack, onSignOut }: UserProfileProps) {
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', user.id)
        .single();
      if (data?.full_name) setFullName(data.full_name);
    };
    fetchProfile();
  }, [user.id]);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName.trim() || null })
      .eq('user_id', user.id);

    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

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
                onClick={onBack}
                className="p-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="p-2 bg-gradient-to-br from-sky-600 to-sky-700 rounded-lg border border-sky-400/30">
                <Anchor className="text-white" size={24} strokeWidth={1.5} />
              </div>
              <h1 className="text-lg font-bold text-white">My Account</h1>
            </div>
            <button
              onClick={onSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all text-sm"
            >
              Sign out
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Avatar section */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center mb-4 shadow-lg shadow-sky-500/20">
              <UserIcon size={40} className="text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {fullName || user.user_metadata?.full_name || 'Sailor'}
            </h2>
            <p className="text-sky-300/70 text-sm mt-1">Account Details</p>
          </div>

          {/* Info cards */}
          <div className="space-y-4">
            {/* Full Name - editable */}
            <div className="bg-slate-800/50 rounded-2xl border border-sky-500/20 p-5">
              <label className="flex items-center gap-2 text-sky-400 text-sm font-medium mb-3">
                <UserIcon size={16} />
                Full Name
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-900/50 border border-sky-500/30 rounded-xl text-white placeholder-sky-300/50 focus:outline-none focus:border-sky-400/60 transition-all"
                  placeholder="Enter your name"
                />
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Save size={16} />
                  {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
                </button>
              </div>
            </div>

            {/* Email - read only */}
            <div className="bg-slate-800/50 rounded-2xl border border-sky-500/20 p-5">
              <div className="flex items-center gap-2 text-sky-400 text-sm font-medium mb-2">
                <Mail size={16} />
                Email Address
              </div>
              <p className="text-white text-lg">{user.email}</p>
            </div>

            {/* Account created */}
            <div className="bg-slate-800/50 rounded-2xl border border-sky-500/20 p-5">
              <div className="flex items-center gap-2 text-sky-400 text-sm font-medium mb-2">
                <Calendar size={16} />
                Member Since
              </div>
              <p className="text-white text-lg">
                {new Date(user.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            {/* User ID */}
            <div className="bg-slate-800/50 rounded-2xl border border-sky-500/20 p-5">
              <div className="text-sky-400 text-sm font-medium mb-2">User ID</div>
              <p className="text-sky-100/60 text-sm font-mono break-all">{user.id}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
