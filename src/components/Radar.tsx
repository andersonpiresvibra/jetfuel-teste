
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, Radio, Target, Info, Shield, 
  AlertTriangle, CheckCircle2, Clock, Search,
  ChevronRight, Activity, Filter, Map as MapIcon,
  Maximize2, Minimize2, Globe, Crosshair
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FlightData, FlightStatus } from '../types';
import { MOCK_FLIGHTS } from '../data/mockData';

// Configuração de ícones do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface RadarProps {
  flights?: FlightData[];
}

interface RadarTarget extends FlightData {
  angle: number;
  distance: number;
  lastDetected: number;
  lat?: number;
  lng?: number;
}

// Mapeamento simplificado de posições para coordenadas reais em SBGR (Guarulhos)
const POSITION_COORDINATES: Record<string, [number, number]> = {
  '101': [-23.4258, -46.4815],
  '102': [-23.4260, -46.4812],
  '201': [-23.4285, -46.4755],
  '202': [-23.4287, -46.4752],
  '203': [-23.4289, -46.4749],
  '204': [-23.4291, -46.4746],
  '211': [-23.4305, -46.4730],
  '301': [-23.4320, -46.4710],
  '308': [-23.4335, -46.4690],
  '401': [-23.4350, -46.4670],
  '501': [-23.4380, -46.4640],
};

// Componente para centralizar o mapa
const MapRecenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

