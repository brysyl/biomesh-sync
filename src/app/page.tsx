// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

export default function BioMeshDashboard() {
  const [telemetryState, setTelemetryState] = useState({
    status: 'ZERO_COST_NODE_ACTIVE',
    latencyMs: 12,
    lastHeartRate: '68 BPM',
    hrvScore: '74 ms',
    autonomousShields: 'ENGAGED',
    isLoading: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryState((prev) => ({
        ...prev,
        latencyMs: Math.floor(Math.random() * 5) + 10,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInitializeSync = async () => {
    setTelemetryState((prev) => ({ ...prev, isLoading: true, status: 'INITIALIZING_LOCAL_NODE...' }));
    
    // Simulate secure token handshake for self-hosted architecture
    setTimeout(() => {
      alert('BioMesh Edge Node Initialized. Ready to ingest direct telemetry streams.');
      setTelemetryState((prev) => ({ ...prev, isLoading: false }));
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 font-sans antialiased">
      <header className="border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-slate-400 uppercase">
              BioMesh Sync // Zero-Cost Alpha v1.0
            </span>
          </div>
          <div className="flex items-center space-x-6 text-xs font-mono text-slate-400">
            <span className="hidden sm:inline">INFRASTRUCTURE: <strong className="text-emerald-400">SELF-HOSTED</strong></span>
            <span>LATENCY: <strong className="text-emerald-400">{telemetryState.latencyMs}ms</strong></span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
              {telemetryState.autonomousShields}
            </span>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 mb-8 shadow-inner">
          <span className="text-emerald-400">●</span>
          <span>Zero-Licensing Edge Telemetry Engine</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Turn Real-Time Biometric Stress Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Autonomous Calendar Defense</span>.
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-normal leading-relaxed">
          BioMesh Sync connects your biometric stream directly to your schedule with zero subscription fees. When load spikes, our edge engine clears your calendar automatically.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button 
            onClick={handleInitializeSync}
            disabled={telemetryState.isLoading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 transition-all duration-200 shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
          >
            {telemetryState.isLoading ? 'Configuring Node...' : 'Initialize Sync Node'}
          </button>
          <a 
            href="#architecture" 
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-semibold hover:bg-slate-800 transition-all duration-200"
          >
            View System Specs
          </a>
        </div>
      </section>

      <section id="architecture" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-xs font-mono text-slate-500 mb-2">ZERO LICENSING</div>
            <div className="text-lg font-semibold text-white mb-1">Direct Data Ingestion</div>
            <p className="text-sm text-slate-400">Bypasses commercial aggregator fees by utilizing direct device webhooks and native sync.</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-xs font-mono text-slate-500 mb-2">DATA SOVEREIGNTY</div>
            <div className="text-lg font-semibold text-white mb-1">Private Supabase Store</div>
            <p className="text-sm text-slate-400">All autonomic stress metrics and heart logs reside strictly inside your private cloud instance.</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-xs font-mono text-slate-500 mb-2">EDGE PERFORMANCE</div>
            <div className="text-lg font-semibold text-white mb-1">Sub-20ms Processing</div>
            <p className="text-sm text-slate-400">Next.js Edge runtime validates cryptographic signatures instantly before execution.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-900 py-8 text-center text-xs font-mono text-slate-600">
        BIOMESH SYSTEMS INC. // ZERO-COST SOVEREIGN PIPELINE v1.0
      </footer>
    </main>
  );
}
