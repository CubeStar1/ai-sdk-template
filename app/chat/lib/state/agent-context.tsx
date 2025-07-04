"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AgentConfig, defaultAgentConfig } from '../../config/agent-config';

interface AgentContextValue {
  config: AgentConfig;
  setConfig: (config: AgentConfig) => void;
}

const AgentContext = createContext<AgentContextValue>({
  config: defaultAgentConfig,
  setConfig: () => {},
});

export const AgentProvider = ({ children, initialConfig }: { children: React.ReactNode; initialConfig: AgentConfig }) => {
  const [config, setConfig] = useState<AgentConfig>(initialConfig ?? defaultAgentConfig);

  

  return (
    <AgentContext.Provider value={{ config, setConfig }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgentConfig = () => useContext(AgentContext);
