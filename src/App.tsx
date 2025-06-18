// src/App.tsx
import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';
import PlanComparisonTool from './components/PlanComparisonTool';

mixpanel.init("279095a5ea069a0f5f5ee40971a60101", {
  debug: false,
  track_pageview: false,
  persistence: 'localStorage',
});

function App() {
  useEffect(() => {
    let distinctId = localStorage.getItem('distinct_id');
    if (!distinctId) {
      distinctId = crypto.randomUUID();
      localStorage.setItem('distinct_id', distinctId);
    }
    mixpanel.identify(distinctId);
  }, []);
    
  return (
    <PlanComparisonTool />
  );
}

export default App;