import { Suspense } from "react";
import { notFound } from "next/navigation";
import ExamenActivoClient from "@/components/ExamenActivoClient";
import { getExamAttempt } from "@/lib/actions";

// Tell Next.js this is a dynamic route that cannot be prerendered at build time
// export const dynamic = "force-dynamic";

async function ExamenActivoLoader({ id }: { id: string }) {
  const attempt = await getExamAttempt(parseInt(id));
  if (!attempt) notFound();

  return <ExamenActivoClient attemptId={attempt.id} />;
}

export default async function ExamenActivo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Cargando examen...</div>}>
      <ExamenActivoLoader id={id} />
    </Suspense>
  );
}
