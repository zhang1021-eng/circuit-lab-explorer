
import CircuitWorkbench from '../components/CircuitWorkbench';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Index = () => {
  const [searchParams] = useSearchParams();
  const [experimentId, setExperimentId] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if an experiment ID was passed via query parameters
    const expId = searchParams.get('experimentId');
    if (expId) {
      setExperimentId(expId);
    }
  }, [searchParams]);
  
  return <CircuitWorkbench initialExperiment={experimentId} />;
};

export default Index;
