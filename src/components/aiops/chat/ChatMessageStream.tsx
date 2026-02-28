
import React from 'react';
import { ChatMessage } from '../../../types/aiops';
import { 
  Bot, User, Play, CheckCircle2, AlertCircle, 
  Clock, FileText, ChevronRight, ListTodo, Package, 
  Activity, Info, Sparkles, Wand2, Search, Brain
} from 'lucide-react';

interface ChatMessageStreamProps {
  messages: ChatMessage[];
}

export const ChatMessageStream: React.FC<ChatMessageStreamProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          {msg.sender === 'ai' && (
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-indigo-900/20">
              <Bot size={18} />
            </div>
          )}
          
          <div className={`max-w-[85%] ${msg.sender === 'user' ? 'order-1' : 'order-2'}`}>
            {renderMessageContent(msg)}
            <div className={`text-[10px] text-slate-600 mt-1.5 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          {msg.sender === 'user' && (
            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-slate-900/20 order-2">
              <User size={18} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const renderMessageContent = (msg: ChatMessage) => {
  switch (msg.type) {
    case 'user':
      return (
        <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-none shadow-lg shadow-indigo-900/20">
          <p className="text-sm text-white leading-relaxed">{msg.content}</p>
        </div>
      );
    case 'plan':
      return <SystemPlanCard data={msg.data} />;
    case 'progress':
      return <SystemProgressCard data={msg.data} />;
    case 'blocker':
      return <SystemBlockerCard data={msg.data} />;
    case 'result':
      return <SystemResultCard data={msg.data} />;
    case 'deliverable':
      return <SystemDeliverableCard data={msg.data} />;
    default:
      return (
        <div className="bg-slate-900/80 p-4 rounded-2xl rounded-tl-none border border-slate-700">
          <p className="text-sm text-slate-200 leading-relaxed">{msg.content}</p>
        </div>
      );
  }
};

const SystemPlanCard = ({ data }: { data: any }) => (
  <div className="bg-slate-900/80 p-5 rounded-2xl rounded-tl-none border border-indigo-500/30 shadow-xl shadow-indigo-900/10">
    <div className="flex items-center gap-2 mb-4">
      <Sparkles className="text-indigo-400" size={16} />
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">执行计划</h4>
    </div>
    <div className="space-y-3">
      {data.steps.map((step: any, idx: number) => (
        <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-xl">
          <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400 flex-shrink-0">
            {idx + 1}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-200">{step.title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-5 flex items-center gap-3">
      <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
        <Play size={14} /> 确认并开始
      </button>
      <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-xl text-xs font-bold border border-slate-700 transition-all">
        修改计划
      </button>
    </div>
  </div>
);

const SystemProgressCard = ({ data }: { data: any }) => (
  <div className="bg-slate-900/80 p-5 rounded-2xl rounded-tl-none border border-cyan-500/30 shadow-xl shadow-cyan-900/10">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Activity className="text-cyan-400" size={16} />
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">阶段推进摘要</h4>
      </div>
      <span className="text-xs font-mono text-cyan-400">{data.progress}%</span>
    </div>
    <div className="space-y-4">
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${data.progress}%` }}></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {data.stats.map((stat: any, idx: number) => (
          <div key={idx} className="p-3 bg-slate-800/50 border border-slate-700 rounded-xl">
            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">{stat.label}</p>
            <p className="text-lg font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SystemBlockerCard = ({ data }: { data: any }) => (
  <div className="bg-slate-900/80 p-5 rounded-2xl rounded-tl-none border border-rose-500/30 shadow-xl shadow-rose-900/10">
    <div className="flex items-center gap-2 mb-4">
      <AlertCircle className="text-rose-400" size={16} />
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">硬阻塞 / 软任务提示</h4>
    </div>
    <div className="space-y-3">
      {data.blockers.map((blocker: any, idx: number) => (
        <div key={idx} className={`p-3 rounded-xl border ${blocker.type === 'hard' ? 'bg-rose-500/10 border-rose-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
          <div className="flex items-center justify-between mb-1">
            <span className={`text-[10px] font-bold uppercase ${blocker.type === 'hard' ? 'text-rose-400' : 'text-amber-400'}`}>
              {blocker.type === 'hard' ? '硬性阻塞' : '建议任务'}
            </span>
            <button className="text-[10px] text-slate-500 hover:text-white transition-colors underline">查看详情</button>
          </div>
          <p className="text-sm font-medium text-slate-200">{blocker.title}</p>
        </div>
      ))}
    </div>
  </div>
);

const SystemResultCard = ({ data }: { data: any }) => (
  <div className="bg-slate-900/80 p-5 rounded-2xl rounded-tl-none border border-emerald-500/30 shadow-xl shadow-emerald-900/10">
    <div className="flex items-center gap-2 mb-4">
      <CheckCircle2 className="text-emerald-400" size={16} />
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">阶段结果摘要</h4>
    </div>
    <div className="space-y-4">
      <p className="text-sm text-slate-300 leading-relaxed">{data.summary}</p>
      <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase">关键指标</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">成功</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {data.metrics.map((m: any, idx: number) => (
            <div key={idx}>
              <p className="text-[10px] text-slate-500 uppercase">{m.label}</p>
              <p className="text-base font-bold text-white">{m.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SystemDeliverableCard = ({ data }: { data: any }) => (
  <div className="bg-slate-900/80 p-5 rounded-2xl rounded-tl-none border border-indigo-500/30 shadow-xl shadow-indigo-900/10">
    <div className="flex items-center gap-2 mb-4">
      <Package className="text-indigo-400" size={16} />
      <h4 className="text-sm font-bold text-white uppercase tracking-wider">交付物汇总</h4>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {data.items.map((item: any, idx: number) => (
        <div key={idx} className="p-3 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-indigo-500/50 transition-all cursor-pointer group">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={14} className="text-slate-500 group-hover:text-indigo-400" />
            <span className="text-xs font-medium text-slate-200 truncate">{item.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 uppercase">{item.type}</span>
            <ChevronRight size={12} className="text-slate-600 group-hover:text-indigo-400" />
          </div>
        </div>
      ))}
    </div>
    <button className="w-full mt-4 py-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center justify-center gap-2">
      <Package size={14} /> 查看所有交付物
    </button>
  </div>
);
