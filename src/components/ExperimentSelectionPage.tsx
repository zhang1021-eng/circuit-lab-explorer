
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { useRouter } from 'next/router';

const experiments = [
  {
    id: 'rc-filter',
    name: 'RC 滤波电路',
    description: '学习RC滤波器和频率响应',
    category: 'basics',
    difficulty: '初级'
  },
  {
    id: 'led-circuit',
    name: 'LED 电路',
    description: '搭建和测试简单的LED电路',
    category: 'basics',
    difficulty: '初级'
  },
  {
    id: 'op-amp',
    name: '运放电路',
    description: '探索运算放大器配置',
    category: 'analog',
    difficulty: '中级'
  },
  {
    id: 'rectifier',
    name: '二极管整流器',
    description: '用二极管桥将交流转换为直流',
    category: 'analog',
    difficulty: '中级'
  },
  {
    id: 'astable-555',
    name: '555定时器振荡器',
    description: '使用555定时器构建一个多谐振荡器',
    category: 'digital',
    difficulty: '中级'
  },
  {
    id: 'logic-gates',
    name: '逻辑门',
    description: '探索基本数字逻辑门',
    category: 'digital',
    difficulty: '初级'
  }
];

const ExperimentSelectionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null);
  const router = useRouter();
  
  const filteredExperiments = experiments.filter(exp => {
    const matchesSearch = exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleStartExperiment = () => {
    if (selectedExperiment) {
      router.push({
        pathname: '/',
        query: { experimentId: selectedExperiment }
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-circuit-bg text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">电路实验</h1>
        
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10 bg-gray-800 text-white border-gray-700"
              placeholder="搜索实验..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="basics">基础</TabsTrigger>
              <TabsTrigger value="analog">模拟</TabsTrigger>
              <TabsTrigger value="digital">数字</TabsTrigger>
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
                  {experiment.category === 'basics' ? '基础' : 
                   experiment.category === 'analog' ? '模拟' : '数字'}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {filteredExperiments.length === 0 && (
          <div className="text-center py-8">
            <p>没有找到符合条件的实验。</p>
          </div>
        )}
        
        <div className="mt-6 flex justify-end">
          <Button 
            size="lg" 
            disabled={!selectedExperiment}
            onClick={handleStartExperiment}
          >
            开始实验
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperimentSelectionPage;
