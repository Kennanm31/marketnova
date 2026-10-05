"use client";

import { useState } from "react";
import { Copy, Loader2, Sparkles, Globe, Send, CheckCircle2 } from "lucide-react";

export default function ContentGenerator() {
  const [formData, setFormData] = useState({
    product_name: "EcoBreeze Smart Fan",
    target_audience: "Eco-conscious homeowners and tech enthusiasts",
    key_benefits: "Reduces energy bills by 30%, integrates with Alexa, whisper-quiet operation",
    tone: "Professional",
    language: "English"
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setPublished(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/content/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to generate content");
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    // Mock API call to publish to social media
    setTimeout(() => {
      setPublishing(false);
      setPublished(true);
    }, 1500);
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-indigo-400" /> AI Content Generator
        </h1>
        <p className="mt-2 text-gray-400">Generate high-converting marketing copy in multiple languages.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Product Name</label>
            <input 
              required
              type="text" 
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. EcoTracker App"
              value={formData.product_name}
              onChange={(e) => setFormData({...formData, product_name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Target Audience</label>
            <input 
              required
              type="text" 
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. Eco-conscious millennials"
              value={formData.target_audience}
              onChange={(e) => setFormData({...formData, target_audience: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Key Benefits</label>
            <textarea 
              required
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors h-20 resize-none"
              placeholder="e.g. Tracks daily footprint"
              value={formData.key_benefits}
              onChange={(e) => setFormData({...formData, key_benefits: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Tone of Voice</label>
              <select 
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                value={formData.tone}
                onChange={(e) => setFormData({...formData, tone: e.target.value})}
              >
                <option>Professional</option>
                <option>Playful</option>
                <option>Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-1">
                <Globe className="w-4 h-4 text-gray-400" /> Language
              </label>
              <select 
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value})}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Generate Copy
          </button>
          
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </form>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-full flex flex-col">
          <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-4">Generated Output</h2>
          
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
              <p>Crafting perfect copy in {formData.language}...</p>
            </div>
          ) : result ? (
            <div className="flex-1 flex flex-col space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-400">Ad Copy ({formData.language})</h3>
                  <button onClick={() => navigator.clipboard.writeText(result.ad_copy)} className="text-gray-400 hover:text-white transition-colors" title="Copy to clipboard">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-950 border border-gray-800 p-4 rounded-xl text-white text-lg leading-relaxed shadow-inner">
                  {result.ad_copy}
                </div>
              </div>

              {/* Keyword Highlights */}
              {result.detected_keywords && result.detected_keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {result.detected_keywords.map((kw: string, i: number) => (
                    <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      #{kw.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
              )}
              
              {result.suggestions && result.suggestions.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Smart Suggestions</h3>
                  <ul className="space-y-2">
                    {result.suggestions.map((s: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto pt-4 border-t border-gray-800 flex justify-end">
                <button 
                  onClick={handlePublish}
                  disabled={publishing || published}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors ${
                    published 
                      ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {publishing ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</>
                  ) : published ? (
                    <><CheckCircle2 className="w-4 h-4" /> Published to Facebook & Instagram</>
                  ) : (
                    <><Send className="w-4 h-4" /> Direct Publish</>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Fill out the form and hit generate.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
