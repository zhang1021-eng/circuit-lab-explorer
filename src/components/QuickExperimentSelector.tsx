
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

interface QuickExperimentSelectorProps {
  onSelectExperiment: (experimentId: string) => void;
}

const experiments = [
  { id: 'rc-filter', name: 'RC 滤波电路' },
  { id: 'led-circuit', name: 'LED 电路' },
  { id: 'op-amp', name: '运放电路' },
];

const QuickExperimentSelector = ({ onSelectExperiment }: QuickExperimentSelectorProps) => {
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null);
  
  const handleSelectExperiment = (experimentId: string) => {
    setSelectedExperiment(experimentId);
    onSelectExperiment(experimentId);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {selectedExperiment ? 
            experiments.find(exp => exp.id === selectedExperiment)?.name : 
            '选择实验'
          }
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {experiments.map((experiment) => (
          <DropdownMenuItem 
            key={experiment.id}
            onClick={() => handleSelectExperiment(experiment.id)}
          >
            {experiment.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickExperimentSelector;
