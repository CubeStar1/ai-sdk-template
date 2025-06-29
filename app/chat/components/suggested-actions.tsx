"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Message } from "ai";
import { memo } from "react";
interface SuggestedActionsProps {
  chatId: string;
  append: (message: Message) => Promise<string | null | undefined>;
  handleSubmit: (e: React.FormEvent<Element>, value: string) => void;
}
function PureSuggestedActions({
  chatId,
  append,
  handleSubmit,
}: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: "Analyze Plant Health",
      label: "Get insights from recent plant health analyses",
      action:
        "Analyze the latest plant health data and provide insights about plant conditions and health metrics.",
    },
    {
      title: "Pest Detection Analysis",
      label: "Review recent pest detection results",
      action:
        "Analyze the latest pest detection data and provide insights about pest types and their prevalence.",
    },
    {
      title: "Compare Plant Data",
      label: "Compare health and pest data",
      action:
        "Compare recent plant health analyses with pest detection results to identify patterns and correlations.",
    },
    {
      title: "Health Trends",
      label: "Analyze plant health trends",
      action:
        "Analyze historical plant health data to identify trends and patterns over time.",
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-2 w-full">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 20,
          }}
          transition={{
            delay: 0.05 * index,
          }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? "hidden sm:block" : "block"}
        >
          <Button
            variant="ghost"
            onClick={(e) => {
              const event = new Event("submit", {
                bubbles: true,
                cancelable: true,
              }) as unknown as React.FormEvent;
              handleSubmit(event, suggestedAction.action);
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
export const SuggestedActions = memo(PureSuggestedActions, () => true);