export const Radar: React.FC<RadarProps> = ({ flights = MOCK_FLIGHTS }) => {
  const [viewMode, setViewMode] = useState<'GEOGRAPHIC' | 'LIVE'>('GEOGRAPHIC');
  const [sweepAngle, setSweepAngle] = useState(0);
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('ALL');
  
  const sbgrCenter: [number, number] = [-23.432, -46.473];

  // Simulação de posições baseada no status e mapeamento geográfico
  const radarTargets = useMemo(() => {
    return flights.map((f, index) => {
      const angle = (parseInt(f.id.replace(/\D/g, '') || '0') * 137.5) % 360;
      let distance = 80;
      
      switch (f.status) {
        case FlightStatus.ABASTECENDO: distance = 15 + (index % 10); break;
        case FlightStatus.AGUARDANDO:
        case FlightStatus.DESIGNADO: distance = 35 + (index % 15); break;
        case FlightStatus.FILA: distance = 60 + (index % 20); break;
        case FlightStatus.CHEGADA: distance = 85 + (index % 10); break;
        case FlightStatus.FINALIZADO: distance = 110 + (index % 30); break;
        default: distance = 150;
      }

      // Tenta pegar coordenada real ou gera uma próxima ao centro para simulação
      const coords = POSITION_COORDINATES[f.positionId] || [
        sbgrCenter[0] + (Math.random() - 0.5) * 0.01,
        sbgrCenter[1] + (Math.random() - 0.5) * 0.01
      ];

      return {
        ...f,
        angle,
        distance,
        lat: coords[0],
        lng: coords[1],
        lastDetected: Date.now()
      };
    });
  }, [flights]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSweepAngle(prev => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const filteredTargets = useMemo(() => {
    if (filter === 'ALL') return radarTargets;
    return radarTargets.filter(t => t.status === filter);
  }, [radarTargets, filter]);

  const selectedTarget = useMemo(() => 
    radarTargets.find(t => t.id === selectedTargetId), 
    [radarTargets, selectedTargetId]
  );

  const getMarkerIcon = (status: FlightStatus, isSelected: boolean) => {
    const color = status === FlightStatus.ABASTECENDO ? '#3b82f6' : 
                 status === FlightStatus.CHEGADA ? '#f59e0b' : '#10b981';
    
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 rounded-full ${isSelected ? 'bg-emerald-500/20 animate-ping' : ''}"></div>
          <div style="background-color: ${color};" class="w-3 h-3 rounded-full border-2 border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  return (
    <div className="w-full h-full flex bg-[#020617] text-slate-200 overflow-hidden font-sans">
      
      {/* SIDEBAR ESQUERDA */}
      <div className="w-80 border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl flex flex-col shrink-0 z-20">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Radio className="text-emerald-500 animate-pulse" size={20} />
              </div>
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-tighter leading-none">Radar</h2>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Em tempo real</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <button 
              onClick={() => setViewMode('GEOGRAPHIC')}
              className={`flex items-center justify-center gap-1 py-2 rounded-xl text-[8px] font-black uppercase tracking-tighter transition-all border ${
                viewMode === 'GEOGRAPHIC' ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-white'
              }`}
            >
              <Globe size={10} /> Mapa
            </button>
            <button 
              onClick={() => setViewMode('LIVE')}
              className={`flex items-center justify-center gap-1 py-2 rounded-xl text-[8px] font-black uppercase tracking-tighter transition-all border ${
                viewMode === 'LIVE' ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-white'
              }`}
            >
              <Activity size={10} /> Live
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input 
              type="text" 
              placeholder="BUSCAR PREFIXO..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-[10px] text-white font-mono uppercase focus:border-emerald-500/50 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
          {filteredTargets.map(target => (
            <button
              key={target.id}
              onClick={() => setSelectedTargetId(target.id)}
              className={`w-full p-3 rounded-xl border transition-all flex items-center gap-3 group ${
                selectedTargetId === target.id 
                  ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                selectedTargetId === target.id ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400 group-hover:text-white'
              }`}>
                <Plane size={16} style={{ transform: `rotate(${target.angle}deg)` }} />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white font-mono">{target.registration}</span>
                  <span className="text-[9px] font-mono text-slate-500">{target.flightNumber}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                    target.status === FlightStatus.ABASTECENDO ? 'bg-blue-500/10 text-blue-400' :
                    target.status === FlightStatus.CHEGADA ? 'bg-amber-500/10 text-amber-400' :
                    'bg-slate-800 text-slate-500'
                  }`}>
                    {target.status}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-[#020617]">
        
        {viewMode === 'LIVE' ? (
           <div className="w-full h-full bg-white relative">
             <iframe 
               src="https://www.airnavradar.com/?widget=1&z=13&hideAirportWeather=true&hideAirportCard=true&hideFlightCard=true&showLabels=true&showAirlineLogo=true&showAircraftModel=true&showRegistration=true&airport=sbgr&class=A,C,M" 
               width="100%" 
               height="100%" 
               frameBorder="0"
               title="AirNav Radar Live Feed"
               className="w-full h-full"
               scrolling="no"
             ></iframe>
             <div className="absolute top-4 left-4 bg-emerald-500 text-slate-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse z-20">
               AIRNAV LIVE: SBGR
             </div>
             <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-3 py-2 rounded-lg text-[9px] text-slate-400 font-mono z-20">
               FONTE: AIRNAV RADARBOX
             </div>
           </div>
        ) : (
          <div className="w-full h-full z-10">
            <MapContainer 
              center={sbgrCenter} 
              zoom={14} 
              className="w-full h-full"
              style={{ background: '#f8fafc' }}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; CARTO'
              />
              {filteredTargets.map(target => (
                <Marker 
                  key={target.id} 
                  position={[target.lat!, target.lng!]}
                  icon={getMarkerIcon(target.status, selectedTargetId === target.id)}
                  eventHandlers={{
                    click: () => setSelectedTargetId(target.id)
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="bg-slate-900 text-white p-2 rounded border border-slate-700 font-sans">
                      <p className="font-black text-xs">{target.registration}</p>
                      <p className="text-[10px] text-slate-400 uppercase">{target.flightNumber} • {target.status}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {selectedTarget && <MapRecenter center={[selectedTarget.lat!, selectedTarget.lng!]} />}
            </MapContainer>
          </div>
        )}

        {/* INFO OVERLAY (Mesmo da versão anterior) */}
        <AnimatePresence>
          {selectedTarget && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="absolute right-8 top-8 w-72 bg-slate-950/80 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl p-6 z-30">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-white font-mono tracking-tighter leading-none">{selectedTarget.registration}</h3>
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mt-1">{selectedTarget.airline}</p>
                </div>
                <button onClick={() => setSelectedTargetId(null)} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 transition-colors"><Minimize2 size={16} /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                    <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Voo</span>
                    <span className="text-sm font-bold text-white font-mono">{selectedTarget.flightNumber}</span>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                    <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Posição</span>
                    <span className="text-sm font-bold text-white font-mono">{selectedTarget.positionId}</span>
                  </div>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-black text-white uppercase">{selectedTarget.status}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800 flex gap-2">
                  <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-[10px] font-black py-2.5 rounded-xl transition-all uppercase tracking-widest">Abrir Ficha</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

