import { Suspense } from "react";
import { getExamAttempt } from "@/lib/actions";
import { notFound } from "next/navigation";

export default function ExamenActivo({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div>Cargando examen...</div>}>
      <ExamenActivoLoader params={params} />
    </Suspense>
  );
}

async function ExamenActivoLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ExamenActivoContent id={id} />;
}

async function ExamenActivoContent({ id }: { id: string }) {
