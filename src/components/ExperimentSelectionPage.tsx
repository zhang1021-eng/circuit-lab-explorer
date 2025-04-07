
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const experiments = [
  {
    id: 'rc-filter',
    name: 'RC Filter Circuit',
    description: 'Learn about RC filters and frequency response',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'led-circuit',
    name: 'LED Circuit',
    description: 'Build and test a simple LED circuit',
    category: 'basics',
    difficulty: 'beginner'
  },
  {
    id: 'op-amp',
    name: 'Op-Amp Circuit',
    description: 'Explore operational amplifier configurations',
    category: 'analog',
    difficulty: 'intermediate'
  },
  {
    id: 'rectifier',
    name: 'Diode Rectifier',
    description: 'Convert AC to DC with a diode bridge',
    category: 'analog',
    difficulty: 'intermediate'
  },
  {
    id: 'astable-555',
    name: '555 Timer Oscillator',
    description: 'Build an astable multivibrator with a 555 timer',
    category: 'digital',
    difficulty: 'intermediate'
  },
  {
    id: 'logic-gates',
    name: 'Logic Gates',
    description: 'Explore basic digital logic gates',
    category: 'digital',
    difficulty: 'beginner'
  }
];

const ExperimentSelectionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const filteredExperiments = experiments.filter(exp => {
    const matchesSearch = exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleStartExperiment = () => {
    if (selectedExperiment) {
      navigate('/', { state: { experimentId: selectedExperiment } });
    }
  };
  
  return (
    <div className="min-h-screen bg-circuit-bg text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Circuit Lab Experiments</h1>
        
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10 bg-gray-800 text-white border-gray-700"
              placeholder="Search experiments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="analog">Analog</TabsTrigger>
              <TabsTrigger value="digital">Digital</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExperiments.map((experiment) => (
            <div 
              key={experiment.id}
              className={`bg-gray-800 rounded-lg p-4 cursor-pointer border-2 transition-all ${
                selectedExperiment === experiment.id ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => setSelectedExperiment(experiment.id)}
            >
              <h3 className="text-xl font-medium mb-2">{experiment.name}</h3>
              <p className="text-gray-300 mb-4">{experiment.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm px-2 py-1 rounded bg-gray-700">
                  {experiment.difficulty}
                </span>
                <span className="text-sm text-blue-400">
                  {experiment.category}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {filteredExperiments.length === 0 && (
          <div className="text-center py-8">
            <p>No experiments found matching your criteria.</p>
          </div>
        )}
        
        <div className="mt-6 flex justify-end">
          <Button 
            size="lg" 
            disabled={!selectedExperiment}
            onClick={handleStartExperiment}
          >
            Start Experiment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperimentSelectionPage;
