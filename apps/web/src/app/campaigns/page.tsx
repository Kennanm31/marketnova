"use client";

import { useState } from "react";
import { Loader2, TrendingUp, BarChart2, DollarSign, Users, Sparkles } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Campaigns() {
  const [formData, setFormData] = useState({
    budget: 5000,
    platform: "Instagram",
    duration_days: 30,
    target_audience: "Fitness Enthusiasts 18-35",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/campaigns/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-pink-400" /> Advanced Campaign Prediction
        </h1>
        <p className="mt-2 text-gray-400">Forecast campaign performance, ROI, and daily reach before launch.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-4 bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
            <select 
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors"
              value={formData.platform}
              onChange={(e) => setFormData({...formData, platform: e.target.value})}
            >
              <option>Instagram</option>
              <option>LinkedIn</option>
              <option>Google Ads</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Budget ($)</label>
            <input 
              required
              type="number" 
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Duration (Days)</label>
            <input 
              required
              type="number" 
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors"
              value={formData.duration_days}
              onChange={(e) => setFormData({...formData, duration_days: Number(e.target.value)})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Target Audience Segment</label>
            <input 
              required
              type="text" 
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 transition-colors"
              value={formData.target_audience}
              onChange={(e) => setFormData({...formData, target_audience: e.target.value})}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-500 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Run ROI Prediction"}
          </button>
        </form>

        <div className="lg:col-span-8 bg-gray-900 border border-gray-800 rounded-2xl p-6 h-full flex flex-col">
          <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-4">Prediction Dashboard</h2>
          
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
              <p>Running predictive models...</p>
            </div>
          ) : result ? (
            <div className="flex-1 flex flex-col space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-pink-900/40 to-gray-950 border border-pink-500/20 p-5 rounded-xl text-center relative overflow-hidden">
                  <DollarSign className="absolute -right-2 -bottom-2 w-16 h-16 text-pink-500/10" />
                  <p className="text-pink-200/70 text-xs uppercase tracking-wider font-semibold mb-1">Est. ROI</p>
                  <p className={`text-3xl font-bold ${result.estimated_roi > 20 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                    +{result.estimated_roi}%
                  </p>
                </div>
                <div className="bg-gray-950 border border-gray-800 p-5 rounded-xl text-center">
                  <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Est. Reach</p>
                  <p className="text-3xl font-bold text-white flex justify-center items-center gap-2">
                    {result.predicted_reach.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-950 border border-gray-800 p-5 rounded-xl text-center">
                  <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Conv. Rate</p>
                  <p className="text-3xl font-bold text-white flex justify-center items-center gap-2">
                    {result.predicted_conversion_rate}%
                  </p>
                </div>
              </div>
              
              {/* Daily Reach Forecast Chart */}
              {result.daily_forecast && (
                <div className="bg-gray-950 border border-gray-800 p-5 rounded-xl h-64">
                  <h3 className="text-sm font-medium text-gray-300 mb-4">Daily Reach Forecast</h3>
                  <ResponsiveContainer width="100%" height="80%">
                    <LineChart data={result.daily_forecast}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                      <XAxis dataKey="day" stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 12}} axisLine={false} tickLine={false} />
                      <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 12}} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }}
                        itemStyle={{ color: '#f472b6' }}
                      />
                      <Line type="monotone" dataKey="reach" stroke="#f472b6" strokeWidth={3} dot={{ r: 3, fill: '#f472b6' }} activeDot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="mt-auto">
                <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" /> Smart Recommendation
                </h3>
                <div className="bg-gray-950 border border-gray-800 p-4 rounded-xl text-gray-200 text-sm leading-relaxed border-l-4 border-l-pink-500">
                  {result.recommendation}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Set parameters and run the prediction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
