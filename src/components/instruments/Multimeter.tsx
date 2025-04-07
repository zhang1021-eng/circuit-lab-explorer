
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type MeasurementMode = 'dcv' | 'acv' | 'dci' | 'aci' | 'res';

const Multimeter = () => {
  const [mode, setMode] = useState<MeasurementMode>('dcv');
  const [reading, setReading] = useState('0.00');
  const [unit, setUnit] = useState('V');
  
  // Simulate different measurements based on mode
  const simulateMeasurement = () => {
    let value: number;
    let newUnit: string;
    
    switch (mode) {
      case 'dcv':
        value = 5 + Math.random() * 0.5;
        newUnit = 'V';
        break;
      case 'acv':
        value = 220 + Math.random() * 5;
        newUnit = 'V';
        break;
      case 'dci':
        value = 0.05 + Math.random() * 0.01;
        newUnit = 'A';
        break;
      case 'aci':
        value = 0.1 + Math.random() * 0.02;
        newUnit = 'A';
        break;
      case 'res':
        value = 1000 + Math.random() * 20;
        newUnit = 'Ω';
        break;
      default:
        value = 0;
        newUnit = '';
    }
    
    setReading(value.toFixed(2));
    setUnit(newUnit);
  };
  
  // Change the measurement mode
  const handleModeChange = (newMode: MeasurementMode) => {
    setMode(newMode);
    simulateMeasurement();
  };
  
  return (
    <div className="h-full bg-circuit-multimeter-bg p-4 flex flex-col">
      <div className="mb-4">
        <h3 className="text-white text-lg mb-2">Digital Multimeter</h3>
        <p className="text-gray-400 text-sm">Measure voltage, current and resistance</p>
      </div>
      
      <div className="bg-black rounded-lg p-4 mb-6">
        <div className="multimeter-display rounded-lg h-24 flex items-center justify-center">
          <span className="text-4xl font-bold tracking-wider">{reading}</span>
          <span className="text-2xl ml-2">{unit}</span>
        </div>
      </div>
      
      <Tabs defaultValue="dcv" className="flex-1" onValueChange={(v) => handleModeChange(v as MeasurementMode)}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="dcv">DC V</TabsTrigger>
          <TabsTrigger value="acv">AC V</TabsTrigger>
          <TabsTrigger value="dci">DC A</TabsTrigger>
          <TabsTrigger value="aci">AC A</TabsTrigger>
          <TabsTrigger value="res">Ω</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dcv" className="h-full">
          <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
            <h4 className="font-medium mb-2">DC Voltage</h4>
            <p className="text-sm mb-4">Measures direct current voltage in the circuit.</p>
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rotary-knob">
                <div className="knob-marker" style={{ transform: 'rotate(90deg)' }}></div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button onClick={simulateMeasurement}>Measure</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="acv" className="h-full">
          <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
            <h4 className="font-medium mb-2">AC Voltage</h4>
            <p className="text-sm mb-4">Measures alternating current voltage in the circuit.</p>
            <div className="flex justify-center">
              <Button onClick={simulateMeasurement}>Measure</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="dci" className="h-full">
          <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
            <h4 className="font-medium mb-2">DC Current</h4>
            <p className="text-sm mb-4">Measures direct current flowing through the circuit.</p>
            <div className="flex justify-center">
              <Button onClick={simulateMeasurement}>Measure</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="aci" className="h-full">
          <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
            <h4 className="font-medium mb-2">AC Current</h4>
            <p className="text-sm mb-4">Measures alternating current flowing through the circuit.</p>
            <div className="flex justify-center">
              <Button onClick={simulateMeasurement}>Measure</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="res" className="h-full">
          <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
            <h4 className="font-medium mb-2">Resistance</h4>
            <p className="text-sm mb-4">Measures resistance of components in ohms.</p>
            <div className="flex justify-center">
              <Button onClick={simulateMeasurement}>Measure</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Multimeter;
