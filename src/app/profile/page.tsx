import React from 'react';
import Link from 'next/link';
import { Terminal, Mail, Phone, Linkedin, Cpu, Globe, Award, BookOpen, ArrowLeft, ShieldCheck, Database, Zap } from 'lucide-react';

export default function LeadArchitectProfile() {
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
              <span className="block text-xs text-slate-400 uppercase tracking-widest">Lead Architect Profile</span>
            </div>
          </div>
          <Link href="/" className="text-sm text-slate-400 hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Ecosystem</span>
          </Link>
        </div>
      </header>

      {/* Hero Profile Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Executive Profile</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                Bright Sylvester
              </h1>
              <p className="text-sky-400 font-mono text-sm md:text-base mb-4">
                Systems Architect &bull; Automation Expert
              </p>
              <p className="text-slate-300 text-base italic max-w-xl">
                &ldquo;Smarter networks, smarter future.&rdquo; Engineering zero-latency edge execution, autonomous pipeline intelligence, and resilient revenue operations infrastructure.
              </p>
            </div>

            <div className="flex flex-col space-y-3 bg-slate-950/80 border border-slate-800/80 p-5 rounded-2xl min-w-[260px]">
              <a href="mailto:Bright@Biomesh.online" className="flex items-center space-x-3 text-sm text-slate-300 hover:text-sky-400 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="truncate">Bright@Biomesh.online</span>
              </a>
              <a href="tel:+2348108108580" className="flex items-center space-x-3 text-sm text-slate-300 hover:text-sky-400 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+234 810 810 8580</span>
              </a>
              <a href="https://linkedin.com/in/Brysyl" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-sm text-slate-300 hover:text-sky-400 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span>LinkedIn.com/in/Brysyl</span>
              </a>
            </div>
          </div>
        </div>

        {/* Technical Architecture & Expertise */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative group hover:border-sky-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Systems Architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designing robust, scalable backend infrastructures, distributed data pipelines, and zero-latency edge environments.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative group hover:border-sky-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Automation Expert</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deploying autonomous workflows, complex n8n orchestrations, and event-driven microservices to eliminate operational friction.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative group hover:border-sky-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Revenue Operations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Integrating multi-channel data ingestion, client onboarding pipelines, and automated synchronization protocols.
            </p>
          </div>
        </div>

        {/* Professional Background & Education */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-6 h-6 text-sky-400" />
              <h2 className="text-xl font-bold text-white">Professional Experience</h2>
            </div>
            <ul className="space-y-6 text-sm">
              <li className="border-l-2 border-sky-500 pl-4">
                <span className="block font-semibold text-white">Lead Systems Architect &amp; Founder</span>
                <span className="block text-xs text-sky-400 mb-1">SparkleNET / BioMesh &bull; Present</span>
                <p className="text-slate-400 text-xs">Directing automated revenue operations, edge execution frameworks, and distributed system architectures.</p>
              </li>
              <li className="border-l-2 border-slate-700 pl-4">
                <span className="block font-semibold text-white">Senior Software &amp; Data Engineer</span>
                <span className="block text-xs text-slate-400 mb-1">Finny Integrated Services &amp; Toptal</span>
                <p className="text-slate-400 text-xs">Engineered high-performance backend pipelines, cloud database integrations, and scalable APIs.</p>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="w-6 h-6 text-sky-400" />
              <h2 className="text-xl font-bold text-white">Education &amp; Foundations</h2>
            </div>
            <ul className="space-y-6 text-sm">
              <li className="border-l-2 border-sky-500 pl-4">
                <span className="block font-semibold text-white">B.Sc. in Computer Science</span>
                <span className="block text-xs text-sky-400 mb-1">University of Port Harcourt</span>
                <p className="text-slate-400 text-xs">Strong theoretical foundations in algorithmic design, data structures, and software engineering principles.</p>
              </li>
              <li className="border-l-2 border-slate-700 pl-4">
                <span className="block font-semibold text-white">Core Technical Stack</span>
                <span className="block text-xs text-slate-400 mb-1">Modern Ecosystems</span>
                <p className="text-slate-400 text-xs">TypeScript, Next.js, Docker, Supabase, n8n, Python, and Linux Infrastructure.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Hub Reference */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center">
          <Globe className="w-6 h-6 text-sky-400 mx-auto mb-2" />
          <p className="text-xs font-mono text-slate-400">
            OFFICIAL DIGITAL ANCHOR: <a href="https://biomesh.online/profile" className="text-sky-400 hover:underline">biomesh.online/profile</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Biomesh.online &bull; All Rights Reserved &bull; Bright Sylvester</p>
      </footer>
    </mai
      n>
  );
        }
