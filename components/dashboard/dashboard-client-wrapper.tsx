'use client';

import VoiceAssistantDock from './VoiceAssistantDock';

const DashboardClientWrapper = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        {/* Other dashboard components were here */}
      </div>
      <VoiceAssistantDock />
    </div>
  );
};

export default DashboardClientWrapper;

