
import { useState } from 'react';
import Oscilloscope from './instruments/Oscilloscope';
import Multimeter from './instruments/Multimeter';
import { Button } from '@/components/ui/button';
import { Waveform, Gauge } from 'lucide-react';

interface InstrumentPanelProps {
  currentInstrument: 'oscilloscope' | 'multimeter' | null;
  onInstrumentChange: (instrument: 'oscilloscope' | 'multimeter' | null) => void;
}

const InstrumentPanel = ({ currentInstrument, onInstrumentChange }: InstrumentPanelProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Instruments</h2>
        <div className="flex gap-2">
          <Button 
            variant={currentInstrument === 'oscilloscope' ? 'default' : 'outline'} 
            onClick={() => onInstrumentChange('oscilloscope')}
            className="flex items-center gap-2"
          >
            <Waveform size={18} />
            Oscilloscope
          </Button>
          
          <Button 
            variant={currentInstrument === 'multimeter' ? 'default' : 'outline'} 
            onClick={() => onInstrumentChange('multimeter')}
            className="flex items-center gap-2"
          >
            <Gauge size={18} />
            Multimeter
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {currentInstrument === 'oscilloscope' && <Oscilloscope />}
        {currentInstrument === 'multimeter' && <Multimeter />}
        {!currentInstrument && (
          <div className="h-full flex items-center justify-center text-gray-400 p-4 text-center">
            <div>
              <p className="mb-2">Select an instrument to begin</p>
              <p className="text-sm">Use the oscilloscope to view waveforms or the multimeter to measure circuit values</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstrumentPanel;
