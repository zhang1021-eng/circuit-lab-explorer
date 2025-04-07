
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GuidanceModuleProps {
  experimentId: string | null;
  currentInstrument: 'oscilloscope' | 'multimeter' | null;
}

interface GuidanceStep {
  title: string;
  description: string;
  instrumentRequired: 'oscilloscope' | 'multimeter' | null;
}

const GuidanceModule = ({ experimentId, currentInstrument }: GuidanceModuleProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<GuidanceStep[]>([]);

  useEffect(() => {
    if (experimentId) {
      // In a real application, these would be loaded from a database or API
      const guidanceSteps: Record<string, GuidanceStep[]> = {
        'rc-filter': [
          {
            title: '搭建RC滤波电路',
            description: '将电阻和电容串联连接到电压源。',
            instrumentRequired: null,
          },
          {
            title: '测量输入电压',
            description: '使用万用表测量电路的输入电压。',
            instrumentRequired: 'multimeter',
          },
          {
            title: '观察滤波器响应',
            description: '使用示波器观察电路如何过滤不同频率。',
            instrumentRequired: 'oscilloscope',
          }
        ],
        'led-circuit': [
          {
            title: '连接LED电路',
            description: '将LED与限流电阻连接到电压源。',
            instrumentRequired: null,
          },
          {
            title: '测量压降',
            description: '使用万用表测量LED上的压降。',
            instrumentRequired: 'multimeter',
          },
          {
            title: '测量电流',
            description: '使用万用表测量通过LED的电流。',
            instrumentRequired: 'multimeter',
          }
        ],
        'op-amp': [
          {
            title: '搭建运放电路',
            description: '根据给定的配置连接运算放大器。',
            instrumentRequired: null,
          },
          {
            title: '应用输入信号',
            description: '应用小信号输入以观察放大效果。',
            instrumentRequired: null,
          },
          {
            title: '观察输出波形',
            description: '使用示波器观察放大后的输出波形。',
            instrumentRequired: 'oscilloscope',
          }
        ]
      };
      
      setSteps(guidanceSteps[experimentId] || []);
      setCurrentStep(0);
    } else {
      setSteps([{
        title: '选择实验',
        description: '从下拉菜单中选择一个实验开始。',
        instrumentRequired: null,
      }]);
    }
  }, [experimentId]);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];
  
  if (!currentStepData) {
    return <div>没有可用的指导。</div>;
  }

  const isInstrumentRequired = currentStepData.instrumentRequired !== null;
  const isCorrectInstrument = currentStepData.instrumentRequired === currentInstrument;

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h3 className="text-lg font-medium mb-1">{currentStepData.title}</h3>
        <p className="text-gray-300">{currentStepData.description}</p>
        
        {isInstrumentRequired && !isCorrectInstrument && (
          <div className="mt-2 text-yellow-400 text-sm">
            此步骤需要使用{currentStepData.instrumentRequired === 'oscilloscope' ? '示波器' : '万用表'}。请从仪器面板中选择它。
          </div>
        )}
      </div>
      
      <div className="flex gap-2 items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handlePrevStep}
          disabled={currentStep === 0}
        >
          <ChevronLeft size={16} />
          上一步
        </Button>
        
        <div className="text-sm text-gray-400">
          {currentStep + 1} / {steps.length}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleNextStep}
          disabled={currentStep === steps.length - 1}
        >
          下一步
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default GuidanceModule;
