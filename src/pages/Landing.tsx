import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  Wrench, AlertCircle, Loader2, ArrowRight, Eye, EyeOff, CheckCircle2, Shield, Clock, Menu, X, Zap, MapPin, Smartphone, ChevronRight
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS & CONTENT
// ═══════════════════════════════════════════════════════════════════════════════
const FEATURES = [
  {
    title: 'Location Activation',
    body: 'GPS automatically binds your exact location across Pangasinan for accurate navigation.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>)
  },
  {
    title: 'Vehicle Selection',
    body: 'Choose your vehicle type from Motorcycle, Tricycle, Car, or Van with a simple bottom sheet.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>)
  },
  {
    title: 'Mechanic Matching',
    body: 'View nearby verified mechanics with ratings, distance, and real-time ETA.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>)
  },
  {
    title: 'Live Tracking',
    body: "Track your mechanic's approach in real-time with minute-by-minute updates.",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M3 3v18h18"/><path d="M18 8L13 14l-3-3-5 5"/></svg>)
  },
  {
    title: 'GCash Payment',
    body: 'Pay securely via GCash, Credit/Debit Card, or Cash — whatever works for you.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>)
  },
  {
    title: 'Repair Shops',
    body: 'Search auto parts plus price and nearby filtering.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>)
  },
];

const STATS = [
  { num: '2,000', sup: '+', lbl: 'Verified Mechanics' },
  { num: '150k', sup: '+', lbl: 'Rescues Completed' },
  { num: '4.8', sup: '', lbl: 'Average Rating' },
  { num: '24/7', sup: '', lbl: 'Emergency Support' },
];

