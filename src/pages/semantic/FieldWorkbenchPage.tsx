
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { 
  Search, Filter, ChevronRight, Brain, 
  CheckCircle2, AlertCircle, AlertTriangle, 
  Clock, Info, MoreHorizontal, ArrowRight,
  Database, Table2, LayoutGrid, List,
  History, Sparkles, Wand2, ShieldCheck,
  ChevronDown, ChevronUp, RefreshCw, X
} from 'lucide-react';
import { FieldDrawer } from '../../components/semantic/FieldDrawer';

export const FieldWorkbenchPage: React.FC = () => {
  const { lvId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const stage = searchParams.get('stage');
  const queue = searchParams.get('queue') || 'ALL';
  const fieldId = searchParams.get('fieldId');
  const focus = searchParams.get('focus');

  const [selectedField, setSelectedField] = React.useState<string | null>(fieldId);

  const handleFieldSelect = (id: string) => {
    setSelectedField(id);
    setSearchParams(prev => {
      prev.set('fieldId', id);
      return prev;
    });
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-200 overflow-hidden">
      {/* TopBar */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Table2 size={18} />
            <span className="text-sm font-medium">零售域订单模型</span>
            <ChevronRight size={14} />
            <span className="text-sm font-bold text-white">字段裁决工作台</span>
          </div>
          <div className="h-4 w-px bg-slate-800 mx-2"></div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded text-[10px] font-bold uppercase tracking-wider">
              L2 Semantic Engine
            </span>
            <span className="text-[10px] text-slate-500 font-mono">v1.2.4</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-300 uppercase">Engine Online</span>
          </div>
          <button className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2">
            <RefreshCw size={14} /> 重新推断
          </button>
        </div>
      </header>

      {/* Main Layout: 3 Columns */}
      <div className="flex-1 flex overflow-hidden">
        {/* Column 1: Queue & Filter (Left) */}
        <aside className="w-64 border-r border-slate-800 flex flex-col bg-slate-900/20">
          <div className="p-4 space-y-6">
            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">裁决队列</h3>
              <nav className="space-y-1">
                {[
                  { id: 'ALL', label: '全部字段', count: 156, icon: <LayoutGrid size={14} /> },
                  { id: 'AUTO_PASS', label: '自动确认', count: 124, icon: <CheckCircle2 size={14} />, color: 'text-emerald-400' },
                  { id: 'NEEDS_CONFIRM', label: '待确认', count: 12, icon: <Clock size={14} />, color: 'text-cyan-400' },
                  { id: 'CONFLICT', label: '语义冲突', count: 8, icon: <AlertCircle size={14} />, color: 'text-rose-400' },
                  { id: 'ANOMALY', label: '画像异常', count: 5, icon: <AlertTriangle size={14} />, color: 'text-amber-400' },
                  { id: 'IGNORE_CANDIDATE', label: '建议忽略', count: 7, icon: <X size={14} />, color: 'text-slate-500' },
                ].map((q) => (
                  <button
                    key={q.id}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                      queue === q.id ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={q.color || ''}>{q.icon}</span>
                      <span>{q.label}</span>
                    </div>
                    <span className="text-[10px] font-mono opacity-60">{q.count}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">快捷筛选</h3>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 ml-1">所属表</label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <option>全部表</option>
                    <option>orders</option>
                    <option>order_items</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 ml-1">置信度区间</label>
                  <div className="flex items-center gap-2">
                    <input type="text" placeholder="0.0" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-300" />
                    <span className="text-slate-600">-</span>
                    <input type="text" placeholder="1.0" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Column 2: Field List (Middle) */}
        <main className="flex-1 flex flex-col bg-slate-950 min-w-0">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input 
                type="text" 
                placeholder="搜索字段名、表名或语义标签..." 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                <List size={18} />
              </button>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-slate-900/80 backdrop-blur-md z-10 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">字段信息</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Top1 推断 (Type/Role)</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">置信度 / 差异</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">完整度</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">裁决路由</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  { name: 'order_id', table: 'orders', type: 'ID', role: 'PK', conf: 0.98, gap: 0.85, comp: 1.0, route: 'AUTO_PASS' },
                  { name: 'cust_id', table: 'orders', type: 'ID', role: 'FK', conf: 0.92, gap: 0.72, comp: 0.98, route: 'AUTO_PASS' },
                  { name: 'total_amt', table: 'orders', type: 'MEASURE', role: 'VALUE', conf: 0.85, gap: 0.12, comp: 0.95, route: 'NEEDS_CONFIRM' },
                  { name: 'order_status', table: 'orders', type: 'DIM', role: 'STATUS', conf: 0.76, gap: 0.05, comp: 0.88, route: 'CONFLICT' },
                  { name: 'create_time', table: 'orders', type: 'TIME', role: 'EVENT_TIME', conf: 0.95, gap: 0.90, comp: 1.0, route: 'AUTO_PASS' },
                  { name: 'discount_code', table: 'orders', type: 'DIM', role: 'CODE', conf: 0.45, gap: 0.02, comp: 0.32, route: 'ANOMALY' },
                  { name: 'temp_col_01', table: 'orders', type: 'UNKNOWN', role: 'NONE', conf: 0.12, gap: 0.0, comp: 0.05, route: 'IGNORE_CANDIDATE' },
                ].map((f, i) => (
                  <tr 
                    key={i} 
                    onClick={() => handleFieldSelect(f.name)}
                    className={`hover:bg-slate-900/50 transition-colors group cursor-pointer ${selectedField === f.name ? 'bg-indigo-500/5 border-l-2 border-l-indigo-500' : ''}`}
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-mono font-bold text-white">{f.name}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{f.table}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-bold">{f.type}</span>
                        <span className="text-slate-600">/</span>
                        <span className="px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded text-[10px] font-bold">{f.role}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full ${f.conf > 0.8 ? 'bg-emerald-500' : f.conf > 0.5 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${f.conf * 100}%` }}></div>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">{(f.conf * 100).toFixed(0)}%</span>
                        </div>
                        <p className="text-[9px] text-slate-600">Gap: {f.gap.toFixed(2)}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-mono text-slate-400">{(f.comp * 100).toFixed(0)}%</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        f.route === 'AUTO_PASS' ? 'bg-emerald-500/10 text-emerald-400' :
                        f.route === 'NEEDS_CONFIRM' ? 'bg-cyan-500/10 text-cyan-400' :
                        f.route === 'CONFLICT' ? 'bg-rose-500/10 text-rose-400' :
                        f.route === 'ANOMALY' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-slate-500/10 text-slate-500'
                      }`}>
                        {f.route}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all">
                        <ArrowRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Column 3: Field Detail Drawer (Right) */}
        <aside className="w-[450px] border-l border-slate-800 bg-slate-900/30 flex flex-col overflow-hidden">
          {selectedField ? (
            <FieldDrawer 
              fieldId={selectedField} 
              onClose={() => setSelectedField(null)} 
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600 p-12 text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-4 border border-slate-800">
                <Brain size={32} />
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">请选择一个字段</p>
              <p className="text-xs mt-2 max-w-[200px]">点击左侧列表中的字段以查看详细的语义推断证据与决策建议。</p>
            </div>
          )}
        </aside>
      </div>

      {/* BottomSheets / Bulk Actions */}
      <footer className="h-12 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-500 uppercase font-bold">已选择 0 个字段</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded text-[10px] font-bold transition-all disabled:opacity-50" disabled>
              批量确认
            </button>
            <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded text-[10px] font-bold transition-all disabled:opacity-50" disabled>
              批量忽略
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <History size={12} />
            <span>最近裁决: 2 分钟前 by AI</span>
          </div>
          <button className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all">
            提交并保存
          </button>
        </div>
      </footer>
    </div>
  );
};
