
import React from 'react';
import { StageId } from '../../../types/aiops';
import { Database, Search, ShieldCheck, Brain, Lightbulb, ArrowLeft } from 'lucide-react';

interface StageDetailProps {
  stageId: StageId;
  requestId: string;
  onBack?: () => void;
}

export const StageDetailContent: React.FC<StageDetailProps> = ({ stageId, requestId, onBack }) => {
  const renderContent = () => {
    switch (stageId) {
      case 'A':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Database className="text-cyan-400" size={20} /> 数据源连接配置
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <p className="text-xs text-slate-500 uppercase mb-1">数据库类型</p>
                  <p className="font-medium">PostgreSQL</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <p className="text-xs text-slate-500 uppercase mb-1">连接状态</p>
                  <p className="font-medium text-emerald-400">已连接</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold mb-4">采集范围</h3>
              <ul className="space-y-2">
                {['public.orders', 'public.order_items', 'public.products', 'public.customers'].map(table => (
                  <li key={table} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700">
                    <span className="font-mono text-sm">{table}</span>
                    <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded">已选中</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'B':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Search className="text-cyan-400" size={20} /> 扫描与画像概览
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-xs text-slate-500 uppercase">扫描表总数</p>
                </div>
                <div className="text-center p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <p className="text-2xl font-bold text-white">156</p>
                  <p className="text-xs text-slate-500 uppercase">字段总数</p>
                </div>
                <div className="text-center p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <p className="text-2xl font-bold text-white">1.2M</p>
                  <p className="text-xs text-slate-500 uppercase">扫描行数</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'C':
        return (
          <div className="space-y-6">
             <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShieldCheck className="text-cyan-400" size={20} /> 质量规则执行
              </h3>
              <div className="space-y-4">
                {[
                  { name: '主键唯一性校验', status: 'pass', score: 100 },
                  { name: '非空约束校验', status: 'warning', score: 85 },
                  { name: '枚举值合法性校验', status: 'pass', score: 98 },
                ].map(rule => (
                  <div key={rule.name} className="p-4 bg-slate-900 rounded-lg border border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{rule.name}</p>
                      <p className="text-xs text-slate-500">得分: {rule.score}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${rule.status === 'pass' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {rule.status === 'pass' ? '通过' : '警告'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'D':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="text-cyan-400" size={20} /> AI 语义理解
              </h3>
              <p className="text-sm text-slate-400 mb-4">AI 正在分析表与表之间的语义关联，并尝试自动匹配业务术语。</p>
              <div className="animate-pulse flex space-y-4 flex-col">
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                <div className="h-4 bg-slate-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        );
      case 'E':
        return (
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="text-cyan-400" size={20} /> 候选对象建议
              </h3>
              <div className="space-y-3">
                {['订单明细视图', '客户画像宽表', '商品销售指标集'].map(item => (
                  <div key={item} className="p-4 bg-slate-900 rounded-lg border border-slate-700 flex items-center justify-between group hover:border-cyan-500/50 transition-colors cursor-pointer">
                    <span className="font-medium">{item}</span>
                    <button className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">查看详情</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return <div>未知阶段</div>;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-slate-700 flex items-center justify-between bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h2 className="text-xl font-bold text-white">阶段 {stageId} 详情</h2>
            <p className="text-xs text-slate-500">Request: {requestId}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {renderContent()}
      </div>
    </div>
  );
};
