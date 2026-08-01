// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

export default function BioMeshDashboard() {
  const [telemetryState, setTelemetryState] = useState({
    status: 'SECURE_SYNC_ACTIVE',
    latencyMs: 14,
    lastHeartRate: '68 BPM',
    hrvScore: '74 ms',
    autonomousShields: 'ENGAGED',
  });

  // Simulate live telemetry pulse for executive demo feel
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryState((prev) => ({
        ...prev,
        latencyMs: Math.floor(Math.random() * 6) + 11,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top System Bar */}
      <header className="border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-slate-400 uppercase">
              BioMesh Sync // Private Alpha v1.0
            </span>
          </div>
          <div className="flex items-center space-x-6 text-xs font-mono text-slate-400">
            <span className="hidden sm:inline">EDGE RUNTIME: <strong className="text-emerald-400">VERCEL GLOBAL</strong></span>
            <span>LATENCY: <strong className="text-emerald-400">{telemetryState.latencyMs}ms</strong></span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
              {telemetryState.autonomousShields}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 mb-8 shadow-inner">
          <span className="text-emerald-400">●</span>
          <span>Zero-Latency Wearable Ingestion Engine</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Turn Real-Time Biometric Stress Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Autonomous Calendar Defense</span>.
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-normal leading-relaxed">
          BioMesh Sync connects your wearable telemetry directly to your schedule. When physiological load spikes, our edge engine automatically clears your calendar before burnout takes over.
        </p>

        {/* Action Interface */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 transition-all duration-200 shadow-lg shadow-emerald-500/20">
            Initialize Sync Node
          </button>
          <a 
            href="#architecture" 
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-semibold hover:bg-slate-800 transition-all duration-200"
          >
            View System Specs
          </a>
        </div>
      </section>

      {/* Live Telemetry Grid */}
      <section id="architecture" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-xs font-mono text-slate-500 mb-2">CRYPTOGRAPHIC INTEGRITY</div>
            <div className="text-lg font-semibold text-white mb-1">HMAC-SHA256 Webhooks</div>
            <p className="text-sm text-slate-400">Incoming Terra API payloads verified instantly via the Web Crypto API on edge runtimes.</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-xs font-mono text-slate-500 mb-2">BIOMETRIC STREAM</div>
            <div className="text-lg font-semibold text-white mb-1">Active: {telemetryState.lastHeartRate} / {telemetryState.hrvScore}</div>
            <p className="text-sm text-slate-400">Continuous monitoring of autonomic nervous system activation thresholds.</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <div className="text-xs font-mono text-slate-500 mb-2">AUTONOMOUS ACTION</div>
            <div className="text-lg font-semibold text-white mb-1">Calendar Defense Protocol</div>
            <p className="text-sm text-slate-400">Immediate schedule blockading triggered upon sustained cortisol or sympathetic load detection.</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs font-mono text-slate-600">
        BIOMESH SYSTEMS INC. // SECURE EDGE PIPELINE v1.0
      </footer>
    </main>
  );
}
