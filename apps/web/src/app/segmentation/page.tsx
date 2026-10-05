"use client";

import { useEffect, useState } from "react";
import { Users, Loader2, Target, Crosshair, AlertTriangle } from "lucide-react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Segmentation() {
  const [clusters, setClusters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/segmentation/clusters`);
        const data = await res.json();
        setClusters(data.clusters);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const COLORS = ['#10b981', '#3b82f6', '#ef4444']; // emerald, blue, red

  // Aggregate points for the scatter chart
  const allPlotPoints = clusters.flatMap((c, i) => 
    (c.plot_points || []).map((p: any) => ({ ...p, clusterId: i }))
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <Users className="h-8 w-8 text-blue-400" /> Customer Segmentation (K-Means)
        </h1>
        <p className="mt-2 text-gray-400">Actionable audience clusters based on ML behavioral analysis.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Scatter Plot Visualization */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-80 flex flex-col">
            <h2 className="text-lg font-bold text-white mb-4">Cluster Visualization (Recency vs. Frequency)</h2>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" dataKey="x" name="Recency Score" stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
                  <YAxis type="number" dataKey="y" name="Frequency Score" stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }} 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }}
                  />
                  <Scatter name="Customers" data={allPlotPoints}>
                    {allPlotPoints.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.clusterId % COLORS.length]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cluster Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clusters.map((cluster, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-opacity-20 shrink-0 ${
                    i === 0 ? 'bg-emerald-500 text-emerald-400' : i === 1 ? 'bg-blue-500 text-blue-400' : 'bg-red-500 text-red-400'
                  }`}>
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white leading-tight">{cluster.name}</h2>
                    <p className="text-sm text-gray-400">{cluster.size.toLocaleString()} Users</p>
                  </div>
                </div>
                
                <div className="flex-1 space-y-5">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Characteristics</h3>
                    <ul className="space-y-2">
                      {cluster.characteristics.map((char: string, j: number) => (
                        <li key={j} className="text-sm text-gray-300 flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-blue-500' : 'bg-red-500'}`} /> 
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-4 h-4 ${cluster.churn_probability > 0.5 ? 'text-red-400' : 'text-gray-400'}`} />
                      <span className="text-sm text-gray-300">Churn Risk Prediction</span>
                    </div>
                    <span className={`text-sm font-bold ${
                      cluster.churn_probability < 0.2 ? 'text-emerald-400' : cluster.churn_probability < 0.5 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {(cluster.churn_probability * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-800">
                  <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Crosshair className="w-4 h-4" /> Suggested Action
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{cluster.suggested_action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
