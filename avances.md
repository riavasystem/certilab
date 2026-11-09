# Avances del Proyecto CertiLab

## Resumen General
Plataforma de estudio para AWS Certified AI Practitioner (AIF-C01).
Tecnologías: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Neon PostgreSQL, Drizzle ORM.

## Estado Actual
- [x] Estructura base (GitHub, Vercel, Next.js).
- [x] Esquema de Base de Datos (Neon + Drizzle).
- [x] Dashboard (funcional, conectado a BD).
- [x] Módulo Aprendizaje (navegación funcional, lecciones cargadas).
- [x] Módulo Examen (historial, inicio de simulacro funcional).
- [x] Carga de datos inicial (seed scripts).

## Última Actualización (2026-11-09)
- Corrección de errores de *prerendering* en páginas dinámicas mediante `Suspense`.
- Implementación de la lógica para iniciar simulacros (`createExamAttempt`).
- Carga inicial de lecciones y preguntas para el "Dominio 1: Fundamentals of AI and ML" (Agregadas más lecciones y preguntas).
- Creación de archivo de seguimiento de avances.
- Creación de archivo de seguimiento de avances (`avances.md`).
- Población incremental de más lecciones y preguntas en Dominio 1.
