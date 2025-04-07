
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
            title: 'Setup the RC Filter Circuit',
            description: 'Connect the resistor and capacitor in series with the voltage source.',
            instrumentRequired: null,
          },
          {
            title: 'Measure Input Voltage',
            description: 'Use the multimeter to measure the input voltage across the circuit.',
            instrumentRequired: 'multimeter',
          },
          {
            title: 'Observe the Filter Response',
            description: 'Use the oscilloscope to observe how the circuit filters different frequencies.',
            instrumentRequired: 'oscilloscope',
          }
        ],
        'led-circuit': [
          {
            title: 'Connect the LED Circuit',
            description: 'Connect the LED with a current-limiting resistor to the voltage source.',
            instrumentRequired: null,
          },
          {
            title: 'Measure Voltage Drop',
            description: 'Use the multimeter to measure the voltage drop across the LED.',
            instrumentRequired: 'multimeter',
          },
          {
            title: 'Measure Current Flow',
            description: 'Use the multimeter to measure the current flowing through the LED.',
            instrumentRequired: 'multimeter',
          }
        ],
        'op-amp': [
          {
            title: 'Build the Op-Amp Circuit',
            description: 'Connect the operational amplifier according to the given configuration.',
            instrumentRequired: null,
          },
          {
            title: 'Apply Input Signal',
            description: 'Apply a small input signal to observe amplification.',
            instrumentRequired: null,
          },
          {
            title: 'Observe Output Waveform',
            description: 'Use the oscilloscope to observe the amplified output waveform.',
            instrumentRequired: 'oscilloscope',
          }
        ]
      };
      
      setSteps(guidanceSteps[experimentId] || []);
      setCurrentStep(0);
    } else {
      setSteps([{
        title: 'Select an Experiment',
        description: 'Choose an experiment from the dropdown menu to begin.',
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
    return <div>No guidance available.</div>;
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
            This step requires the {currentStepData.instrumentRequired}. Please select it from the instruments panel.
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
          Previous
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
          Next
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default GuidanceModule;
