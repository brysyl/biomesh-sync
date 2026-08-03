import React from 'react';

export default function ExecutiveBriefing() {
  return (
    <div className="min-h-screen bg-slate-100 py-10 print:py-0 print:bg-white flex justify-center">
      <main className="max-w-[800px] w-full bg-white text-slate-800 font-sans p-10 md:p-12 shadow-sm print:shadow-none print:p-0 print:m-[25mm_20mm] print:color-adjust-exact">
        
        {/* Header */}
        <header className="border-b-2 border-emerald-500 pb-5 mb-10">
          <span className="text-[10px] uppercase tracking-[2px] text-emerald-500 font-bold mb-[15px] inline-block bg-emerald-500/10 px-2.5 py-1 rounded">
            Confidential // Private Alpha
          </span>
          <h1 className="font-serif text-[34px] text-slate-900 m-0 leading-tight tracking-tight">
            BioMesh Sync: A New Category in Human-Centric AI
          </h1>
          <div className="text-[11px] text-slate-500 mt-[15px] flex justify-between font-semibold tracking-wide">
            <span>PREPARED BY: BIOMESH SYSTEMS INC.</span>
            <span>AUGUST 2026</span>
          </div>
        </header>

        {/* Body Content */}
        <section>
          <h2 className="font-serif text-slate-900 text-[22px] border-b border-slate-200 pb-2.5 mt-[45px] mb-5 break-after-avoid">
            Executive Summary
          </h2>
          <p className="text-[11pt] text-slate-700 mb-[18px] text-justify leading-[1.7]">
            Today's AI productivity tools are designed to optimize calendars. Wearable platforms are designed to monitor human health. <strong className="text-slate-900 font-semibold">BioMesh Sync</strong> is different because it connects these two worlds into a single autonomous decision system.
          </p>
          <p className="text-[11pt] text-slate-700 mb-[18px] text-justify leading-[1.7]">
            While platforms such as Oura and Garmin continuously measure stress, heart rate variability (HRV), recovery, and sleep, they stop at presenting insights. Separately, AI scheduling tools such as Reclaim.ai and Motion intelligently protect focus time and rearrange meetings, but they make decisions based on calendars, tasks, and deadlines—not on a person's physiological condition. Even as the AI calendar market has matured following changes such as the shutdown of Clockwise in 2026, leading products continue to focus on scheduling intelligence rather than biometric decision-making.
          </p>

          <h2 className="font-serif text-slate-900 text-[22px] border-b border-slate-200 pb-2.5 mt-[45px] mb-5 break-after-avoid">
            The Operational Paradigm Shift
          </h2>
          <p className="text-[11pt] text-slate-700 mb-[18px] text-justify leading-[1.7]">
            BioMesh Sync introduces a fundamentally different operating model. Instead of asking "What does the calendar look like?", it asks:
          </p>
          
          <blockquote className="border-l-4 border-emerald-500 bg-slate-50 my-[30px] py-5 px-6 font-serif italic text-[16pt] text-slate-900 break-inside-avoid">
            "What is the human body capable of doing right now?"
          </blockquote>

          <p className="text-[11pt] text-slate-700 mb-[18px] text-justify leading-[1.7]">
            Using secure integrations with wearable ecosystems such as Oura and Garmin, BioMesh Sync receives real-time biometric telemetry through webhooks. A stateless edge engine evaluates physiological load in milliseconds, determines whether the user is approaching cognitive overload, and autonomously protects the user's calendar by creating focus blocks, delaying non-critical meetings, or recommending recovery time before burnout occurs.
          </p>
          <p className="text-[11pt] text-slate-700 mb-[18px] text-justify leading-[1.7]">
            This transforms wearable data from passive health analytics into an active productivity infrastructure. Unlike conventional wellness platforms, BioMesh Sync does not simply visualize stress. Unlike AI calendar assistants, it does not merely optimize schedules. It continuously translates biological signals into automated workplace decisions, creating a feedback loop between human physiology, artificial intelligence, and digital work environments.
          </p>

          <h2 className="font-serif text-slate-900 text-[22px] border-b border-slate-200 pb-2.5 mt-[45px] mb-5 break-after-avoid">
            Why BioMesh Sync is Different
          </h2>
          <ul className="mb-[25px] pl-5 list-disc marker:text-slate-400">
            <li className="text-[11pt] text-slate-700 mb-3 leading-[1.6]">
              <strong className="text-slate-900 font-semibold">Human-first AI:</strong> Decisions begin with biological readiness, not calendar availability.
            </li>
            <li className="text-[11pt] text-slate-700 mb-3 leading-[1.6]">
              <strong className="text-slate-900 font-semibold">Edge-native intelligence:</strong> Real-time evaluation at the edge enables sub-second responses without relying on heavy server infrastructure.
            </li>
            <li className="text-[11pt] text-slate-700 mb-3 leading-[1.6]">
              <strong className="text-slate-900 font-semibold">Autonomous calendar defense:</strong> Protects focus and recovery before burnout affects performance.
            </li>
            <li className="text-[11pt] text-slate-700 mb-3 leading-[1.6]">
              <strong className="text-slate-900 font-semibold">Wearable-agnostic architecture:</strong> Built to integrate with leading biometric platforms rather than proprietary hardware.
            </li>
            <li className="text-[11pt] text-slate-700 mb-3 leading-[1.6]">
              <strong className="text-slate-900 font-semibold">Enterprise-ready security:</strong> OAuth-based integrations, encrypted telemetry, and privacy-first architecture designed for executive and enterprise environments.
            </li>
            <li className="text-[11pt] text-slate-700 mb-3 leading-[1.6]">
              <strong className="text-slate-900 font-semibold">A new product category:</strong> BioMesh Sync is not a wearable app and not an AI calendar. It is an Autonomous Human Performance Operating System.
            </li>
          </ul>

          <h2 className="font-serif text-slate-900 text-[22px] border-b border-slate-200 pb-2.5 mt-[45px] mb-5 break-after-avoid">
            Strategic Outlook
          </h2>
          <p className="text-[11pt] text-slate-700 mb-[18px] text-justify leading-[1.7]">
            As wearable ecosystems continue expanding their integration capabilities and AI scheduling assistants become more sophisticated, the next competitive frontier is no longer calendar optimization—it is human optimization. BioMesh Sync is designed to lead that transition by allowing biology, rather than busyness, to determine how work is scheduled.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-[60px] border-t border-slate-200 pt-5 text-[9px] text-center text-slate-400 tracking-[1.5px] uppercase">
          BIOMESH SYSTEMS INC. // PROPRIETARY DOCUMENT // DO NOT DISTRIBUTE
        </footer>
        
      </main>
    </div>
  );
}
