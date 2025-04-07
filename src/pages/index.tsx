
import CircuitWorkbench from '../components/CircuitWorkbench';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Index = () => {
  const router = useRouter();
  const [experimentId, setExperimentId] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if an experiment ID was passed via query parameters
    if (router.query.experimentId) {
      setExperimentId(router.query.experimentId as string);
    }
  }, [router.query]);
  
  return <CircuitWorkbench initialExperiment={experimentId} />;
};

export default Index;
