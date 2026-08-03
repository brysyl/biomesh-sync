'use client';

import { useState } from 'react';

export default function BioMeshSyncPortal() {
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('ENGAGED');
  const [error, setError] = useState<string | null>(null);

  const handleInitializeNode = async (provider: string) => {
    setLoading(true);
    setError(null);
    setStatusText('SYNCING...');

    try {
      const response = await fetch('/api/auth/node', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Node handshake failed.');

      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else if (data.mockInitialized) {
        alert('Mock Sync Node successfully initialized! You can now fire test webhook payloads.');
        setLoading(false);
        setStatusText('ENGAGED (MOCK ACTIVE)');
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      setStatusText('FAULT');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-mono flex flex-col justify-between p-6 md:p-12">
      {/* Top Header Telemetry Bar */}
      <header className="max-w-6xl w-full mx-auto flex justify-between items-center border-b border-slate-800 pb-4 text-xs tracking-wider">
        <div className="text-slate-400">
          BIOMESH SYNC <span className="text-emerald-400">// PRIVATE ALPHA V1.0</span>
        </div>
        <div className="flex items-center gap-6">
          <div>LATENCY: <span className="text-emerald-400">16ms</span></div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-400">{statusText}</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-4xl w-full mx-auto text-center space-y-8 my-auto py-12">
        <div className="inline-block border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full uppercase tracking-widest">
          Zero-Latency Wearable Ingestion Engine
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Turn Real-Time Biometric Stress Into <span className="text-emerald-400">Autonomous Calendar Defense.</span>
        </h1>
        
        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-sans">
          BioMesh Sync connects your wearable telemetry directly to your schedule. When physiological load spikes, our edge engine automatically clears your calendar before burnout takes over.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 max-w-md mx-auto">
          <button
            onClick={() => handleInitializeNode('whoop')}
            disabled={loading}
            className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50"
          >
            {loading ? 'Engaging Node...' : 'Initialize Sync Node (Whoop)'}
          </button>
          
        
          <button
            onClick={() => handleInitializeNode('mock')}
            disabled={loading}
            className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold rounded-lg transition-all disabled:opacity-50"
          >
            Deploy Mock Node (Dev)
          </button>
        </div>

        {error && <p className="text-rose-400 text-sm">{error}</p>}
      </div>

<a href="/metrics" className="text-xs text-emerald-400 hover:underline">
  View Metrics →
</a>

<br>
</br>


<a href="/portal" className="text-xs text-emerald-400 hover:underline">
  Enter Syndicate Portal →
</a>

    


      {/* Footer Security Badge */}
      <footer className="max-w-6xl w-full mx-auto border-t border-slate-900 pt-6 text-xs text-slate-500 flex justify-between">
        <div>CRYPTOGRAPHIC INTEGRITY: HMAC-SHA256 Webhooks</div>
        <div>SECURE DIRECT-PORTAL ARCHITECTURE</div>
      </footer>
    </main>
  );
}
