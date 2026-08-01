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

  const [connectionData, setConnectionData] = useState<{
    webhookUrl?: string;
    userId?: string;
    secretToken?: string;
  } | null>(null);

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
    try {
      setTelemetryState((prev) => ({ ...prev, isLoading: true, status: 'PROVISIONING_NODE...' }));
      
      const response = await fetch('/api/auth/node', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'executive_alpha_01' }),
      });

      const data = await response.json();

      if (data.success) {
        setConnectionData({
          webhookUrl: data.webhookUrl,
          userId: data.userId,
          secretToken: data.secretToken,
        });
        setTelemetryState((prev) => ({ ...prev, isLoading: false, status: 'NODE_READY' }));
      } else {
        alert('Initialization failed: ' + (data.error || 'Unknown error'));
        setTelemetryState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (err) {
      console.error('Network dispatch failure:', err);
      alert('Failed to communicate with Vercel edge node.');
      setTelemetryState((prev) => ({ ...prev, isLoading: false }));
    }
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
            <span className="hidden sm:inline">INFRASTRUCTURE: <strong className="text-emerald-400">VERCEL EDGE</strong></span>
            <span>LATENCY: <strong className="text-emerald-400">{telemetryState.latencyMs}ms</strong></span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
              {telemetryState.autonomousShields}
            </span>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 mb-8 shadow-inner">
          <span className="text-emerald-400">●</span>
          <span>Zero-Licensing Edge Telemetry Engine</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Turn Real-Time Biometric Stress Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Autonomous Calendar Defense</span>.
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          BioMesh Sync connects your biometric stream directly to your schedule with zero subscription fees. Generate your secure ingestion endpoint below.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <button 
            onClick={handleInitializeSync}
            disabled={telemetryState.isLoading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 transition-all duration-200 shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
          >
            {telemetryState.isLoading ? 'Provisioning Node...' : 'Initialize Sync Node'}
          </button>
        </div>

        {connectionData && (
          <div className="max-w-2xl mx-auto p-6 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-left shadow-2xl backdrop-blur-md animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">Secure Node Provisioned</span>
              <span className="text-xs font-mono text-slate-400">User ID: {connectionData.userId}</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">DIRECT WEBHOOK URL (POST)</label>
                <input 
                  type="text" 
                  readOnly 
                  value={connectionData.webhookUrl} 
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 select-all"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">NODE SECRET TOKEN</label>
                <input 
                  type="text" 
                  readOnly 
                  value={connectionData.secretToken} 
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 select-all"
                />
              </div>
              <p className="text-xs text-slate-400 pt-2 leading-relaxed">
                Paste these credentials into any REST-capable mobile health exporter (e.g., Health Auto Export) or device script to stream biometric telemetry straight to your Supabase instance with zero intermediary costs.
              </p>
            </div>
          </div>
        )}
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
