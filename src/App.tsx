// src/App.tsx
import mixpanel from 'mixpanel-browser';
import PlanComparisonTool from './components/PlanComparisonTool';
import ChatBot from './components/ChatBot';

// Helper to get or create a persistent distinct ID
const getOrCreateDistinctId = (): string => {
  let id = localStorage.getItem('distinct_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('distinct_id', id);
  }
  return id;
};

// Helper to detect device type
const getDeviceType = (): string => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Helper to get browser name
const getBrowserName = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown';
};

// Initialize Mixpanel with page view tracking enabled
mixpanel.init("279095a5ea069a0f5f5ee40971a60101", {
  debug: false,
  track_pageview: true,  // Enable automatic page view tracking
  persistence: 'localStorage',
});

// Identify user synchronously to avoid race condition
mixpanel.identify(getOrCreateDistinctId());

// Set super properties that persist across all events
mixpanel.register({
  'App Version': '1.0.0',
  'Platform': 'web',
  'Browser': getBrowserName(),
  'Device Type': getDeviceType(),
});

// Set user profile properties on first visit
mixpanel.people.set_once({
  'First Seen': new Date().toISOString(),
});

// Track App Loaded event with screen dimensions and referrer
mixpanel.track('App Loaded', {
  referrer: document.referrer || 'direct',
  screen_width: window.innerWidth,
  screen_height: window.innerHeight,
  browser: getBrowserName(),
  device_type: getDeviceType(),
});

function App() {
    
  return (
    <>
      <PlanComparisonTool />
      <ChatBot />
    </>
  );
}

export default App;
