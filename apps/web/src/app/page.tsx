"use client";

import { Activity, ArrowUpRight, CheckCircle2, TrendingUp, Users, Zap, Cloud, Mic, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const metrics = [
  { name: "Active Campaigns", value: "12", change: "+2", icon: Activity, color: "text-blue-400" },
  { name: "Total Audience", value: "84.2K", change: "+14%", icon: Users, color: "text-indigo-400" },
  { name: "Avg. Sentiment", value: "8.4/10", change: "+0.5", icon: CheckCircle2, color: "text-emerald-400" },
  { name: "Conversion Rate", value: "3.2%", change: "+0.4%", icon: TrendingUp, color: "text-purple-400" },
];

const features = [
  { name: "AI Content Gen", desc: "Multilingual ad copy", href: "/content", icon: Zap },
  { name: "Sentiment Analysis", desc: "BERT-powered reviews", href: "/sentiment", icon: CheckCircle2 },
  { name: "Customer Segments", desc: "K-Means demographic clusters", href: "/segmentation", icon: Users },
  { name: "Predictive Campaigns", desc: "Forecast ROI & Reach", href: "/campaigns", icon: TrendingUp },
];

const chartData = [
  { name: 'Mon', audience: 4000 },
  { name: 'Tue', audience: 5000 },
  { name: 'Wed', audience: 4800 },
  { name: 'Thu', audience: 6200 },
  { name: 'Fri', audience: 7500 },
  { name: 'Sat', audience: 8400 },
  { name: 'Sun', audience: 9100 },
];

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back.</h1>
          <p className="mt-2 text-gray-400">Here's what's happening with your marketing campaigns today.</p>
        </div>
        
        {/* Future Scope: Voice Assistant Mock */}
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full font-medium transition-colors shadow-lg shadow-indigo-500/20">
          <Mic className="w-4 h-4" />
          <span>Voice Assistant</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((item) => (
          <div key={item.name} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <item.icon className={`h-16 w-16 ${item.color}`} />
            </div>
            <div className="flex items-center justify-between relative z-10">
              <item.icon className={`h-6 w-6 ${item.color}`} />
              <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                {item.change} <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-sm font-medium text-gray-400">{item.name}</h3>
              <p className="text-3xl font-semibold text-white mt-1">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Future Scope: CRM Integration Status */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-500/20 p-2 rounded-lg">
            <Cloud className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-medium">Salesforce CRM Connected</h3>
            <p className="text-gray-400 text-sm">Syncing customer data in real-time for Segmentation & Analysis.</p>
          </div>
        </div>
        <button className="text-sm text-gray-300 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2">
          <LinkIcon className="w-4 h-4" /> Manage Integrations
        </button>
      </div>

      <div className="pt-2">
        <h2 className="text-xl font-bold text-white mb-6">Platform Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link 
              key={feature.name} 
              href={feature.href}
              className="group block bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-2xl p-6 transition-all duration-200"
            >
              <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <feature.icon className="h-5 w-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">{feature.name}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="pt-2">
        <h2 className="text-xl font-bold text-white mb-6">Real-Time Audience Growth</h2>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAudience" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
              <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af'}} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }}
                itemStyle={{ color: '#818cf8' }}
              />
              <Area type="monotone" dataKey="audience" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorAudience)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
