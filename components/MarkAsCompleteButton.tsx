"use client";

import { Button } from "@/components/ui/button";
import { updateLessonProgress } from "@/lib/actions";
import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

export default function MarkAsCompleteButton({ lessonId, initialStatus }: { lessonId: number, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);

  const handleToggle = async () => {
    const newStatus = status === 'completed' ? 'pending' : 'completed';
    await updateLessonProgress(lessonId, newStatus);
    setStatus(newStatus);
  };

  return (
    <Button
      variant={status === 'completed' ? 'outline' : 'default'}
      onClick={handleToggle}
      className="flex items-center gap-2"
    >
      {status === 'completed' ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Circle className="h-4 w-4" />}
      {status === 'completed' ? 'Completado' : 'Marcar como completada'}
    </Button>
  );
}
