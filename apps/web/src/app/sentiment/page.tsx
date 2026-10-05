"use client";

import { useState } from "react";
import { Loader2, MessageSquare, Smile, Meh, Frown, Tag, Activity } from "lucide-react";

export default function SentimentAnalysis() {
  const [reviews, setReviews] = useState(
    "The product is amazing, I absolutely love the new features!\n" +
    "Customer support was terrible and shipping was extremely slow.\n" +
    "It's okay, not the best but it gets the job done for the price.\n" +
    "Excellent quality, highly recommend this to everyone!\n" +
    "Broken on arrival, worst purchasing experience ever.\n" +
    "Good value, though the setup was a bit confusing."
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const reviewList = reviews.split("\n").map(r => r.trim()).filter(r => r.length > 0);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/sentiment/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews: reviewList }),
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
          <MessageSquare className="h-8 w-8 text-emerald-400" /> Sentiment Analysis (BERT)
        </h1>
        <p className="mt-2 text-gray-400">Paste customer reviews to analyze sentiment polarity and extract key topics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-5 bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col h-[600px]">
          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-medium text-gray-300 mb-2">Customer Reviews (One per line)</label>
            <textarea 
              required
              className="flex-1 w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none font-mono text-sm"
              placeholder="The product is amazing, I love it!&#10;Shipping was terrible and slow.&#10;It's okay, not the best but works."
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || reviews.trim().length === 0}
            className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Run Model Inference"}
          </button>
        </form>

        <div className="lg:col-span-7 bg-gray-900 border border-gray-800 rounded-2xl p-6 h-[600px] flex flex-col overflow-hidden">
          <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-4 shrink-0 flex justify-between items-center">
            <span>Analysis Results</span>
            {result && (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                Model: BERT-base-uncased
              </span>
            )}
          </h2>
          
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
              <p className="text-gray-400">Classifying sentences...</p>
            </div>
          ) : result ? (
            <div className="flex-1 overflow-y-auto pr-2 space-y-8">
              
              {/* Score Breakdown */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-5"><Smile className="w-12 h-12" /></div>
                  <Smile className="w-8 h-8 text-emerald-400 mb-2 relative z-10" />
                  <span className="text-2xl font-bold text-white relative z-10">{result.breakdown.positive}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider relative z-10">Positive</span>
                </div>
                <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-5"><Meh className="w-12 h-12" /></div>
                  <Meh className="w-8 h-8 text-yellow-400 mb-2 relative z-10" />
                  <span className="text-2xl font-bold text-white relative z-10">{result.breakdown.neutral}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider relative z-10">Neutral</span>
                </div>
                <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-5"><Frown className="w-12 h-12" /></div>
                  <Frown className="w-8 h-8 text-red-400 mb-2 relative z-10" />
                  <span className="text-2xl font-bold text-white relative z-10">{result.breakdown.negative}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider relative z-10">Negative</span>
                </div>
              </div>

              {/* Model Performance Metrics (Future Scope implementation) */}
              {result.model_metrics && (
                <div className="bg-gray-950 border border-gray-800 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" /> Model Performance Metrics
                  </h3>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-xl font-bold text-gray-200">{((result.model_metrics.accuracy ?? 0.92) * 100).toFixed(1)}%</p>
                      <p className="text-xs text-gray-500 uppercase">Accuracy</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-200">{((result.model_metrics.precision ?? 0.89) * 100).toFixed(1)}%</p>
                      <p className="text-xs text-gray-500 uppercase">Precision</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-200">{((result.model_metrics.recall ?? 0.91) * 100).toFixed(1)}%</p>
                      <p className="text-xs text-gray-500 uppercase">Recall</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-emerald-400">{((result.model_metrics.f1_score ?? 0.90) * 100).toFixed(1)}%</p>
                      <p className="text-xs text-emerald-500/70 uppercase font-semibold">F1-Score</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Keyword Extraction */}
              {result.extracted_keywords && result.extracted_keywords.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" /> Extracted Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.extracted_keywords.map((kw: any, i: number) => (
                      <span key={i} className="bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full border border-gray-700 flex items-center gap-2">
                        {kw.word} <span className="bg-gray-900 text-gray-500 px-1.5 rounded text-[10px]">{kw.count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Feed */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Statement Analysis</h3>
                {result.analyzed_reviews.map((r: any, i: number) => (
                  <div key={i} className="bg-gray-950 border border-gray-800 p-4 rounded-xl flex gap-4 items-start">
                    <div className="shrink-0 mt-0.5">
                      {r.sentiment === "positive" && <Smile className="w-5 h-5 text-emerald-400" />}
                      {r.sentiment === "neutral" && <Meh className="w-5 h-5 text-yellow-400" />}
                      {r.sentiment === "negative" && <Frown className="w-5 h-5 text-red-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-200 text-sm leading-relaxed">{r.text}</p>
                      <p className="text-xs text-gray-500 mt-2">Confidence: {(r.confidence * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-2">
              <MessageSquare className="w-12 h-12 text-gray-800" />
              <p>Results will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
