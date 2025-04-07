
import CircuitWorkbench from '../components/CircuitWorkbench';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Index = () => {
  const location = useLocation();
  const [experimentId, setExperimentId] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if an experiment ID was passed via navigation state
    if (location.state && location.state.experimentId) {
      setExperimentId(location.state.experimentId);
    }
  }, [location]);
  
  return <CircuitWorkbench initialExperiment={experimentId} />;
};

export default Index;
