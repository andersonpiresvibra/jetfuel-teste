import React, { useState, useRef } from 'react';
import { OperatorProfile, Vehicle } from '../types';
import { X, Search, UserPlus, AlertTriangle, UserCheck } from 'lucide-react';
import useOnClickOutside from '../hooks/useOnClickOutside';

interface AssignOperatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  operators: OperatorProfile[];
  vehicle: Vehicle | null;
  onAssignOperator: (vehicleId: string, operator: OperatorProfile) => void;
}

export const AssignOperatorModal: React.FC<AssignOperatorModalProps> = ({ 
  isOpen, 
  onClose, 
  operators, 
  vehicle, 
  onAssignOperator 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, onClose);

  if (!isOpen || !vehicle) return null;

  const filteredOperators = operators.filter(op => 
    op.warName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    op.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div 
        ref={modalRef}
        className="bg-slate-900/98 backdrop-blur-2xl border border-white/10 w-full max-w-sm rounded-3xl p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300 flex flex-col relative"
      >
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20 shadow-inner">
              <UserPlus size={20} />
            </div>
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Designação</h3>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Selecione o Operador</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input 
            type="text"
            placeholder="BUSCAR OPERADOR..."
            className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-xs text-white font-bold focus:border-indigo-500/50 outline-none transition-all uppercase tracking-widest shadow-inner placeholder:text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-2 mb-6 max-h-64 overflow-y-auto custom-scrollbar pr-2">
          {filteredOperators.length > 0 ? filteredOperators.map(op => {
            const isBusy = op.status !== 'DISPONÍVEL';
            
            return (
              <button 
                key={op.id}
                onClick={() => onAssignOperator(vehicle.id, op)}
                className="w-full flex items-center justify-between p-3 rounded-2xl border border-white/5 bg-white/5 hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-500 flex items-center justify-center text-xs font-black group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-inner">
                    {op.warName.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black text-white uppercase leading-none">{op.warName}</div>
                    <div className={`text-[8px] font-black uppercase tracking-widest mt-1.5 flex items-center gap-1.5 ${
                      isBusy ? 'text-amber-500' : 'text-emerald-500'
                    }`}>
                      <div className={`w-1 h-1 rounded-full ${isBusy ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
                      {op.status}
                    </div>
                  </div>
                </div>
                
                <UserCheck size={16} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
              </button>
            );
          }) : (
            <div className="text-center py-8 text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
              Vazio
            </div>
          )}
        </div>

        <button 
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-slate-800/50 border border-white/5 text-slate-400 font-black text-[10px] hover:bg-slate-800 hover:text-white transition-all uppercase tracking-[0.2em]"
        >
          Cancelar Operação
        </button>
      </div>
    </div>
  );
};
