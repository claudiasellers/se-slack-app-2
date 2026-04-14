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

// Initialize Mixpanel with page view tracking and session replay
// Session replay options are newer than @types/mixpanel-browser, so we extend the config
mixpanel.init("279095a5ea069a0f5f5ee40971a60101", {
  debug: false,
  track_pageview: true,
  persistence: 'localStorage',
  // Session Replay
  record_sessions_percent: 100,   // record all sessions (internal tool)
  record_mask_all_text: false,     // plan data is public, no PII to mask
  record_mask_all_inputs: false,   // unmask inputs (API key field is type="password", always masked by Mixpanel)
  record_console: true,            // capture console for debugging
  record_heatmap_data: true,       // track clicks, rage clicks, dead clicks
  record_idle_timeout_ms: 1800000, // end replay after 30 min idle
} as Parameters<typeof mixpanel.init>[1]);

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
