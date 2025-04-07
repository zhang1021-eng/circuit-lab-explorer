
import { useState, useEffect } from 'react';
import CircuitDisplay from './CircuitDisplay';
import InstrumentPanel from './InstrumentPanel';
import QuickExperimentSelector from './QuickExperimentSelector';
import GuidanceModule from './GuidanceModule';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CircuitWorkbenchProps {
  initialExperiment?: string | null;
}

const CircuitWorkbench = ({ initialExperiment = null }: CircuitWorkbenchProps) => {
  const [currentInstrument, setCurrentInstrument] = useState<'oscilloscope' | 'multimeter' | null>(null);
  const [currentExperiment, setCurrentExperiment] = useState<string | null>(initialExperiment);

  useEffect(() => {
    if (initialExperiment) {
      setCurrentExperiment(initialExperiment);
    }
  }, [initialExperiment]);

  const handleExperimentSelect = (experimentId: string) => {
    setCurrentExperiment(experimentId);
    console.log(`加载实验: ${experimentId}`);
  };

  const handleInstrumentChange = (instrument: 'oscilloscope' | 'multimeter' | null) => {
    setCurrentInstrument(instrument);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-circuit-bg text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">电路实验室探索者</h1>
        <div className="flex items-center gap-4">
          <QuickExperimentSelector onSelectExperiment={handleExperimentSelect} />
          <Link to="/experiments">
            <Button variant="outline" size="icon">
              <Menu size={18} />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-4 bg-circuit-bg">
          <CircuitDisplay experimentId={currentExperiment} />
        </div>
        
        <div className="w-1/3 bg-gray-900 border-l border-gray-700 flex flex-col">
          <InstrumentPanel 
            currentInstrument={currentInstrument}
            onInstrumentChange={handleInstrumentChange}
          />
        </div>
      </div>
      
      <div className="bg-gray-800 text-white p-4 border-t border-gray-700">
        <GuidanceModule 
          experimentId={currentExperiment} 
          currentInstrument={currentInstrument}
        />
      </div>
    </div>
  );
};

export default CircuitWorkbench;
