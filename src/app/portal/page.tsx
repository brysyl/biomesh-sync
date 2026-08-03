'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Terminal, ArrowRight, CheckCircle2, Cpu, Lock, ArrowLeft, Database, Activity, Radio } from 'lucide-react';

export default function SyndicatePortalPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      const subject = encodeURIComponent(`[New Syndicate Lead] ${name}`);
      const body = encodeURIComponent(
        `New Syndicate Pipeline Submission\n\nEntity / Name: ${name}\nOperator Email: ${email}\nSource: biomesh.online/portal\nTimestamp: ${new Date().toISOString()}`
      );
      
      // Direct mailto trigger
      window.location.href = `mailto:Bright@biomesh.online?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white">BioMesh Sync</span>
              <span className="block text-xs text-slate-400 uppercase tracking-widest">White-Glove Syndicate Portal</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <span className="hidden md:inline text-xs font-mono text-emerald-400">MVP_STATUS: DEPLOYED</span>
            <Link href="/" className="text-sm text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Main</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero & MVP Specification Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono uppercase tracking-wider mb-6">
            <Lock className="w-3.5 h-3.5" />
            <span>Direct Client Routing &rarr; Bright@biomesh.online</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            MVP Architecture & Syndicate Pipeline
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            The BioMesh Sync Minimum Viable Product (MVP) delivers zero-latency edge execution, resilient local-first fallback mechanisms, and real-time biometric telemetry normalization.
          </p>
        </div>

        {/* MVP Core Technical Modules Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-sky-500/50 transition-all">
            <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">1-Node Lab Sandbox</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Localized edge-loop architecture simulating real-time object detection telemetry and high-frequency data flows offline.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-sky-500/50 transition-all">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Autonomous SQLite Failover</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Uninterrupted state execution and transaction logging during network interruptions with automated re-sync upon restoration.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-sky-500/50 transition-all">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 mb-4">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Biometric Normalization</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct telemetry ingestion bridging human physiological stress metrics with automated infrastructure load balancing.
            </p>
          </div>
        </div>

        {/* Portal Access Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Request Syndicate Authentication</h2>
            <p className="text-sm text-slate-400 mb-8">
              Submit your credentials below to initialize a direct mail client dispatch to <code className="text-sky-400">Bright@biomesh.online</code>.
            </p>

            {submitted ? (
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-white mb-1">Mail Client Initialized</h4>
                <p className="text-sm text-slate-300">
                  Your email client has opened with your credentials pre-filled to dispatch directly to <strong>Bright@biomesh.online</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Full Name / Entity</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Vance (Venture Partner)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Professional Operator Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@fund.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold px-6 py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center space-x-2 group cursor-pointer mt-2"
                >
                  <span>Dispatch to Bright@biomesh.online</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
            
            <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-slate-500">
              <span className="flex items-center space-x-1.5"><Shield className="w-3.5 h-3.5" /><span>Zero Backend Required</span></span>
              <span className="flex items-center space-x-1.5"><Radio className="w-3.5 h-3.5" /><span>Direct Client Protocol</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Biomesh.online &bull; All Rights Reserved &bull; <a href="https://biomesh.online/profile" className="text-sky-400 hover:underline">Lead Architect: Biomesh.online/Profile</a></p>
      </footer>
    </main>
  );
}
