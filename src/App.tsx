/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { 
  ClipboardCheck, 
  LayoutDashboard, 
  BookOpen, 
  ChevronLeft,
  ChevronRight, 
  Trophy, 
  BarChart3,
  CheckCircle2,
  Info,
  FileText,
  Download,
  ShieldCheck
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { NBA_CRITERIA } from "./data/nbaCriteria";
import { Criterion, SelfAssessmentScore, SubCriterion } from "./types";
import { cn } from "./lib/utils";

const COLORS = ["#3b82f6", "#6366f1", "#475569"];

export default function App() {
  const [activeCriterionId, setActiveCriterionId] = useState<number | "dashboard">("dashboard");
  const [scores, setScores] = useState<SelfAssessmentScore>({});

  const handleScoreChange = (guidelineId: string, value: number, max: number) => {
    const validatedValue = Math.max(0, Math.min(max, value));
    setScores(prev => ({
      ...prev,
      [guidelineId]: validatedValue
    }));
  };

  const getSubCriterionScore = (sub: SubCriterion): number => {
    let total = 0;
    if (sub.guidelines) {
      sub.guidelines.forEach(g => {
        total += scores[g.id] || 0;
      });
    }
    if (sub.subCriteria) {
      sub.subCriteria.forEach(child => {
        total += getSubCriterionScore(child);
      });
    }
    if (!sub.guidelines && !sub.subCriteria) {
      total += scores[sub.id] || 0;
    }
    return total;
  };

  const getCriterionScore = (criterion: Criterion): number => {
    return criterion.subCriteria.reduce((sum, sub) => sum + getSubCriterionScore(sub), 0);
  };

  const totalSum = useMemo(() => {
    return NBA_CRITERIA.reduce((sum, c) => sum + getCriterionScore(c), 0);
  }, [scores]);

  const activeCriterion = NBA_CRITERIA.find(c => c.id === activeCriterionId);

  // Grouped progress for sidebar
  const coreProgress = useMemo(() => {
    const items = NBA_CRITERIA.slice(0, 3);
    const score = items.reduce((s, c) => s + getCriterionScore(c), 0);
    const max = items.reduce((s, c) => s + c.maxMarks, 0);
    return { score, max, percent: Math.round((score/max)*100) || 0 };
  }, [scores]);

  const resourceProgress = useMemo(() => {
    const items = NBA_CRITERIA.slice(3, 6);
    const score = items.reduce((s, c) => s + getCriterionScore(c), 0);
    const max = items.reduce((s, c) => s + c.maxMarks, 0);
    return { score, max, percent: Math.round((score/max)*100) || 0 };
  }, [scores]);

  const improvementProgress = useMemo(() => {
    const items = NBA_CRITERIA.slice(6, 9);
    const score = items.reduce((s, c) => s + getCriterionScore(c), 0);
    const max = items.reduce((s, c) => s + c.maxMarks, 0);
    return { score, max, percent: Math.round((score/max)*100) || 0 };
  }, [scores]);

  return (
    <div className="bg-slate-50 text-slate-900 font-sans h-screen flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-14 bg-slate-900 text-white flex items-center justify-between px-6 shrink-0 z-30 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-lg">A</div>
          <h1 className="text-lg font-semibold tracking-tight">NBA Accreditation | OBE Outcomes Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-[10px] font-bold rounded transition flex items-center gap-1.5 uppercase tracking-wider">
              <Download className="w-3 h-3" />
              Export Excel
            </button>
            <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-[10px] font-bold rounded transition text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <FileText className="w-3 h-3" />
              Guidelines PDF
            </button>
          </div>
          <div className="h-8 w-px bg-slate-700"></div>
          <div className="text-right">
            <p className="text-[9px] text-slate-400 uppercase font-black leading-none mb-1">NBA Coordinator</p>
            <p className="text-xs font-bold leading-none">Institutional Admin</p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        
        {/* Left Sidebar: Dashboard Summary */}
        <aside className="w-72 flex flex-col gap-4 shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <BarChart3 className="w-3 h-3" />
              Cumulative Summary
            </h2>
            <div className="text-center mb-8">
              <div className="text-5xl font-black text-slate-900 leading-none mb-2 tabular-nums">
                {totalSum}<span className="text-lg text-slate-400 font-normal ml-1 tracking-tighter">/ 1000</span>
              </div>
              <p className={cn(
                "text-xs font-bold px-3 py-1 rounded-full w-fit mx-auto",
                totalSum >= 750 ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"
              )}>
                Accreditation: {totalSum >= 750 ? "Likely (3+ Years)" : "Needs Review"}
              </p>
            </div>
            
            <div className="space-y-5">
              <SummaryProgress title="CRITERION 1-3 (Core)" val={coreProgress.score} max={coreProgress.max} color="bg-blue-500" />
              <SummaryProgress title="CRITERION 4-6 (Resources)" val={resourceProgress.score} max={resourceProgress.max} color="bg-indigo-500" />
              <SummaryProgress title="CRITERION 7-9 (Improvement)" val={improvementProgress.score} max={improvementProgress.max} color="bg-slate-400" />
            </div>
          </div>

          <div className="bg-indigo-900 text-white rounded-xl p-5 flex-1 shadow-inner relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xs font-black text-indigo-300 uppercase tracking-widest mb-4">Quality Benchmarks</h3>
              <ul className="space-y-4 text-xs">
                <li className="flex justify-between items-center border-b border-indigo-800 pb-2">
                  <span className="opacity-70 font-medium">Tier 1 Threshold</span>
                  <span className="font-mono font-bold bg-indigo-800 px-1.5 py-0.5 rounded">750+</span>
                </li>
                <li className="flex justify-between items-center border-b border-indigo-800 pb-2">
                  <span className="opacity-70 font-medium">Compliance Rate</span>
                  <span className="font-mono font-bold">{(totalSum / 10).toFixed(1)}%</span>
                </li>
                <li className="flex justify-between items-center border-b border-indigo-800 pb-2">
                  <span className="opacity-70 font-medium">Gap Analysis</span>
                  <span className={cn("font-mono font-bold", totalSum < 750 ? "text-rose-400" : "text-emerald-400")}>
                    {totalSum - 750 > 0 ? "+" : ""}{totalSum - 750} pts
                  </span>
                </li>
              </ul>
              <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-[10px] leading-relaxed italic opacity-80 flex gap-2">
                  <Info className="w-4 h-4 shrink-0 text-indigo-300" />
                  "Self-assessment scores must be backed by evidence (Course Files, Lab Manuals, Placement Data)."
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeCriterionId === "dashboard" ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-3 grid-rows-3 gap-3 h-full min-h-[600px]"
              >
                {NBA_CRITERIA.map((c, idx) => (
                  <CriterionMiniCard 
                    key={c.id} 
                    criterion={c} 
                    score={getCriterionScore(c)} 
                    onClick={() => setActiveCriterionId(c.id)}
                    colorClass={idx < 3 ? "border-l-blue-500" : idx < 6 ? "border-l-indigo-500" : "border-l-slate-400"}
                  />
                ))}
              </motion.div>
            ) : activeCriterion ? (
              <motion.div
                key={activeCriterion.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-xl border border-slate-200 flex flex-col h-full shadow-sm"
              >
                <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setActiveCriterionId("dashboard")}
                      className="p-1.5 hover:bg-slate-200 rounded transition text-slate-500"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-black bg-slate-900 text-white px-1.5 py-0.5 rounded leading-none">C{activeCriterion.id}</span>
                        <h2 className="text-sm font-bold text-slate-800">{activeCriterion.name}</h2>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium">Evaluation Component Entry</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-slate-900 leading-none">{getCriterionScore(activeCriterion)} <span className="text-xs font-normal text-slate-400">/ {activeCriterion.maxMarks}</span></p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                   <div className="grid grid-cols-1 gap-4">
                      {activeCriterion.subCriteria.map(sub => (
                        <SubCriterionCompactPanel 
                          key={sub.id} 
                          sub={sub} 
                          scores={scores} 
                          onScoreChange={handleScoreChange}
                          score={getSubCriterionScore(sub)}
                        />
                      ))}
                   </div>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center px-6 shrink-0">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                     <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                     EVIDENCE-CHECKED VALIDATION
                   </div>
                   <button 
                    onClick={() => setActiveCriterionId("dashboard")}
                    className="bg-slate-900 text-white text-[10px] font-bold px-4 py-2 rounded-lg hover:bg-slate-800 transition uppercase tracking-widest"
                   >
                     Confirm & Return
                   </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer Status Bar */}
      <footer className="h-8 bg-white border-t border-slate-200 px-6 flex items-center justify-between text-[10px] text-slate-500 shrink-0 font-bold tracking-tight">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            <span className="uppercase font-black text-slate-400">System Ready</span>
          </span>
          <span className="text-slate-200">|</span>
          <span className="uppercase">Last Sync: {new Date().toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center space-x-4 uppercase tracking-widest text-slate-400">
          <span>Tier I Engineering Guidelines (SAR V2)</span>
          <span className="text-slate-200">|</span>
          <span className="text-blue-600 font-black">Accreditation ID: AIS-NBA-2024</span>
        </div>
      </footer>
    </div>
  );
}

function SummaryProgress({ title, val, max, color }: { title: string, val: number, max: number, color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-black text-slate-500 tracking-tight">
        <span className="uppercase">{title}</span>
        <span className="text-slate-900">{val}/{max}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(val/max)*100}%` }}
          className={cn("h-full transition-all duration-700", color)} 
        />
      </div>
    </div>
  );
}

function CriterionMiniCard({ criterion, score, onClick, colorClass }: { criterion: Criterion, score: number, onClick: () => void, colorClass: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "bg-white border border-slate-200 rounded-lg p-3 flex flex-col hover:border-blue-400 hover:shadow-md transition cursor-pointer text-left group border-l-4",
        colorClass
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">C{criterion.id}</span>
        <span className="text-xs font-black text-slate-700 tabular-nums">{score}<span className="text-[10px] font-normal text-slate-400">/{criterion.maxMarks}</span></span>
      </div>
      <h3 className="text-xs font-bold leading-snug mb-3 text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">{criterion.name}</h3>
      
      <div className="mt-auto pt-2 border-t border-slate-50">
        <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 mb-1.5 uppercase">
          <span>Completion</span>
          <span className="text-slate-600">{Math.round((score/criterion.maxMarks)*100)}%</span>
        </div>
        <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full opacity-60"
            style={{ width: `${(score/criterion.maxMarks)*100}%` }}
          />
        </div>
      </div>
    </button>
  );
}

function SubCriterionCompactPanel({ sub, scores, onScoreChange, score }: { sub: SubCriterion, scores: any, onScoreChange: any, score: number }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-3 shadow-sm">
       <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
          <div className="flex items-center gap-2">
             <span className="bg-white border border-slate-200 text-[10px] font-black px-1.5 py-0.5 rounded leading-none text-slate-500">{sub.id}</span>
             <h4 className="text-xs font-bold text-slate-700 uppercase tracking-tight">{sub.name}</h4>
          </div>
          <span className="text-[10px] font-black text-blue-600 tabular-nums bg-blue-50 px-2 py-0.5 rounded border border-blue-100 shadow-sm">{score} / {sub.maxMarks}</span>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sub.subCriteria?.map(child => (
            <div key={child.id} className="bg-white p-3 rounded-md border border-slate-200 flex flex-col gap-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
               <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{child.id}</span>
                  <span className="text-[9px] font-bold text-slate-300 italic">SEC TOTAL: {child.maxMarks}</span>
               </div>
               <div className="space-y-2">
                  {child.guidelines?.map(g => (
                    <GuidelineCheckboxInput 
                      key={g.id} 
                      guideline={g} 
                      value={scores[g.id] || 0} 
                      onChange={(v) => onScoreChange(g.id, v, g.maxMarks)} 
                    />
                  ))}
                  {!child.guidelines && (
                    <GuidelineCheckboxInput 
                      guideline={{ id: child.id, description: child.name, maxMarks: child.maxMarks }} 
                      value={scores[child.id] || 0} 
                      onChange={(v) => onScoreChange(child.id, v, child.maxMarks)} 
                    />
                  )}
               </div>
            </div>
          ))}

          {sub.guidelines?.map(g => (
            <GuidelineCheckboxInput 
              key={g.id} 
              guideline={g} 
              value={scores[g.id] || 0} 
              onChange={(v) => onScoreChange(g.id, v, g.maxMarks)} 
            />
          ))}

          {!sub.subCriteria && !sub.guidelines && (
             <GuidelineCheckboxInput 
               guideline={{ id: sub.id, description: "Compliance Criteria Fulfilled", maxMarks: sub.maxMarks }} 
               value={scores[sub.id] || 0} 
               onChange={(v) => onScoreChange(sub.id, v, sub.maxMarks)} 
             />
          )}
       </div>
    </div>
  );
}

function GuidelineCheckboxInput({ guideline, value, onChange }: { guideline: any, value: number, onChange: (v: number) => void }) {
  const isChecked = value === guideline.maxMarks;

  return (
    <button 
      onClick={() => onChange(isChecked ? 0 : guideline.maxMarks)}
      className={cn(
        "flex items-center gap-3 p-2 rounded-lg border transition-all duration-200 text-left w-full group",
        isChecked 
          ? "bg-blue-50 border-blue-200 shadow-sm" 
          : "bg-slate-50/50 border-slate-100 hover:border-slate-200 hover:bg-slate-50"
      )}
    >
      <div className={cn(
        "w-5 h-5 shrink-0 rounded flex items-center justify-center transition-all duration-200",
        isChecked ? "bg-blue-600 text-white" : "bg-white border border-slate-300"
      )}>
        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-[10px] uppercase font-bold leading-tight truncate",
          isChecked ? "text-blue-900" : "text-slate-500 group-hover:text-slate-700"
        )} title={guideline.description}>
          {guideline.description}
        </p>
      </div>
      <div className={cn(
        "px-1.5 py-0.5 rounded text-[9px] font-black tabular-nums transition-colors",
        isChecked ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-400"
      )}>
        {guideline.maxMarks}
      </div>
    </button>
  );
}