const TESTIMONIALS = [
  { quote: '"I broke down on the MacArthur Highway and had a mechanic in 12 minutes. The app made a stressful situation so much easier."', name: 'James R.', role: 'Motorcycle Rider · Urdaneta', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format&fit=crop', feat: false },
  { quote: '"AutoFix Finder cut our vehicle downtime by 40%. The real-time tracking and verified mechanics make fleet maintenance effortless."', name: 'Marcus C.', role: 'Fleet Manager · Dagupan', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80&auto=format&fit=crop', feat: true },
  { quote: '"Since joining as a mechanic, my customer base grew 3x. The platform handles scheduling and GCash payments seamlessly."', name: 'Rodel S.', role: 'Verified Mechanic · Lingayen', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop', feat: false },
];
const ROLE_PORTALS = [
  { role: 'Customer', surface: 'Mobile App', details: 'Location activation, request flow, live ETA tracking, and mechanic rating.' },
  { role: 'Mechanic', surface: 'Mobile App', details: 'Accept jobs, discuss costing, trigger online payment options, and update status.' },
  { role: 'User', surface: 'Web Portal', details: 'Login via website to view analytics and manage personal settings.' },
  { role: 'Admin', surface: 'Web Portal', details: 'Manage users, monitor activity, and enforce compliance across the platform.' },
  { role: 'Superadmin', surface: 'Web Portal', details: 'Global controls, governance, and analytics for all roles and services.' },
];

const FLOW_STEPS = [
  'Activate location and bind GPS for accurate routing.',
  'Continue to onboarding carousel with Get Started + Login.',
  'Customer sets vehicle type, issue part, and mobile number.',
  'Nearby mechanics appear with ratings and availability.',
  'Customer and mechanic agree on service pricing in request screen.',
  'Cash or online payment is completed, then customer submits 1-5 stars.',
];

// ═══════════════════════════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════
const StarIcon = () => (<svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>);
const CheckIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-[18px] h-[18px] flex-shrink-0 mt-0.5"><path d="M20 6L9 17l-5-5"/></svg>);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c3.11 0 5.71-1.03 7.61-2.77l-3.57-2.77c-1 .67-2.27 1.07-3.41 1.07-2.62 0-4.85-1.77-5.64-4.14H3.45v2.85C5.35 20.6 8.44 23 12 23z" fill="#34A853"/>
    <path d="M6.36 14.39c-.2-.59-.31-1.22-.31-1.87s.11-1.28.31-1.87V7.8H3.45C2.52 9.64 2 11.72 2 14c0 2.28.52 4.36 1.45 6.2l3.4-2.65c-.47-.56-.81-1.2-.95-1.86z" fill="#FBBC05"/>
    <path d="M12 5.38c1.69 0 3.21.58 4.41 1.72l3.3-3.3C17.71 2.04 15.11 1 12 1 8.44 1 5.35 3.4 3.45 6.2l3.4 2.65c.79-2.37 3.02-4.14 5.64-4.14z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const AppStoreBtn = () => (
  <button className="inline-flex items-center gap-2.5 px-5 h-[54px] rounded-2xl bg-[#0a0a0f] text-[#f7f6f3] hover:bg-[#1f1f28] hover:-translate-y-px transition-all">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
    <span className="flex flex-col text-left leading-tight"><small className="text-[10px] uppercase tracking-wider opacity-70 font-medium">Download on the</small><b className="text-[15px] font-bold tracking-tight">App Store</b></span>
  </button>
);

const PlayStoreBtn = () => (
  <button className="inline-flex items-center gap-2.5 px-5 h-[54px] rounded-2xl bg-[#0a0a0f] text-[#f7f6f3] hover:bg-[#1f1f28] hover:-translate-y-px transition-all">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 01-.61-.92V2.734c0-.418.247-.787.61-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zM18.974 8.18l-2.302 2.302L8.273 1.846l8.701 5.043c.998.578 1 1.514 0 2.092l-1.998 1.157zM5.265 1.844L15.933 7.92 5.265 18.587 4.262 7.95l1.003-6.106z"/></svg>
    <span className="flex flex-col text-left leading-tight"><small className="text-[10px] uppercase tracking-wider opacity-70 font-medium">Get it on</small><b className="text-[15px] font-bold tracking-tight">Google Play</b></span>
  </button>
);

const Logo = () => (
  <a href="#" className="font-extrabold text-[20px] tracking-tight flex items-center gap-2.5">
    <span className="w-[30px] h-[30px] rounded-[9px] bg-[#0a0a0f] grid place-items-center text-[#f7f6f3]">
      <Wrench className="w-4 h-4" />
    </span>
    AutoFix Finder
  </a>
);

// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN POPOVER
// ═══════════════════════════════════════════════════════════════════════════════
interface LoginPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}

const LoginPopover: React.FC<LoginPopoverProps> = ({ isOpen, onClose, anchorRef }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const { login, signup, loginWithGoogle, loginWithFacebook } = useAuthStore();
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node) && anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose, anchorRef]);

  const handleLoginSuccess = () => {
    setIsSuccess(true);
    const role = useAuthStore.getState().user?.role;
    setTimeout(() => {
      onClose();
      if (role === 'mechanic') navigate('/mechanic-dashboard');
      else if (role === 'repairshop') navigate('/repairshop/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'superadmin') navigate('/superadmin/dashboard');
      else navigate('/');
    }, 800);
  };

  const handleSocialLogin = async (method: 'google' | 'facebook') => {
    setError('');
    setIsLoading(true);
    try {
      if (method === 'google') await loginWithGoogle();
      else await loginWithFacebook();
      handleLoginSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : `${method} login failed`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
        handleLoginSuccess();
      } else {
        await signup(email, password, name);
        handleLoginSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - Mobile Only */}
      <div className="fixed inset-0 bg-[#0a0a0f]/40 z-[9998] backdrop-blur-sm animate-ma-fade lg:hidden" onClick={onClose} />

      {/* Popover/Modal Container */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 lg:p-0 pointer-events-none lg:absolute lg:inset-auto lg:top-[calc(100%+16px)] lg:right-0">
        <div
          ref={popoverRef}
          className="relative w-full max-w-[400px] lg:w-[420px] lg:max-w-none bg-white rounded-[28px] shadow-[0_24px_70px_-12px_rgba(0,0,0,0.15)] border border-[#0a0a0f]/[0.06] animate-popover-in pointer-events-auto overflow-hidden flex flex-col max-h-[calc(100dvh-100px)] lg:max-h-[600px]"
        >
          <div className="relative bg-white overflow-y-auto flex-1 custom-scrollbar">
            {isSuccess ? (
              <div className="p-8 lg:p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-gray-900 font-bold text-2xl mb-2">{mode === 'login' ? 'Welcome back!' : 'Account created!'}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{mode === 'login' ? 'Redirecting to your personalized dashboard...' : 'Success! You can now log in with your new account.'}</p>
                <div className="mt-8 flex justify-center">
                  <Loader2 className="w-6 h-6 text-black animate-spin" />
                </div>
              </div>
            ) : (
              <>
                <div className="px-8 lg:px-9 pt-10 pb-7 text-left">
                  <h3 className="text-[#0a0a0f] font-bg font-bold text-[32px] leading-tight tracking-tight">{mode === 'login' ? 'Sign in to AutoFix' : 'Join AutoFix'}</h3>
                  <p className="text-[#0a0a0f]/50 text-[15px] mt-2 font-medium">{mode === 'login' ? 'Access your roadside assistance hub' : 'Create an account to get started'}</p>
                </div>

                {error && (
                  <div className="mx-8 lg:mx-9 mb-6 flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-100">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700 font-semibold leading-snug">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="px-8 lg:px-9 space-y-5">
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-[11px] font-extrabold text-[#0a0a0f]/40 uppercase tracking-[0.18em] mb-2.5 ml-1">Full Name</label>
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full px-6 py-4.5 bg-[#f7f6f3]/80 border border-transparent rounded-[20px] text-sm text-[#0a0a0f] placeholder:text-[#0a0a0f]/20 focus:outline-none focus:bg-white focus:border-[#0a0a0f]/10 focus:ring-4 focus:ring-[#0a0a0f]/5 transition-all"
                        placeholder="Juan dela Cruz" disabled={isLoading} />
                    </div>
                  )}
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#0a0a0f]/40 uppercase tracking-[0.18em] mb-2.5 ml-1">Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4.5 bg-[#f7f6f3]/80 border border-transparent rounded-[20px] text-sm text-[#0a0a0f] placeholder:text-[#0a0a0f]/20 focus:outline-none focus:bg-white focus:border-[#0a0a0f]/10 focus:ring-4 focus:ring-[#0a0a0f]/5 transition-all"
                      placeholder="you@email.com" disabled={isLoading} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-[#0a0a0f]/40 uppercase tracking-[0.18em] mb-2.5 ml-1">Password</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-6 py-4.5 bg-[#f7f6f3]/80 border border-transparent rounded-[20px] text-sm text-[#0a0a0f] placeholder:text-[#0a0a0f]/20 focus:outline-none focus:bg-white focus:border-[#0a0a0f]/10 focus:ring-4 focus:ring-[#0a0a0f]/5 transition-all"
                        placeholder="••••••••" disabled={isLoading} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#0a0a0f]/20 hover:text-[#0a0a0f] transition-colors">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading}
                    className="w-full bg-[#0a0a0f] hover:bg-[#1a1a24] disabled:opacity-40 text-white font-bold py-4 rounded-full transition-all shadow-lg shadow-black/5 flex items-center justify-center gap-2 text-[15px] active:scale-[0.98] mt-2">
                    {isLoading ? (<><Loader2 className="w-4 h-4 animate-spin" />{mode === 'login' ? 'Signing in...' : 'Creating...'}</>) : (<>{mode === 'login' ? 'Sign In' : 'Create Account'}<ArrowRight className="w-4 h-4" /></>)}
                  </button>
                </form>

                <div className="px-8 lg:px-9 py-8">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#0a0a0f]/[0.06]"></div></div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#0a0a0f]/20">
                      <span className="bg-white px-4">Or continue with</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => handleSocialLogin('google')} disabled={isLoading}
                      className="flex items-center justify-center gap-2.5 px-4 py-3 border border-[#0a0a0f]/[0.06] rounded-full hover:bg-[#f7f6f3] transition-all font-bold text-sm text-[#0a0a0f] bg-white shadow-sm active:scale-[0.98]">
                      <GoogleIcon /> Google
                    </button>
                    <button type="button" onClick={() => handleSocialLogin('facebook')} disabled={isLoading}
                      className="flex items-center justify-center gap-2.5 px-4 py-3 border border-[#0a0a0f]/[0.06] rounded-full hover:bg-[#f7f6f3] transition-all font-bold text-sm text-[#0a0a0f] bg-white shadow-sm active:scale-[0.98]">
                      <FacebookIcon /> Facebook
                    </button>
                  </div>
                </div>

                <div className="px-8 lg:px-10 pb-10 pt-4 text-center">
                  <p className="text-[13px] text-[#0a0a0f]/40 font-medium">
                    {mode === 'login' ? (
                      <>Don't have an account? <button type="button" onClick={() => setMode('signup')} className="text-[#0a0a0f] font-bold hover:underline">Sign up</button></>
                    ) : (
                      <>Already have an account? <button type="button" onClick={() => setMode('login')} className="text-[#0a0a0f] font-bold hover:underline">Log in</button></>
                    )}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN LANDING COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export const Landing: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const loginBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.ma-stack-card, [data-reveal]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="w-full bg-[#f7f6f3] text-[#0a0a0f] font-sans" style={{ fontFamily: "'Inter',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&display=swap');
        .font-bg { font-family: 'Bricolage Grotesque','Inter',sans-serif; font-variation-settings: "opsz" 96; }
        @keyframes ma-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes ma-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ma-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes ma-pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.6); opacity: .4; } }
        [data-reveal] { opacity: 0; transform: translateY(36px); transition: opacity .8s cubic-bezier(.25,1,.4,1), transform .8s cubic-bezier(.25,1,.4,1); }
        [data-reveal].in-view { opacity: 1; transform: translateY(0); }
        .ma-stack-card { opacity: 0; transition: opacity .9s ease; }
        .ma-stack-card.in-view { opacity: 1; }
        .ma-stack-card .ma-bar { transform-origin: center bottom; transform-box: fill-box; transform: scaleY(0); }
        .ma-stack-card.in-view .ma-bar { animation: ma-grow .85s cubic-bezier(.2,.85,.3,1) var(--d,0s) forwards; }
        .ma-stack-card .ma-fade { opacity: 0; }
        .ma-stack-card.in-view .ma-fade { animation: ma-fade .7s ease var(--d,.4s) forwards; }
        .ma-stack-card .ma-row { opacity: 0; }
        .ma-stack-card.in-view .ma-row { animation: ma-fade .55s ease var(--d,0s) forwards; }
        .ma-pulse-dot { transform-origin: center; transform-box: fill-box; animation: ma-pulse 2s ease-in-out infinite; }
        .ma-float-1 { animation: ma-float 5s ease-in-out infinite; }
        .ma-float-2 { animation: ma-float 5.5s ease-in-out -2s infinite; }
        .ma-float-3 { animation: ma-float 7s ease-in-out infinite; }
        @keyframes popover-in { from { opacity: 0; transform: translateY(-8px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-popover-in { animation: popover-in 0.2s ease-out forwards; transform-origin: top right; }
        body.ma-drawer-locked { overflow: hidden; }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-4 z-50 mx-4">
        <div className="max-w-[1320px] mx-auto px-6 h-16 flex items-center justify-between gap-4 bg-white border border-[#0a0a0f]/10 rounded-full shadow-[0_8px_24px_-8px_rgba(10,10,15,0.08)]">
          <Logo />
          <div className="hidden lg:flex gap-7 text-sm font-medium">
            {['Features','How it works','Pricing','Stories'].map(x => (
              <a key={x} href={`#${x.toLowerCase().replace(/\s+/g, '-')}`} className="hover:opacity-60 transition-opacity">{x}</a>
            ))}
          </div>
          <div className="flex items-center gap-2 relative">
            <button ref={loginBtnRef} onClick={() => setIsLoginOpen(!isLoginOpen)} className="hidden lg:inline-flex items-center justify-center px-5 h-[42px] rounded-full text-sm font-semibold border border-[#0a0a0f]/15 hover:border-[#0a0a0f] transition-all">Sign in</button>
            <button className="hidden lg:inline-flex items-center justify-center gap-2 px-5 h-[42px] rounded-full text-sm font-semibold bg-[#0a0a0f] text-[#f7f6f3] hover:bg-[#1f1f28] hover:-translate-y-px transition-all">Download App</button>
            <button onClick={() => setDrawerOpen(true)} className="lg:hidden w-[42px] h-[42px] inline-flex items-center justify-center rounded-full border border-[#0a0a0f]/15 hover:bg-[#0a0a0f]/[0.05] transition-all" aria-label="Menu"><Menu className="w-5 h-5"/></button>
            <LoginPopover isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} anchorRef={loginBtnRef} />
          </div>
        </div>
      </nav>

      {/* Drawer */}
      <div className={`fixed inset-0 z-[100] ${drawerOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}>
        <div onClick={() => setDrawerOpen(false)} className={`absolute inset-0 bg-[#0a0a0f]/55 transition-opacity duration-[250ms] ${drawerOpen ? 'opacity-100' : 'opacity-0'}`} />
        <aside role="dialog" aria-modal="true" className={`absolute top-0 right-0 h-full w-[min(86vw,360px)] bg-[#f7f6f3] flex flex-col overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-5 border-b border-[#0a0a0f]/[0.08]">
            <Logo />
            <button onClick={() => setDrawerOpen(false)} className="w-10 h-10 rounded-full grid place-items-center hover:bg-[#0a0a0f]/[0.06]" aria-label="Close"><X className="w-5 h-5"/></button>
          </div>
          <nav className="flex flex-col p-3 flex-1">
            {['Features','How it works','Pricing','Stories'].map(x => (
              <a key={x} href={`#${x.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setDrawerOpen(false)} className="px-4 py-3.5 rounded-lg text-base font-semibold flex items-center justify-between hover:bg-[#0a0a0f]/[0.05]">{x}<ChevronRight className="w-4 h-4 opacity-50"/></a>
            ))}
            <button onClick={() => { setDrawerOpen(false); setIsLoginOpen(true); }} className="mx-4 mt-4 h-[42px] rounded-full text-sm font-semibold border border-[#0a0a0f]/15">Sign in</button>
          </nav>
          <div className="p-5 border-t border-[#0a0a0f]/[0.08] flex flex-col gap-2">
            <button className="w-full h-[42px] rounded-full text-sm font-semibold bg-[#0a0a0f] text-[#f7f6f3]">Download App</button>
          </div>
        </aside>
      </div>

      {/* Hero Section */}
      <section className="py-20 lg:py-24 relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-8 lg:px-14">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 bg-white border border-[#0a0a0f]/[0.08] rounded-full text-[13px] font-semibold mb-7 shadow-[0_4px_10px_-4px_rgba(10,10,15,0.05)]"><span className="px-2.5 py-0.5 bg-[#0a0a0f] text-[#a3e635] rounded-full text-[11px] tracking-wider font-bg font-bold">2.0</span> 24/7 Roadside Assistance in Pangasinan</span>
              <h1 className="font-bg font-bold leading-none tracking-[-3px] mb-6 text-[clamp(48px,6.5vw,82px)]">Your roadside <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[6%] after:h-[0.18em] after:bg-[#a3e635] after:-z-10">Hero.</span></h1>
              <p className="text-[19px] leading-relaxed text-[#0a0a0f]/65 mb-8 max-w-[520px]">AutoFix Finder connects you to verified mechanics in minutes. Whether it's a flat tire, engine trouble, or parts delivery, we've got you covered.</p>
              <div className="flex gap-3 flex-wrap items-center mb-9">
                <AppStoreBtn />
                <PlayStoreBtn />
              </div>
              <div className="flex items-center gap-6 flex-wrap text-[13px] text-[#0a0a0f]/60">
                <div className="flex items-center gap-2"><div className="flex gap-px text-amber-500">{Array(5).fill(0).map((_,i)=>(<StarIcon key={i} />))}</div><span><b className="text-[#0a0a0f] font-bold">4.8</b> Average user rating in Pangasinan</span></div>
                <div className="w-px h-4 bg-[#0a0a0f]/15" />
                <div>Trusted by 150k+ Drivers</div>
              </div>
            </div>
            <div className="relative h-[680px] flex items-center justify-center">
              <div className="absolute w-[520px] h-[520px] rounded-full -top-24 -right-24 -z-10" style={{ background: 'radial-gradient(circle,rgba(163,230,53,.45) 0%,rgba(163,230,53,0) 70%)', filter: 'blur(40px)' }} />

              <div className="ma-float-1 absolute top-[60px] right-[8%] z-[5] bg-white border border-[#0a0a0f]/[0.08] rounded-2xl px-4 py-3.5 shadow-[0_16px_40px_-16px_rgba(10,10,15,0.15)] flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-[10px] bg-[#a3e635] text-[#0a0a0f] grid place-items-center"><Shield className="w-5 h-5" /></div>
                <div><b className="font-bg text-[15px] font-bold block tracking-tight">Mechanic Arrived</b><span className="text-[11px] text-[#0a0a0f]/55 font-medium">8 mins ETA</span></div>
              </div>
              <div className="ma-float-2 absolute bottom-20 left-0 z-[5] bg-white border border-[#0a0a0f]/[0.08] rounded-2xl px-4 py-3.5 shadow-[0_16px_40px_-16px_rgba(10,10,15,0.15)] flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-[10px] bg-[#0a0a0f] text-white grid place-items-center"><Wrench className="w-5 h-5" /></div>
                <div><b className="font-bg text-[15px] font-bold block tracking-tight">₱850</b><span className="text-[11px] text-[#0a0a0f]/55 font-medium">Estimated Repair Cost</span></div>
              </div>

              {/* Phone mockup */}
              <div className="ma-float-3 w-[300px] aspect-[9/19.5] bg-[#0a0a0f] rounded-[42px] p-2 shadow-[0_40px_80px_-20px_rgba(10,10,15,0.3)] relative">
                <div className="w-full h-full rounded-[36px] overflow-hidden relative flex flex-col" style={{ background: 'linear-gradient(180deg,#1a1a24 0%,#0a0a0f 100%)' }}>
                  <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[100px] h-6 bg-[#0a0a0f] rounded-2xl z-10" />
                  <div className="px-7 pt-12 flex flex-col gap-4 text-[#f7f6f3]">
                    <div className="font-bg text-2xl font-bold tracking-tight leading-tight"><small className="block font-sans text-[11px] font-medium text-[#f7f6f3]/55 uppercase tracking-wider mb-1.5">Urdaneta City</small>Emergency Rescue</div>
                    <div className="rounded-[18px] p-4 bg-[#a3e635] text-[#0a0a0f]">
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-[#0a0a0f]/60 mb-1.5">Current Status</div>
                      <div className="font-bg text-[24px] font-extrabold tracking-tight leading-none">Mechanic En Route</div>
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold mt-2.5">
                        <Zap className="w-3.5 h-3.5" /> Rodel S. (4.9 Rating)
                      </div>
                    </div>
                    <div className="rounded-[18px] p-4 bg-white/[0.06] border border-white/[0.08]">
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-[#f7f6f3]/55 mb-1.5">Vehicle</div>
                      <div className="font-bg text-[20px] font-extrabold tracking-tight">Motorcycle (Tire)</div>
                    </div>
                  </div>
                  <div className="mt-auto flex justify-around py-5 px-4 bg-[#0a0a0f]/60 backdrop-blur border-t border-white/[0.06]">
                     <MapPin className="w-6 h-6 text-[#a3e635]" />
                     <Clock className="w-6 h-6 text-[#f7f6f3]/40" />
                     <Smartphone className="w-6 h-6 text-[#f7f6f3]/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-[1320px] mx-auto px-8 lg:px-14">
          <div className="text-center max-w-[760px] mx-auto mb-16">
            <div className="inline-block px-3.5 py-1.5 bg-[#a3e635] text-[#0a0a0f] font-bg text-[13px] font-bold uppercase tracking-wider rounded-full mb-5">Features</div>
            <h2 className="font-bg font-bold tracking-[-2px] leading-none text-[clamp(36px,5vw,64px)] mb-4.5">Built for Pangasinan roads.</h2>
            <p className="text-lg text-[#0a0a0f]/60 leading-relaxed">Six features that work in the background — everything you need to get back on the road.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} data-reveal className="bg-white border border-[#0a0a0f]/[0.06] rounded-[24px] p-8 hover:-translate-y-[3px] hover:shadow-[0_24px_50px_-20px_rgba(10,10,15,0.12)] transition-all">
                <div className="w-[54px] h-[54px] rounded-[14px] bg-[#0a0a0f] text-[#a3e635] grid place-items-center mb-6"><div className="w-6 h-6">{f.icon}</div></div>
                <h3 className="font-bg text-[22px] font-bold tracking-tight mb-2.5 leading-tight">{f.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#0a0a0f]/60">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Role Access + Full Flow */}
      <section className="py-24 bg-[#0a0a0f] text-[#f7f6f3] border-y border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-8 lg:px-14">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
            <div>
              <div className="inline-block px-3.5 py-1.5 bg-[#a3e635] text-[#0a0a0f] font-bg text-[13px] font-bold uppercase tracking-wider rounded-full mb-5">Role Access</div>
              <h2 className="font-bg font-bold tracking-[-2px] leading-none text-[clamp(34px,4.8vw,60px)] mb-4">One app flow, role-based destinations.</h2>
              <p className="text-[17px] text-[#f7f6f3]/70 leading-relaxed mb-6">
                Customer and Mechanic use mobile screens. Repair Shop, Admin, and Superadmin use the web portal to manage users and operations.
              </p>
              <div className="space-y-3 mb-8">
                {ROLE_PORTALS.map((item) => (
                  <div key={item.role} className="rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-bg text-xl font-bold tracking-tight">{item.role}</h3>
                      <span className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#a3e635]/15 text-[#a3e635] font-semibold">{item.surface}</span>
                    </div>
                    <p className="text-sm text-[#f7f6f3]/65 mt-2">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/[0.12] bg-white/[0.04] p-7">
              <h3 className="font-bg text-[28px] font-bold tracking-tight mb-2">Customer ? Mechanic Service Flow</h3>
              <p className="text-sm text-[#f7f6f3]/60 mb-5">From breakdown to payment and reputation update.</p>
              <div className="space-y-3">
                {FLOW_STEPS.map((step, idx) => (
                  <div key={step} className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-[#0a0a0f]/40 p-3.5">
                    <span className="w-7 h-7 rounded-lg bg-[#a3e635] text-[#0a0a0f] text-xs font-extrabold grid place-items-center shrink-0">{idx + 1}</span>
                    <p className="text-sm leading-relaxed text-[#f7f6f3]/80">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stacking Cards - How It Works */}
      <section id="how-it-works" className="py-24 relative">
        <div className="flex flex-col gap-8 max-w-[1320px] mx-auto px-4">
          <div className="ma-stack-card sticky top-6 bg-[#0a0a0f] text-[#f7f6f3] rounded-[32px] overflow-hidden p-12 lg:p-[72px] grid lg:grid-cols-2 gap-10 items-center shadow-[0_30px_80px_-30px_rgba(10,10,15,0.25)]">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bg text-xs font-bold uppercase tracking-wider mb-6 bg-[#a3e635]/15 text-[#a3e635]"><MapPin className="w-3 h-3"/> Location Activation</span>
              <h3 className="font-bg font-bold tracking-[-1.5px] leading-[1.05] mb-5 text-[clamp(32px,4vw,52px)]">Precision GPS for every provincial road.</h3>
              <p className="text-lg leading-relaxed mb-7 text-[#f7f6f3]/65">AutoFix Finder uses high-precision GPS to bind your location. GPS automatically binds your exact location across Pangasinan for accurate navigation.</p>
              <ul className="flex flex-col gap-3.5">
                <li className="flex items-start gap-3 text-[15px]"><CheckIcon />Automatic coordinate capture on app launch</li>
                <li className="flex items-start gap-3 text-[15px]"><CheckIcon />Works in low-signal areas with offline caching</li>
                <li className="flex items-start gap-3 text-[15px]"><CheckIcon />Real-time distance calculation for mechanics</li>
              </ul>
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-[#1a1a24]">
                <div className="w-full h-full p-8 flex flex-col justify-center items-center text-center">
                   <div className="relative mb-6">
                      <div className="w-24 h-24 bg-[#a3e635]/20 rounded-full animate-ping absolute" />
                      <div className="w-20 h-20 bg-[#a3e635] rounded-full flex items-center justify-center relative z-10"><MapPin className="w-10 h-10 text-black" /></div>
                   </div>
                   <h4 className="font-bg text-2xl font-bold mb-2">Location Bound</h4>
                   <p className="text-[#f7f6f3]/50">GPS automatically binds your location across Pangasinan.</p>
                </div>
            </div>
          </div>

          <div className="ma-stack-card sticky top-16 bg-[#a3e635] text-[#0a0a0f] rounded-[32px] overflow-hidden p-12 lg:p-[72px] grid lg:grid-cols-2 gap-10 items-center shadow-[0_30px_80px_-30px_rgba(10,10,15,0.25)]">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bg text-xs font-bold uppercase tracking-wider mb-6 bg-[#0a0a0f] text-white"><Wrench className="w-3 h-3"/> Mechanic Matching</span>
              <h3 className="font-bg font-bold tracking-[-1.5px] leading-[1.05] mb-5 text-[clamp(32px,4vw,52px)]">Connect with verified mechanics near you.</h3>
              <p className="text-lg leading-relaxed mb-7 text-[#0a0a0f]/70">View nearby verified mechanics with ratings, distance, and real-time ETA. We match you with specialists based on your needs.</p>
              <ul className="flex flex-col gap-3.5">
                <li className="flex items-start gap-3 text-[15px]"><CheckIcon />Browse profiles with verified ratings</li>
                <li className="flex items-start gap-3 text-[15px]"><CheckIcon />Specialists for Motorcycle, Tricycle, Car, and Van</li>
                <li className="flex items-start gap-3 text-[15px]"><CheckIcon />Live arrival tracking with ETA updates</li>
              </ul>
            </div>
            <div className="aspect-square rounded-3xl bg-black/5 flex flex-col p-6 gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                    <div className="w-12 h-12 rounded-full bg-gray-200" />
                    <div className="flex-1">
                       <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                       <div className="h-3 w-16 bg-gray-100 rounded" />
                    </div>
                    <div className="text-right">
                       <div className="font-bold text-gray-300">4.{9-i}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 text-center">
        <div className="max-w-[1320px] mx-auto px-8 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1100px] mx-auto">
            {STATS.map((s, i) => (
              <div key={i} data-reveal>
                <div className="font-bg font-bold tracking-[-3px] leading-none text-[clamp(48px,6vw,88px)]">{s.num}{s.sup && <small className="text-[0.5em] font-semibold text-[#0a0a0f]/40 ml-0.5">{s.sup}</small>}</div>
                <div className="text-sm text-[#0a0a0f]/55 mt-2.5 font-medium">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" className="py-24 bg-white border-t border-[#0a0a0f]/[0.06]">
        <div className="max-w-[1320px] mx-auto px-8 lg:px-14">
          <div className="text-center max-w-[760px] mx-auto mb-16">
            <div className="inline-block px-3.5 py-1.5 bg-[#a3e635] text-[#0a0a0f] font-bg text-[13px] font-bold uppercase tracking-wider rounded-full mb-5">Stories</div>
            <h2 className="font-bg font-bold tracking-[-2px] leading-none text-[clamp(36px,5vw,64px)]">Rescue stories from Pangasinan.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <article key={i} data-reveal className={`rounded-[20px] p-7 flex flex-col gap-3.5 border ${t.feat ? 'bg-[#0a0a0f] text-[#f7f6f3] border-[#0a0a0f]' : 'bg-[#f7f6f3] border-[#0a0a0f]/[0.06]'}`}>
                <div className="flex gap-px text-amber-500">{Array(5).fill(0).map((_,j)=>(<StarIcon key={j} />))}</div>
                <p className={`font-bg text-lg leading-snug flex-1 tracking-tight font-medium ${t.feat ? 'text-[#f7f6f3]' : 'text-[#0a0a0f]'}`}>{t.quote}</p>
                <div className={`flex items-center gap-3 pt-4 border-t ${t.feat ? 'border-[#f7f6f3]/10' : 'border-[#0a0a0f]/[0.08]'}`}>
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-[#0a0a0f]/10"><img src={t.img} alt="" className="w-full h-full object-cover" /></div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className={`text-xs ${t.feat ? 'text-[#f7f6f3]/55' : 'text-[#0a0a0f]/55'}`}>{t.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-8 lg:px-14">
          <div className="bg-[#a3e635] rounded-[32px] py-24 px-10 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-bg font-bold tracking-[-3px] leading-none mb-5 text-[clamp(40px,6vw,84px)]">Join AutoFix Finder today.</h2>
              <p className="text-[19px] text-[#0a0a0f]/65 mb-9 max-w-[560px] mx-auto leading-snug">Available across Pangasinan for iOS and Android. Free for customers, premium tools for mechanics.</p>
              <div className="inline-flex gap-3.5 flex-wrap justify-center">
                <AppStoreBtn />
                <PlayStoreBtn />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-8 bg-[#f7f6f3]">
        <div className="max-w-[1320px] mx-auto px-8 lg:px-14">
          <div className="grid md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] gap-12 mb-12">
            <div className="md:col-span-2 lg:col-span-1">
              <div className="mb-3.5"><Logo /></div>
              <p className="text-sm text-[#0a0a0f]/55 leading-loose max-w-[300px] mb-5">Roadside assistance for Pangasinan. Built for safety, speed, and transparency.</p>
            </div>
            {[
              { h: 'Product', items: ['Features','Pricing','Safety'] },
              { h: 'Company', items: ['About','Press','Contact'] },
              { h: 'Legal', items: ['Privacy','Terms'] },
            ].map(c => (
              <div key={c.h}>
                <h4 className="font-bg text-sm font-bold mb-4.5">{c.h}</h4>
                <ul className="flex flex-col gap-2.5 text-sm text-[#0a0a0f]/55">
                  {c.items.map(x => (<li key={x}><a href="#" className="hover:text-[#0a0a0f]">{x}</a></li>))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-8 border-t border-[#0a0a0f]/[0.08] text-[13px] text-[#0a0a0f]/45 flex-wrap gap-4">
            <span>© 2024 AutoFix Finder. Pangasinan, PH</span>
          </div>
        </div>
      </footer>
    </div>
  );
}


