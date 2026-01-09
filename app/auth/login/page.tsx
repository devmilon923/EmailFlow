'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Logic: If user doesn't exist, create account; else log in.
    console.log('Authenticating:', { email, password });
    return router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6">
      {/* Background Aesthetic Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#F3EFE7] rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#E9E4DB] rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-105">
        {/* Branding */}
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 bg-[#E9E4DB] text-[#726D64] text-[10px] tracking-[0.2em] uppercase font-bold rounded-full mb-4">
            Platform Access
          </div>
          <h1 className="text-4xl font-serif italic text-[#433F39] tracking-tight">
            EmailFlow
          </h1>
          <p className="text-[#8C867A] mt-3 font-light">
            Simple bulk delivery with a human touch.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-[#E9E4DB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-4xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-[#726D64] mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FDFCFB] px-5 py-4 rounded-2xl border border-[#E9E4DB] text-[#433F39] placeholder-[#BAB3A9] focus:ring-1 focus:ring-[#C2BBAF] focus:border-[#C2BBAF] outline-none transition-all"
                placeholder="hello@example.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between mb-2 ml-1">
                <label className="text-xs uppercase tracking-widest font-bold text-[#726D64]">
                  Password
                </label>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FDFCFB] px-5 py-4 rounded-2xl border border-[#E9E4DB] text-[#433F39] placeholder-[#BAB3A9] focus:ring-1 focus:ring-[#C2BBAF] focus:border-[#C2BBAF] outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="w-full bg-[#433F39] hover:bg-[#2D2A26] text-[#FAF9F6] font-medium py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] mt-2"
            >
              Continue to Workspace
            </button>
          </form>

          {/* User Flow Notice */}
          <div className="mt-8 text-center">
            <p className="text-[13px] text-[#8C867A] leading-relaxed">
              New to the platform? Just enter your details—we'll{' '}
              <span className="text-[#433F39] font-semibold underline decoration-[#E9E4DB] underline-offset-4">
                auto-create
              </span>{' '}
              your account instantly.
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <button className="text-[#BAB3A9] hover:text-[#726D64] text-xs font-medium transition-colors">
            Terms of Service & Privacy
          </button>
        </div>
      </div>
    </div>
  );
}
