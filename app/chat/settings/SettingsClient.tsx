"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAgentConfig } from "../lib/state/agent-context";
import { models } from "../lib/ai/providers/providers";
import { ModelSelector } from "../components/model-selector";
import { toolKeys } from "../config/tool-list";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { saveAgentConfig } from './actions';


interface SettingsClientProps {
  defaultPrompt: string;
}

export default function SettingsClient({ defaultPrompt }: SettingsClientProps) {
  const { config, setConfig } = useAgentConfig();
  const router = useRouter();
  const { toast } = useToast();

  // If systemPrompt is empty, seed it with defaultPrompt once
  useEffect(() => {
    if (!config.system_prompt) {
      setConfig({ ...config, system_prompt: defaultPrompt });
    }
    // we intentionally run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-6 px-4">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Agent Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Model picker */}
          <div className="space-y-2">
            <h2 className="font-medium">Language Model</h2>
            <ModelSelector
              models={models}
              selectedModel={config.model}
              setSelectedModel={(m) => setConfig({ ...config, model: m })}
            />
          </div>

          {/* System prompt */}
          <div className="space-y-2">
            <h2 className="font-medium">System Prompt</h2>
            <Textarea
              value={config.system_prompt}
              onChange={(e) => setConfig({ ...config, system_prompt: e.target.value })}
              rows={10}
            />
          </div>

          {/* Tool toggles */}
          <div className="space-y-2">
            <h2 className="font-medium">Enabled Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {toolKeys.map((key) => {
                const checked = config.enabled_tools.includes(key);
                return (
                  <label key={key} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(v) => {
                        const enabled_tools = v
                          ? [...config.enabled_tools, key]
                          : config.enabled_tools.filter((k) => k !== key);
                        setConfig({ ...config, enabled_tools });
                      }}
                    />
                    {key}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => {
                saveAgentConfig(config);
                toast({
                  title: "Settings saved",
                  description: "Your settings have been saved to the database.",
                });
              }}
            >
              Save to database
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
