'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, StopCircle, AlertCircle, Info, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAudioStream } from '@/app/(default)/voice-assistant/hooks/useAudioStream';
import { useAudioPlayback } from '@/app/(default)/voice-assistant/hooks/useAudioPlayback';
import { useVideoStream } from '@/app/(default)/voice-assistant/hooks/useVideoStream';
import type { Config } from '@/app/(default)/voice-assistant/types';
import { ControlDock } from '@/app/(default)/voice-assistant/components/ControlDock';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChatColumn } from '@/app/(default)/voice-assistant/components/ChatColumn';
import { PageHeader } from '@/components/ui/page-header';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { VoiceSettings } from '@/app/(default)/voice-assistant/components/VoiceSettings';
import { getSystemPrompt } from '@/app/chat/lib/ai/prompts/system-prompt';
import { fetchTopDetections } from '@/hooks/use-top-detections';
import useUser from '@/app/chat/hooks/use-user';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL;

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

const voices = ["Puck", "Charon", "Kore", "Fenrir", "Aoede"];

interface VoiceAssistantDockProps {
  className?: string;
}

export default function VoiceAssistantDock({ className = '' }: VoiceAssistantDockProps) {
  const { data: user } = useUser();
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatMode, setChatMode] = useState<'audio' | 'video' | null>(null);
  const [config, setConfig] = useState<Config>({
    systemPrompt: "Loading system prompt...",
    voice: "Puck",
    googleSearch: false,
    allowInterruptions: false,
    // languageCode: "hi-IN"

  });
  const [isConnected, setIsConnected] = useState(false);
  const [text, setText] = useState('');
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);

  useEffect(() => {
    const fetchSystemPrompt = async () => {
      if (user?.id) {
        const systemPrompt = await getSystemPrompt(user.id);
        const { pests } = await fetchTopDetections(user.id);

        const detectionContext = `
### Detection Context
\nRecent Pest Detections:\n${pests}`;

        // const fullPrompt = `${systemPrompt}\n\n${detectionContext}`;
        const fullPrompt = `${detectionContext}`;
        console.log(fullPrompt)
        setConfig(prev => ({ ...prev, systemPrompt: fullPrompt }));
      }
    };
    fetchSystemPrompt();
  }, [user?.id]);

  const wsRef = useRef<WebSocket | null>(null);
  const clientId = useRef(crypto.randomUUID());
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { error: streamError, startAudioStream, stopAudioStream } = useAudioStream();
  const { videoRef: videoStreamRef, canvasRef: canvasStreamRef, startVideoStream, stopVideoStream } = useVideoStream();
  const { handleAudioMessage } = useAudioPlayback();

  const displayError = streamError;

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.onopen = async () => {
        if (!wsRef.current) return;
        
        wsRef.current.send(JSON.stringify({
          type: 'config',
          config: config
        }));
      };

      wsRef.current.onmessage = async (event: MessageEvent) => {
        const response = JSON.parse(event.data);
        if (response.type === 'audio') {
          await handleAudioMessage(response.data);
        } else if (response.type === 'text') {
          setText(prev => prev + response.text + '\n');
        }
      };

      wsRef.current.onerror = (error: Event) => {
        const err = error as ErrorEvent;
        console.error('WebSocket error:', err.message || 'Unknown error');
        setIsStreaming(false);
      };

      wsRef.current.onclose = () => {
        setIsStreaming(false);
        setIsConnected(false);
      };
    }
  }, [wsRef, config, handleAudioMessage]);

  const startStream = async (mode: 'audio' | 'video') => {
    setChatMode(mode);
    wsRef.current = new WebSocket(`${WS_URL}/${clientId.current}`);
    setIsStreaming(true);
    setIsConnected(true);
    if (mode === 'video') {
      await startVideoStream(wsRef);
    }
    await startAudioStream(wsRef);
  };

  const stopStream = () => {
    stopAudioStream();
    if (chatMode === 'video') {
      stopVideoStream();
    }
    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING) {
        console.log("Closing WebSocket connection from stopStream.");
        wsRef.current.close(1000, "Client requested stop"); 
      }
      wsRef.current = null;
    }
    setIsStreaming(false);
    setIsConnected(false);
  };

  return (
    <div className={`sticky bottom-0 bg-background/80 backdrop-blur-sm border-t py-3 z-10 ${className}`}>
      <div className="container mx-auto px-4 flex items-center justify-center relative">
        {displayError && (
          <Alert variant="destructive" className="absolute left-0 top-0 w-full">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{displayError}</AlertDescription>
          </Alert>
        )}
        <ControlDock
          isStreaming={isStreaming}
          onStartAudio={() => startStream('audio')}
          onStartVideo={() => startStream('video')}
          onStop={stopStream}
        />
      </div>
    </div>
  );
}
