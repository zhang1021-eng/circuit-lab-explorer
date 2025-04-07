
import { useState } from 'react';
import Oscilloscope from './instruments/Oscilloscope';
import Multimeter from './instruments/Multimeter';
import { Button } from '@/components/ui/button';
import { AudioWaveform, Gauge } from 'lucide-react';

interface InstrumentPanelProps {
  currentInstrument: 'oscilloscope' | 'multimeter' | null;
  onInstrumentChange: (instrument: 'oscilloscope' | 'multimeter' | null) => void;
}

const InstrumentPanel = ({ currentInstrument, onInstrumentChange }: InstrumentPanelProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">仪器</h2>
        <div className="flex gap-2">
          <Button 
            variant={currentInstrument === 'oscilloscope' ? 'default' : 'outline'} 
            onClick={() => onInstrumentChange('oscilloscope')}
            className="flex items-center gap-2"
          >
            <AudioWaveform size={18} />
            示波器
          </Button>
          
          <Button 
            variant={currentInstrument === 'multimeter' ? 'default' : 'outline'} 
            onClick={() => onInstrumentChange('multimeter')}
            className="flex items-center gap-2"
          >
            <Gauge size={18} />
            万用表
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {currentInstrument === 'oscilloscope' && <Oscilloscope />}
        {currentInstrument === 'multimeter' && <Multimeter />}
        {!currentInstrument && (
          <div className="h-full flex items-center justify-center text-gray-400 p-4 text-center">
            <div>
              <p className="mb-2">选择一个仪器开始</p>
              <p className="text-sm">使用示波器查看波形或使用万用表测量电路数值</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstrumentPanel;
