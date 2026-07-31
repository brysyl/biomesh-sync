'use client';

import { useState } from 'react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [device, setDevice] = useState('oura');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API submission to Edge route
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Alpha Sandbox Reserved</h2>
          <p className="text-slate-400">
            Because BioMesh modifies your live schedule, we handle executive integration with absolute precision. 
          </p>
          <div className="bg-slate-800/50 p-4 rounded-lg text-sm text-slate-300 border border-slate-700/50">
            <p>Our concierge integration team will contact <strong>{email}</strong> within 24 hours to manually configure your {device.charAt(0).toUpperCase() + device.slice(1)} pipeline.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      <div className="max-w-5xl mx-auto px-6 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Copy & Value Prop */}
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Private Alpha V1.0</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1]">
            Turn Real-Time Biometric Stress Into Autonomous Calendar Defense.
          </h1>
          
          <p className="text-lg text-slate-400 leading-relaxed">
            BioMesh Sync connects your wearable directly to Google Calendar. When your physiological load spikes, our zero-latency edge engine automatically clears your schedule before burnout takes over.
          </p>

          <div className="space-y-4 pt-4">
            <FeatureRow title="Zero-Latency Edge Engine" desc="Sub-50ms biometric event processing via Vercel." />
            <FeatureRow title="Absolute Privacy" desc="Direct-to-database token isolation. Never sold." />
            <FeatureRow title="Frictionless Onboarding" desc="High-touch concierge setup for executives." />
          </div>
        </div>

        {/* Right Column: Lead Capture Card */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
          
          <h3 className="text-xl font-semibold mb-2">Connect Your Wearable</h3>
          <p className="text-sm text-slate-400 mb-8">Secure your spot in the free alpha rollout.</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Work Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                placeholder="founder@company.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Primary Telemetry Source</label>
              <select 
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none appearance-none"
              >
                <option value="oura">Oura Ring</option>
                <option value="apple">Apple Watch (HealthKit)</option>
                <option value="garmin">Garmin Connect</option>
                <option value="whoop">Whoop Strap</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 px-4 rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center"
            >
              {loading ? 'Initializing...' : 'Request Alpha Access'}
            </button>
          </form>

          {/* Interactive Mockup Preview */}
          <div className="mt-8 pt-8 border-t border-slate-800">
            <p className="text-xs text-slate-500 mb-4 uppercase tracking-wider font-semibold">Live Simulation</p>
            <div className="bg-slate-950 rounded-lg p-4 flex items-center justify-between border border-red-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <div className="text-sm">
                  <p className="text-slate-200 font-medium">HRV Drop Detected</p>
                  <p className="text-red-400 text-xs">Stress Index: 88/100</p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p className="text-emerald-400 font-medium line-through decoration-slate-500">Q3 Planning</p>
                <p className="text-slate-400 text-xs">Rescheduled</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

function FeatureRow({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex items-start space-x-3">
      <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      <div>
        <h4 className="text-slate-200 font-medium">{title}</h4>
        <p className="text-slate-500 text-sm">{desc}</p>
      </div>
    </div>
  );
}
