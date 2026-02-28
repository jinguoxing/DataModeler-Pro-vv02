
import React, { useState } from 'react';
import { 
  X, Database, Globe, Table, Wand2, Sparkles, 
  UserCheck, Users, Play, Save, Info, CheckCircle2, AlertCircle
} from 'lucide-react';

interface RequestCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any, startNow: boolean) => void;
}

export const RequestCreateModal: React.FC<RequestCreateModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [domain, setDomain] = useState('retail');
  const [datasource, setDatasource] = useState('pg_prod_01');
  const [selectedAssets, setSelectedAssets] = useState<string[]>(['public.orders', 'public.customers']);
  const [useCurrentContext, setUseCurrentContext] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState({
    id: 'emp-l2-semantic',
    name: '数据语义理解 (L2)',
    level: 'L2',
    scopeMatch: true
  });

  if (!isOpen) return null;

  const quickPrompts = [
    { label: '一键运行全流程 (L2)', icon: <Sparkles size={14} /> },
    { label: '只跑扫描', icon: <Database size={14} /> },
    { label: '只跑语义理解', icon: <Globe size={14} /> },
    { label: '生成候选对象', icon: <Table size={14} /> },
    { label: '生成质量规则草案', icon: <Wand2 size={14} /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <PlusIcon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">发起 AI 运营需求</h2>
              <p className="text-xs text-slate-500">对话驱动的自动化语义治理流程</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Section A: Context */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Database size={16} className="text-cyan-400" /> Section A: 上下文 (Context)
              </h3>
              <label className="flex items-center gap-2 cursor-pointer group">
                <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">从当前页面带入</span>
                <div 
                  onClick={() => setUseCurrentContext(!useCurrentContext)}
                  className={`w-8 h-4 rounded-full transition-colors relative ${useCurrentContext ? 'bg-cyan-500' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${useCurrentContext ? 'left-4.5' : 'left-0.5'}`}></div>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 ml-1">业务域 (Domain)</label>
                <select 
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="retail">零售业务域</option>
                  <option value="finance">财务域</option>
                  <option value="supply_chain">供应链域</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 ml-1">数据源 (Datasource)</label>
                <select 
                  value={datasource}
                  onChange={(e) => setDatasource(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="pg_prod_01">PostgreSQL 生产库 01</option>
                  <option value="dw_snowflake">Snowflake 数据仓库</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-500 ml-1 flex items-center justify-between">
                资产选择 (Asset Picker)
                <span className="text-[10px] text-cyan-400 cursor-pointer hover:underline">管理选择</span>
              </label>
              <div className="flex flex-wrap gap-2 p-3 bg-slate-800/50 border border-slate-700 rounded-xl min-h-[44px]">
                {selectedAssets.map(asset => (
                  <div key={asset} className="flex items-center gap-1.5 bg-slate-700 text-slate-200 px-2 py-1 rounded-lg text-xs border border-slate-600">
                    <Table size={12} className="text-cyan-400" />
                    {asset}
                    <X size={12} className="cursor-pointer hover:text-rose-400" onClick={() => setSelectedAssets(prev => prev.filter(a => a !== asset))} />
                  </div>
                ))}
                <button className="text-xs text-slate-500 hover:text-cyan-400 flex items-center gap-1 px-2 py-1">
                  <PlusIcon size={12} /> 添加表...
                </button>
              </div>
            </div>
          </section>

          {/* Section B: Request Description */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-400" /> Section B: 需求描述 (Request)
            </h3>
            <div className="relative">
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="描述你要 AI 完成什么，例如：'帮我扫描零售域订单相关的表，并自动生成逻辑视图和核心指标建议'..."
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-sm text-slate-200 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <span className="text-[10px] text-slate-600">支持 Markdown 格式</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map(prompt => (
                <button 
                  key={prompt.label}
                  onClick={() => setDescription(prompt.label)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-xs text-slate-400 hover:text-indigo-400 transition-all"
                >
                  {prompt.icon}
                  {prompt.label}
                </button>
              ))}
            </div>
          </section>

          {/* Section C: Employee Resolve */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <UserCheck size={16} className="text-emerald-400" /> Section C: 员工推荐与选择
            </h3>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BotIcon size={80} />
              </div>
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-900/40">
                  <BotIcon size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-white">{selectedEmployee.name}</h4>
                    <span className="px-1.5 py-0.5 bg-indigo-500 text-white text-[10px] font-bold rounded">L2</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {selectedEmployee.scopeMatch ? (
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <CheckCircle2 size={12} /> Scope 命中结果: OK
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-400 font-medium">
                        <AlertCircle size={12} /> Scope 不命中
                      </span>
                    )}
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">擅长: 语义建模、指标定义、画像分析</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 relative z-10">
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                  <CheckCircle2 size={14} /> Use Recommended
                </button>
                <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center justify-center gap-2">
                  <Users size={14} /> Change Employee
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <Info size={14} />
            <span className="text-xs">创建后可在工作台实时查看进度</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onCreate({ domain, datasource, selectedAssets, description }, false)}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold border border-slate-700 transition-all flex items-center gap-2"
            >
              <Save size={18} /> Create Only
            </button>
            <button 
              onClick={() => onCreate({ domain, datasource, selectedAssets, description }, true)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-900/40 transition-all flex items-center gap-2 active:scale-95"
            >
              <Play size={18} /> Create & Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlusIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

const BotIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
);
