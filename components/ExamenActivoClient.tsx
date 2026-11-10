"use client";

import { useState, useEffect } from "react";
import { getQuestionsForExam, getSavedAnswers, submitAnswer, finishExam } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function ExamenActivoClient({ attemptId }: { attemptId: number }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadQuestions() {
      const [qs, saved] = await Promise.all([
        getQuestionsForExam(attemptId),
        getSavedAnswers(attemptId),
      ]);

      const restored: Record<number, string> = {};
      for (const s of saved) {
        if (s.questionId !== null && typeof s.userAnswer === "string") {
          restored[s.questionId] = s.userAnswer;
        }
      }

      // Reanudar en la primera pregunta sin responder
      const firstUnanswered = qs.findIndex(q => !(q.id in restored));

      setQuestions(qs);
      setAnswers(restored);
      setCurrentIndex(firstUnanswered === -1 ? Math.max(qs.length - 1, 0) : firstUnanswered);
      setLoading(false);
    }
    loadQuestions();
  }, [attemptId]);

  useEffect(() => {
    const q = questions[currentIndex];
    setSelectedAnswer(q ? answers[q.id] ?? "" : "");
  }, [currentIndex, questions, answers]);

  if (loading) return <div>Cargando preguntas...</div>;
  if (questions.length === 0) return <div>No se encontraron preguntas.</div>;

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  const handleNext = async () => {
    setSaving(true);
    await submitAnswer(attemptId, currentQuestion.id, selectedAnswer);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedAnswer }));
    setSaving(false);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await finishExam(attemptId);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Pregunta {currentIndex + 1} de {questions.length}</CardTitle>
        <p className="text-sm text-muted-foreground">{answeredCount} respondidas · Tu progreso se guarda automáticamente</p>
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
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0 || saving} className="flex-1">
            Anterior
          </Button>
          <Button onClick={handleNext} disabled={!selectedAnswer || saving} className="flex-1">
            {currentIndex === questions.length - 1 ? "Finalizar" : "Siguiente"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
