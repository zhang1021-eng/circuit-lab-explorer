
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
        <h3 className="text-white text-lg mb-2">数字万用表</h3>
        <p className="text-gray-400 text-sm">测量电压、电流和电阻</p>
      </div>
      
      <div className="bg-black rounded-lg p-4 mb-6">
        <div className="multimeter-display rounded-lg h-24 flex items-center justify-center">
          <span className="text-4xl font-bold tracking-wider">{reading}</span>
          <span className="text-2xl ml-2">{unit}</span>
        </div>
      </div>
      
      <Tabs defaultValue="dcv" className="flex-1" onValueChange={(v) => handleModeChange(v as MeasurementMode)}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="dcv">直流电压</TabsTrigger>
          <TabsTrigger value="acv">交流电压</TabsTrigger>
          <TabsTrigger value="dci">直流电流</TabsTrigger>
          <TabsTrigger value="aci">交流电流</TabsTrigger>
          <TabsTrigger value="res">电阻</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dcv" className="h-full">
          <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
            <h4 className="font-medium mb-2">直流电压</h4>
            <p className="text-sm mb-4">测量电路中的直流电压。</p>
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rotary-knob">
                <div className="knob-marker" style={{ transform: 'rotate(90deg)' }}></div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button onClick={simulateMeasurement}>测量</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="acv" className="h-full">
          <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
            <h4 className="font-medium mb-2">交流电压</h4>
            <p className="text-sm mb-4">测量电路中的交流电压。</p>
            <div className="flex justify-center">
              <Button onClick={simulateMeasurement}>测量</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="dci" className="h-full">
          <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
            <h4 className="font-medium mb-2">直流电流</h4>
            <p className="text-sm mb-4">测量流经电路的直流电流。</p>
            <div className="flex justify-center">
              <Button onClick={simulateMeasurement}>测量</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="aci" className="h-full">
          <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
            <h4 className="font-medium mb-2">交流电流</h4>
            <p className="text-sm mb-4">测量流经电路的交流电流。</p>
            <div className="flex justify-center">
              <Button onClick={simulateMeasurement}>测量</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="res" className="h-full">
          <div className="bg-gray-800 p-4 rounded-lg text-gray-300">
            <h4 className="font-medium mb-2">电阻</h4>
            <p className="text-sm mb-4">测量组件的电阻（欧姆）。</p>
            <div className="flex justify-center">
              <Button onClick={simulateMeasurement}>测量</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Multimeter;
