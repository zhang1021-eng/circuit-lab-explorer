
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

const Oscilloscope = () => {
  const [timeBase, setTimeBase] = useState(1); // ms/div
  const [voltageScale, setVoltageScale] = useState(1); // V/div
  const [triggerLevel, setTriggerLevel] = useState(0);
  const [running, setRunning] = useState(true);
  
  // Generate a simple sine wave for demonstration
  const generateWaveform = () => {
    const points = [];
    const samples = 100;
    const amplitude = 40; // Pixels
    
    for (let i = 0; i < samples; i++) {
      const x = (i / samples) * 100;
      const y = 50 + amplitude * Math.sin(i / (10 / timeBase) + triggerLevel);
      points.push(`${x},${y}`);
    }
    
    return points.join(' ');
  };
  
  return (
    <div className="h-full bg-circuit-oscilloscope-bg p-4 flex flex-col">
      <div className="mb-4">
        <h3 className="text-white text-lg mb-2">Digital Oscilloscope</h3>
        <p className="text-gray-400 text-sm">Visualize time-varying signals</p>
      </div>
      
      <div className="flex-1 oscilloscope-display rounded-lg mb-4 relative">
        <div className="oscilloscope-grid"></div>
        
        {/* Waveform SVG */}
        <svg width="100%" height="100%" className={running ? '' : 'opacity-60'}>
          <polyline
            className="oscilloscope-wave"
            points={generateWaveform()}
          />
        </svg>
        
        {/* Overlay information */}
        <div className="absolute top-2 right-2 text-green-500 text-xs font-mono">
          <div>{timeBase} ms/div</div>
          <div>{voltageScale} V/div</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 bg-gray-800 p-4 rounded-lg">
        <div>
          <label className="text-gray-300 text-sm block mb-2">Time Base</label>
          <Slider 
            value={[timeBase]} 
            min={0.1} 
            max={10} 
            step={0.1} 
            onValueChange={(values) => setTimeBase(values[0])} 
          />
          <div className="text-gray-400 text-xs mt-1">{timeBase} ms/div</div>
        </div>
        
        <div>
          <label className="text-gray-300 text-sm block mb-2">Voltage Scale</label>
          <Slider 
            value={[voltageScale]} 
            min={0.1} 
            max={5} 
            step={0.1} 
            onValueChange={(values) => setVoltageScale(values[0])} 
          />
          <div className="text-gray-400 text-xs mt-1">{voltageScale} V/div</div>
        </div>
        
        <div>
          <label className="text-gray-300 text-sm block mb-2">Trigger Level</label>
          <Slider 
            value={[triggerLevel]} 
            min={-5} 
            max={5} 
            step={0.1} 
            onValueChange={(values) => setTriggerLevel(values[0])} 
          />
          <div className="text-gray-400 text-xs mt-1">{triggerLevel.toFixed(1)} V</div>
        </div>
        
        <div className="flex items-end">
          <Button 
            onClick={() => setRunning(!running)} 
            variant={running ? "destructive" : "default"}
            className="w-full"
          >
            {running ? "Stop" : "Run"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Oscilloscope;
