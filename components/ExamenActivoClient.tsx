"use client";

import { useState, useEffect } from "react";
import { getQuestionsForExam, submitAnswer, finishExam } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function ExamenActivoClient({ attemptId }: { attemptId: number }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuestions() {
      const qs = await getQuestionsForExam(attemptId);
      setQuestions(qs);
      setLoading(false);
    }
    loadQuestions();
  }, [attemptId]);

  if (loading) return <div>Cargando preguntas...</div>;
  if (questions.length === 0) return <div>No se encontraron preguntas.</div>;

  const currentQuestion = questions[currentIndex];

  const handleNext = async () => {
    await submitAnswer(attemptId, currentQuestion.id, selectedAnswer);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer("");
    } else {
      await finishExam(attemptId);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Pregunta {currentIndex + 1} de {questions.length}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg">{currentQuestion.questionText}</p>
        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
          {currentQuestion.options.map((option: string) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
        <Button onClick={handleNext} disabled={!selectedAnswer} className="w-full">
          {currentIndex === questions.length - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </CardContent>
    </Card>
  );
}
