
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockAIOpsRequests } from '../../data/aiopsMock';
import { AIOpsRequest, StageId } from '../../types/aiops';
import { 
  ArrowLeft, MessageSquare, Play, CheckCircle2, AlertCircle, 
  Clock, FileText, ChevronRight, X, Send, Bot, User,
  ListTodo, Package, Activity, Info
} from 'lucide-react';
import { StageDetailContent } from '../../components/aiops/stages/StageDetailContent';

export const AIOpsRequestDetailPage: React.FC = () => {
  const { requestId, stageId } = useParams<{ requestId: string; stageId?: StageId }>();
  const navigate = useNavigate();
  const [request, setRequest] = useState<AIOpsRequest | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'runs' | 'tasks' | 'deliverables'>('chat');
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    const found = mockAIOpsRequests.find(r => r.id === requestId);
    if (found) setRequest(found);
  }, [requestId]);

  if (!request) return <div className="p-10 text-center text-slate-500">加载中...</div>;

  const handleStageClick = (sId: StageId) => {
    navigate(`/aiops/workbench/requests/${requestId}/stages/${sId}`);
  };

  const closeDrawer = () => {
    navigate(`/aiops/workbench/requests/${requestId}`);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/aiops/workbench" className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{request.title}</h1>
              <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded text-[10px] font-bold uppercase tracking-wider">
                {request.status === 'active' ? '进行中' : '草稿'}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{request.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium transition-colors border border-slate-700">
            暂停需求
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-900/20">
            完成交付
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Column: Stages & Progress */}
        <div className="w-80 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-5 backdrop-blur-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity size={14} /> 阶段进度
            </h3>
            <div className="space-y-3">
              {request.stages.map((stage, idx) => (
                <div 
                  key={stage.id}
                  onClick={() => handleStageClick(stage.id)}
                  className={`relative p-4 rounded-xl border transition-all cursor-pointer group ${
                    stageId === stage.id 
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                      : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Stage {stage.id}</span>
                    {stage.status === 'completed' ? (
                      <CheckCircle2 size={14} className="text-emerald-500" />
                    ) : stage.status === 'running' ? (
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
                    ) : stage.status === 'failed' ? (
                      <AlertCircle size={14} className="text-rose-500" />
                    ) : (
                      <Clock size={14} className="text-slate-600" />
                    )}
                  </div>
                  <h4 className={`font-bold text-sm ${stageId === stage.id ? 'text-cyan-400' : 'text-slate-200'}`}>{stage.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{stage.description}</p>
                  
                  {idx < request.stages.length - 1 && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-px h-3 bg-slate-700"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interaction & Details */}
        <div className="flex-1 bg-slate-800/40 rounded-2xl border border-slate-700/50 backdrop-blur-sm flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center px-6 border-b border-slate-700/50 bg-slate-900/30">
            {[
              { id: 'chat', label: 'Chat & Plan', icon: <MessageSquare size={16} /> },
              { id: 'runs', label: 'Runs 进度', icon: <Play size={16} /> },
              { id: 'tasks', label: '任务看板', icon: <ListTodo size={16} /> },
              { id: 'deliverables', label: '交付物', icon: <Package size={16} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all relative ${
                  activeTab === tab.id ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {activeTab === 'chat' && (
              <div className="h-full flex flex-col">
                <div className="flex-1 space-y-6 mb-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                      <Bot size={18} />
                    </div>
                    <div className="bg-slate-900/80 p-4 rounded-2xl rounded-tl-none border border-slate-700 max-w-[80%]">
                      <p className="text-sm text-slate-200 leading-relaxed">
                        你好！我是你的 AI 运营助手。目前该需求处于 <span className="text-cyan-400 font-bold">Stage C: 质量规则与检测</span> 阶段。
                        我已经自动生成了初步的质量检测计划，并发现了一些需要你关注的硬性阻碍（Hard-block）。
                      </p>
                      <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                        <p className="text-xs font-bold text-indigo-400 uppercase mb-2">当前计划建议</p>
                        <ul className="text-xs text-slate-400 space-y-1.5">
                          <li className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-400 rounded-full"></div> 优先修复客户表地址字段的空值问题</li>
                          <li className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-400 rounded-full"></div> 启动 Stage D 的语义预扫描</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-none max-w-[80%] shadow-lg shadow-indigo-900/20">
                      <p className="text-sm text-white leading-relaxed">
                        好的，请帮我先执行 Stage D 的预扫描，并把扫描结果汇总到交付物中。
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white flex-shrink-0">
                      <User size={18} />
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="输入指令或提问，例如：'生成本阶段报告'..." 
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'runs' && (
              <div className="space-y-4">
                {request.runs.map(run => (
                  <div key={run.id} className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${run.status === 'running' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                        {run.status === 'running' ? <Activity size={20} /> : <CheckCircle2 size={20} />}
                      </div>
                      <div>
                        <p className="font-bold text-white">Stage {run.stageId} 执行记录</p>
                        <p className="text-xs text-slate-500">{new Date(run.startTime).toLocaleString()} - {run.endTime ? new Date(run.endTime).toLocaleTimeString() : '进行中'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${run.progress}%` }}></div>
                      </div>
                      <span className="text-sm font-mono text-cyan-400">{run.progress}%</span>
                      <ChevronRight size={18} className="text-slate-600" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2">
                    <AlertCircle size={14} /> Hard-block (阻碍性任务)
                  </h4>
                  {request.tasks.filter(t => t.type === 'hard-block').map(task => (
                    <div key={task.id} className="bg-slate-900/50 border-l-4 border-l-rose-500 border border-slate-700 p-4 rounded-r-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${task.status === 'done' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                          {task.status === 'done' ? '已修复' : '待处理'}
                        </span>
                        <button className="text-slate-500 hover:text-white transition-colors"><Info size={14} /></button>
                      </div>
                      <p className="text-sm font-medium text-slate-200">{task.title}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                    <ListTodo size={14} /> Soft-task (优化任务)
                  </h4>
                  {request.tasks.filter(t => t.type === 'soft-task').map(task => (
                    <div key={task.id} className="bg-slate-900/50 border-l-4 border-l-cyan-500 border border-slate-700 p-4 rounded-r-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${task.status === 'done' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                          {task.status === 'done' ? '已完成' : '进行中'}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-200">{task.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'deliverables' && (
              <div className="grid grid-cols-3 gap-4">
                {request.deliverables.map(del => (
                  <div key={del.id} className="bg-slate-900/50 border border-slate-700 p-4 rounded-xl hover:border-cyan-500/50 transition-all group cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 mb-4 transition-colors">
                      <FileText size={24} />
                    </div>
                    <p className="font-bold text-sm text-slate-200 mb-1">{del.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase">{del.type} 文件</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stage Detail Drawer */}
      {stageId && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={closeDrawer}></div>
          <div className="relative w-[600px] h-full bg-slate-900 border-l border-slate-700 shadow-2xl animate-in slide-in-from-right duration-300">
            <button 
              onClick={closeDrawer}
              className="absolute top-6 right-6 p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white z-20"
            >
              <X size={20} />
            </button>
            <StageDetailContent stageId={stageId} requestId={requestId!} />
          </div>
        </div>
      )}
    </div>
  );
};
