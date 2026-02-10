import type { User } from '@supabase/supabase-js';

interface UserProfileProps {
  user: User;
  onSignOut: () => void;
}

export default function UserProfile({ user, onSignOut }: UserProfileProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-slate-900/70 border border-sky-800 rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-sky-300 mb-6">
          Your Profile
        </h1>

        <div className="space-y-4 text-sm">
          <div>
            <span className="text-sky-400">Email</span>
            <p>{user.email}</p>
          </div>

          <div>
            <span className="text-sky-400">User ID</span>
            <p className="break-all">{user.id}</p>
          </div>

          <div>
            <span className="text-sky-400">Account created</span>
            <p>{new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        <button
          onClick={onSignOut}
          className="mt-8 w-full rounded-xl bg-red-500/90 hover:bg-red-600 transition py-2"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}