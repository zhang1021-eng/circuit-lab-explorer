
import { useState, useEffect } from 'react';

interface CircuitDisplayProps {
  experimentId: string | null;
}

const CircuitDisplay = ({ experimentId }: CircuitDisplayProps) => {
  const [circuit, setCircuit] = useState<any>(null);
  
  useEffect(() => {
    if (experimentId) {
      // In a real implementation, we would load circuit data from a database or API
      const demoCircuits: Record<string, any> = {
        'rc-filter': {
          name: 'RC 滤波电路',
          description: '一个简单的RC低通滤波器',
          components: ['电阻', '电容', '电压源']
        },
        'led-circuit': {
          name: 'LED 电路',
          description: '一个带有限流电阻的简单LED电路',
          components: ['电阻', 'LED', '电压源']
        },
        'op-amp': {
          name: '运放电路',
          description: '基本运算放大器配置',
          components: ['运算放大器', '电阻', '电阻', '电压源']
        }
      };
      
      setCircuit(demoCircuits[experimentId] || null);
    } else {
      // Default circuit when no experiment is selected
      setCircuit({
        name: '默认电路',
        description: '选择一个实验开始',
        components: ['电压源']
      });
    }
  }, [experimentId]);
  
  if (!circuit) {
    return <div className="flex items-center justify-center h-full">加载电路中...</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">{circuit.name}</h2>
        <p className="text-gray-300">{circuit.description}</p>
      </div>
      
      <div className="flex-1 circuit-board rounded-lg p-4 relative">
        {/* This would be replaced with an actual circuit rendering component */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-60 text-lg">
          <div className="text-center">
            <p>电路可视化</p>
            <p className="text-sm mt-2">{circuit.components.join('，')}</p>
            
            {/* Placeholder circuit elements */}
            <div className="mt-8 flex items-center justify-center gap-6">
              {circuit.components.includes('电压源') && (
                <div className="w-12 h-12 rounded-full border-2 border-circuit-wire-red flex items-center justify-center text-circuit-wire-red">
                  <div>V</div>
                </div>
              )}
              
              {circuit.components.includes('电阻') && (
                <div className="w-24 h-8 border-2 border-circuit-copper bg-gray-700 flex items-center justify-center">
                  <div className="text-white">R</div>
                </div>
              )}
              
              {circuit.components.includes('电容') && (
                <div className="flex items-center">
                  <div className="w-2 h-12 bg-circuit-copper"></div>
                  <div className="w-2 h-12 bg-transparent"></div>
                  <div className="w-2 h-12 bg-circuit-copper"></div>
                </div>
              )}
              
              {circuit.components.includes('LED') && (
                <div className="w-8 h-8 rounded-full border-2 border-circuit-wire-green flex items-center justify-center text-circuit-wire-green animate-pulse-glow">
                  <div>LED</div>
                </div>
              )}
              
              {circuit.components.includes('运算放大器') && (
                <div className="w-16 h-16 border-2 border-circuit-wire-blue bg-gray-800 flex items-center justify-center text-circuit-wire-blue transform rotate-90">
                  <div>▶</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitDisplay;
