# Especificación técnica — Plataforma de estudio AWS AI Practitioner

**Nombre provisional:** CertiLab  
**Versión:** 1.1  
**Certificación inicial:** AWS Certified AI Practitioner (AIF-C01)

## 1. Objetivo del proyecto

Construir una aplicación web sencilla, eficiente y escalable para estudiar y preparar certificaciones tecnológicas, comenzando por AWS Certified AI Practitioner.

La plataforma tendrá tres páginas principales:

1. **Dashboard:** visualizar el avance, continuar desde el último punto y acceder a las funcionalidades principales.
2. **Aprendizaje:** estudiar los contenidos organizados según los cinco dominios oficiales del examen.
3. **Examen de práctica:** realizar ejercicios por dominio o simulacros completos, revisar las respuestas y conocer los resultados.

La prioridad es construir una herramienta eficaz para el aprendizaje, evitando funcionalidades y complejidades innecesarias.

---

## 2. Tecnologías propuestas

| Capa | Tecnología | Uso |
|---|---|---|
| Lenguaje | TypeScript | Tipado y mantenibilidad |
| Framework frontend | Next.js (App Router) | Aplicación web y navegación |
| UI | React | Componentes de interfaz |
| Estilos | Tailwind CSS | Diseño responsive |
| Componentes | shadcn/ui | Componentes reutilizables |
| Backend | Next.js Route Handlers / Server Actions | Lógica de negocio y operaciones |
| Base de datos | Neon PostgreSQL | Almacenamiento de preguntas, contenidos y progreso |
| ORM | Drizzle ORM | Consultas y gestión de esquema de base de datos |
| Driver PostgreSQL | @neondatabase/serverless | Conexión con Neon |
| Validación | Zod | Validación de datos |
| Formularios | React Hook Form | Gestión de formularios |
| Gráficos | Recharts | Visualización de métricas y progreso |
| Repositorio | Git + GitHub | Código fuente y control de versiones |
| Hosting | Vercel | Despliegue frontend y backend |

### 2.1. Base de datos: Neon PostgreSQL

Se utilizará PostgreSQL mediante **Neon**, un servicio de base de datos PostgreSQL administrado que puede conectarse desde el Marketplace de Vercel.

Documentación:

- Neon: https://neon.tech/
- Neon en Vercel Marketplace: https://vercel.com/marketplace/neon
- Documentación Neon: https://neon.tech/docs

**¿Por qué utilizar Neon?**

- Ofrece PostgreSQL administrado.
- Dispone de un plan gratuito sujeto a límites de consumo.
- Permite almacenar preguntas, respuestas, contenidos y resultados.
- Se integra con proyectos alojados en Vercel.
- No requiere administrar un servidor de base de datos.
- Permite ampliar los recursos si el proyecto crece.

Es importante considerar que Neon es un proveedor externo integrado desde Vercel Marketplace. No es una base de datos nativa operada directamente por Vercel.

### 2.2. ¿Por qué necesitamos una base de datos?

Sí, es recomendable utilizar PostgreSQL desde el inicio.

La base de datos permitirá:

- Guardar el progreso de aprendizaje.
- Recordar la última lección visitada.
- Guardar los intentos de examen.
- Almacenar las respuestas seleccionadas.
- Registrar las preguntas correctas e incorrectas.
- Mantener un banco de preguntas organizado.
- Consultar estadísticas históricas.
- Incorporar otras certificaciones en el futuro.

Para la primera versión no será necesario desarrollar un sistema complejo de usuarios. Se puede comenzar con un único usuario y agregar autenticación posteriormente.

### 2.3. Acceso a la base de datos

Se utilizará Drizzle ORM para gestionar las consultas y el esquema de PostgreSQL.

Componentes:

- `drizzle-orm`: ORM para interactuar con PostgreSQL.
- `drizzle-kit`: gestión de esquemas y migraciones.
- `@neondatabase/serverless`: conexión con Neon.

La variable `DATABASE_URL` deberá configurarse como variable de entorno privada en Vercel.

El acceso a la base de datos se realizará desde el backend de Next.js, evitando exponer credenciales al navegador.

---

## 3. Arquitectura general

La arquitectura propuesta será la siguiente:

```text
                    USUARIO
                       |
                       v
                APLICACIÓN WEB
                    Next.js
                       |
          +------------+------------+
          |            |            |
          v            v            v
      DASHBOARD    APRENDIZAJE    EXAMEN
          |            |            |
          +------------+------------+
                       |
                       v
                BACKEND NEXT.JS
                       |
              Route Handlers
              Server Actions
                       |
                       v
                  DRIZZLE ORM
                       |
                       v
                NEON POSTGRESQL
                       |
          +------------+------------+
          |            |            |
          v            v            v
       DOMINIOS     PREGUNTAS     PROGRESO
       LECCIONES    RESPUESTAS    RESULTADOS


        GITHUB                  VERCEL
    Código fuente           Hosting y despliegue
```

### Responsabilidades

**GitHub**
- Almacenar el código fuente.
- Mantener el historial de cambios.
- Gestionar ramas y versiones.
- Permitir integración con Vercel.

**Vercel**
- Alojar la aplicación Next.js.
- Ejecutar frontend y backend.
- Gestionar despliegues.
- Configurar variables de entorno.
- Desplegar automáticamente los cambios del repositorio conectado.

**Neon**
- Alojar PostgreSQL.
- Almacenar contenidos y preguntas.
- Guardar progreso e intentos.
- Mantener los resultados históricos.

**Drizzle ORM**
- Gestionar las consultas a PostgreSQL.
- Definir la estructura de las tablas.
- Ejecutar migraciones.
- Facilitar el mantenimiento del modelo de datos.

No se necesita desarrollar un backend independiente ni administrar infraestructura adicional.

---

## 4. Página 1 — Dashboard

**Ruta:** `/`

Será la página principal de la aplicación y permitirá visualizar el estado general de preparación.

### Elementos principales

- Porcentaje general de avance.
- Cantidad de preguntas respondidas.
- Porcentaje de respuestas correctas.
- Porcentaje de respuestas incorrectas.
- Rendimiento por cada uno de los cinco dominios.
- Última actividad realizada.
- Botón para continuar estudiando.
- Acceso al último examen realizado.
- Acceso directo al módulo de aprendizaje.
- Acceso directo al módulo de práctica.

### Funcionalidad: continuar donde quedé

La aplicación debe guardar automáticamente:

- Último dominio estudiado.
- Última lección visitada.
- Estado de cada lección.
- Última pregunta respondida.
- Posición actual de un examen en curso.
- Respuestas ingresadas.
- Fecha de última actividad.

Cuando el usuario vuelva a ingresar, podrá continuar desde el último punto de estudio.

La información importante deberá persistirse en PostgreSQL y no depender exclusivamente del almacenamiento local del navegador.

---

## 5. Página 2 — Aprendizaje

**Ruta:** `/aprendizaje`

Esta sección contendrá el material educativo organizado según los cinco dominios oficiales del examen.

### Organización del contenido

Cada dominio tendrá:

- Descripción general.
- Objetivos evaluados.
- Lecciones y temas.
- Conceptos clave.
- Definiciones.
- Servicios AWS relacionados.
- Ejemplos prácticos.
- Escenarios de aplicación.
- Resumen de estudio.
- Referencias para profundizar.

### Funcionalidades

- Navegar entre los cinco dominios.
- Ingresar a cada lección.
- Marcar lecciones como pendientes, en curso o completadas.
- Visualizar el avance de cada dominio.
- Recordar la última lección visitada.
- Continuar desde el último punto estudiado.

El contenido debe ser claro, breve y enfocado en los objetivos del examen.

La finalidad no es replicar documentación extensa, sino entregar una estructura de aprendizaje que facilite comprender los conceptos y servicios que AWS evalúa.

---

## 6. Página 3 — Examen de práctica

**Ruta:** `/examen`

Esta será una de las funcionalidades más importantes de la aplicación.

Debe permitir realizar prácticas específicas por dominio o simulacros completos que reproduzcan las condiciones del examen.

### 6.1. Práctica por dominio

El usuario podrá seleccionar uno o varios de los cinco dominios oficiales.

| Dominio | Peso oficial |
|---|---:|
| 1. Fundamentos de IA y ML | 20% |
| 2. Fundamentos de IA generativa | 24% |
| 3. Aplicaciones de modelos fundacionales | 28% |
| 4. Directrices de IA responsable | 14% |
| 5. Seguridad, cumplimiento y gobernanza de IA | 14% |

### Opciones de configuración

- Seleccionar un dominio específico.
- Seleccionar varios dominios.
- Practicar todos los dominios.
- Elegir cantidad de preguntas.
- Elegir dificultad: básica, intermedia, avanzada o mixta.
- Seleccionar modalidad de aprendizaje o evaluación.

### Modalidades

**Modo aprendizaje**

- El usuario responde una pregunta.
- El sistema muestra inmediatamente si la respuesta es correcta.
- Se muestra la explicación correspondiente.
- Se explica por qué las demás alternativas son incorrectas.
- Se puede continuar con la siguiente pregunta.

**Modo evaluación**

- El usuario responde todas las preguntas.
- No se muestran las respuestas correctas durante el examen.
- Al finalizar se muestran los resultados.
- Se habilita la revisión detallada de todas las respuestas.

### 6.2. Simulacro completo

Se debe implementar una modalidad que reproduzca las condiciones del examen oficial.

Características:

- 65 preguntas.
- 90 minutos de duración.
- Distribución proporcional de preguntas según los pesos de los cinco dominios.
- Preguntas de selección única.
- Preguntas de selección múltiple.
- Preguntas de ordenamiento.
- Preguntas de asociación.
- Cronómetro visible.
- Posibilidad de avanzar y retroceder entre preguntas.
- Posibilidad de marcar preguntas para revisar.
- Guardado automático de respuestas.
- Guardado de la posición actual.
- Finalización automática al agotarse el tiempo.

**Consideración sobre el examen oficial:**

La guía de AWS indica que el examen contiene 65 preguntas, de las cuales 50 cuentan para la puntuación y 15 no cuentan. Estas últimas no se identifican durante el examen.

Nuestra aplicación simulará las 65 preguntas, pero no intentará identificar cuáles serían las preguntas no puntuadas del examen real.

### 6.3. Resultados del examen

Una vez finalizado el examen, se mostrará un resumen con:

- Total de preguntas.
- Respuestas correctas.
- Respuestas incorrectas.
- Preguntas sin responder.
- Porcentaje de aciertos.
- Porcentaje de errores.
- Tiempo utilizado.
- Rendimiento por dominio.

### Cálculo de resultados

**Porcentaje de aciertos:**

Respuestas correctas / Total de preguntas × 100.

**Porcentaje de errores:**

(Respuestas incorrectas + preguntas sin responder) / Total de preguntas × 100.

Las preguntas sin responder se considerarán incorrectas para calcular el resultado de práctica.

Estos porcentajes son indicadores de rendimiento de nuestra plataforma y no equivalen a la puntuación escalada oficial de AWS.

### 6.4. Revisión de respuestas

Esta funcionalidad es fundamental para mejorar el aprendizaje.

Después de finalizar el examen, el usuario podrá revisar todas las preguntas y sus explicaciones.

Cada pregunta deberá mostrar:

1. Enunciado.
2. Respuesta seleccionada por el usuario.
3. Respuesta correcta.
4. Estado de la respuesta.
5. Explicación de por qué la respuesta correcta es correcta.
6. Explicación de por qué las demás alternativas son incorrectas.
7. Dominio al que pertenece.
8. Tema evaluado.
9. Fuente o referencia para profundizar.

### Filtros de revisión

Se deberán incorporar los siguientes filtros:

- Todas las preguntas.
- Solo preguntas incorrectas.
- Solo preguntas correctas.
- Preguntas sin responder.

Al ingresar a los resultados, se deberán destacar primero las preguntas incorrectas, para facilitar la identificación de los conceptos que necesitan reforzarse.

Sin embargo, las explicaciones de las preguntas correctas también deberán estar disponibles.

### 6.5. Validación de respuestas según el formato

El sistema deberá considerar las particularidades de cada tipo de pregunta:

- **Selección única:** validar la alternativa seleccionada.
- **Selección múltiple:** comparar el conjunto completo de alternativas seleccionadas con las respuestas correctas.
- **Ordenamiento:** validar la secuencia seleccionada.
- **Asociación:** validar las correspondencias entre los elementos.

---

## 7. Fuentes de aprendizaje y preguntas

La calidad del contenido será uno de los factores más importantes del proyecto.

Se utilizarán fuentes oficiales de AWS y plataformas externas como material complementario.

### 7.1. Fuentes oficiales de AWS

**1. Guía oficial del examen AIF-C01**

https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html

Será la principal referencia para:

- Dominios del examen.
- Ponderaciones.
- Objetivos evaluados.
- Tipos de preguntas.
- Servicios AWS incluidos.
- Actualizaciones de la certificación.

**2. AWS Skill Builder**

https://skillbuilder.aws/

Se utilizará para obtener:

- Cursos gratuitos.
- Material de aprendizaje.
- Videos.
- Evaluaciones.
- Rutas de preparación.

Algunos cursos, laboratorios y simulacros pueden ser de pago, por lo que se deberá comprobar la disponibilidad gratuita de cada recurso.

**3. Documentación oficial AWS**

https://docs.aws.amazon.com/

Se utilizará para profundizar en conceptos y servicios concretos, como:

- Amazon Bedrock.
- Amazon SageMaker AI.
- Amazon S3.
- IAM.
- Servicios de seguridad.
- Servicios relacionados con IA generativa.

### 7.2. Plataformas externas de práctica

Se utilizarán como referencias complementarias para ampliar la variedad de preguntas y conocer diferentes enfoques de evaluación.

| Plataforma | Uso propuesto | Enlace |
|---|---|---|
| SaveMyCert | Preguntas y explicaciones organizadas por dominio | https://www.savemycert.com/practice/aws-ai-practitioner/ |
| ExamPark | Simulacros y preguntas de práctica | https://exampark.app/exams/aws-ai-practitioner/ |
| CertSafari | Ampliar variedad de preguntas y contrastar explicaciones | https://www.certsafari.com/aws/ai-practitioner-associate/practice-questions |

Estas plataformas no son fuentes oficiales de AWS. Sus bancos pueden cambiar, tener límites gratuitos o no estar completamente actualizados.

Por lo tanto, sus contenidos deberán contrastarse con la guía oficial y la documentación de AWS.

### 7.3. Consideraciones sobre las preguntas

No se deberán copiar masivamente preguntas, respuestas ni explicaciones de plataformas externas sin autorización o licencia.

La plataforma priorizará preguntas originales elaboradas a partir de:

- Objetivos oficiales del examen.
- Documentación AWS.
- Conceptos técnicos.
- Escenarios prácticos.
- Servicios evaluados.

Las plataformas externas se utilizarán como referencia de formato, dificultad y estilo.

### 7.4. Información que debe almacenarse por pregunta

Cada pregunta deberá contar con:

- Identificador único.
- Enunciado.
- Tipo de pregunta.
- Opciones disponibles.
- Respuesta o respuestas correctas.
- Explicación de la respuesta correcta.
- Explicación de las alternativas incorrectas.
- Dominio.
- Tema.
- Dificultad.
- Fuente o referencia.
- Fecha de creación.
- Fecha de última validación.
- Versión de la guía del examen.
- Estado de publicación.

---

## 8. Tipos de preguntas

La aplicación deberá soportar los cuatro formatos contemplados en la guía del examen:

1. Selección única.
2. Selección múltiple.
3. Ordenamiento.
4. Asociación de conceptos.

La estructura de las preguntas deberá permitir incorporar nuevos formatos en el futuro sin tener que modificar completamente el sistema.

---

## 9. Modelo inicial de base de datos PostgreSQL

Se propone comenzar con una estructura sencilla, pero preparada para ampliarse.

| Tabla | Propósito |
|---|---|
| `certifications` | Almacenar las certificaciones disponibles |
| `domains` | Dominios y ponderaciones de cada certificación |
| `lessons` | Contenidos de aprendizaje |
| `questions` | Preguntas, opciones, respuestas y explicaciones |
| `exam_attempts` | Intentos de examen, modalidad, estado y resultado |
| `exam_attempt_questions` | Preguntas asignadas a cada intento y su orden |
| `question_attempts` | Respuestas seleccionadas y resultados por pregunta |
| `learning_progress` | Lecciones completadas y última posición de estudio |

### Consideraciones de diseño

- Utilizar JSONB para almacenar opciones y estructuras variables cuando corresponda.
- Mantener las relaciones principales mediante claves foráneas.
- Guardar las respuestas de cada usuario por intento.
- Mantener el historial de exámenes.
- Evitar sobrescribir resultados anteriores al actualizar preguntas.
- Versionar las preguntas o almacenar una copia del enunciado, opciones y respuestas dentro del intento.

Esto permitirá que los resultados históricos no cambien si posteriormente se modifica una pregunta.

La estructura deberá contemplar un identificador de certificación, de manera que en el futuro puedan agregarse otras certificaciones sin tener que reconstruir la base de datos.

---

## 10. Estructura de rutas

| Ruta | Funcionalidad |
|---|---|
| `/` | Dashboard |
| `/aprendizaje` | Índice de aprendizaje |
| `/aprendizaje/[dominio]` | Contenido de un dominio |
| `/aprendizaje/[dominio]/[leccion]` | Lección específica |
| `/examen` | Configuración de práctica |
| `/examen/[intentoId]` | Resolver examen |
| `/examen/[intentoId]/resultado` | Resultados y revisión |

La navegación principal tendrá únicamente tres secciones:

- Dashboard.
- Aprendizaje.
- Examen de práctica.

Las rutas internas permitirán acceder directamente a una lección, un examen en curso o sus resultados.

---

## 11. Alcance de la primera versión (MVP)

El objetivo es desarrollar una primera versión funcional sin agregar funcionalidades que no sean necesarias para la preparación.

### Funcionalidades incluidas

- Dashboard con avance general.
- Opción para continuar donde quedó el usuario.
- Módulo de aprendizaje dividido en cinco dominios.
- Contenido educativo por dominio.
- Banco de preguntas.
- Preguntas de selección única.
- Preguntas de selección múltiple.
- Preguntas de ordenamiento.
- Preguntas de asociación.
- Práctica por dominio.
- Simulacro completo de 65 preguntas.
- Cronómetro de 90 minutos.
- Corrección automática.
- Porcentaje de aciertos y errores.
- Explicaciones para todas las preguntas.
- Filtro para revisar preguntas incorrectas.
- Guardado de progreso.
- Historial de intentos.
- Diseño responsive para computador y celular.

### Funcionalidades fuera del alcance inicial

- Tutor conversacional con IA.
- Generación automática de preguntas mediante IA.
- Aplicación móvil nativa.
- Gamificación.
- Rankings y funciones sociales.
- Panel administrativo avanzado.
- Integraciones externas complejas.
- Soporte visual para múltiples certificaciones desde el inicio.

La arquitectura de la base de datos deberá quedar preparada para incorporar nuevas certificaciones en el futuro.

---

## 12. Plan de implementación

| Etapa | Entregable |
|---|---|
| 1. Base del proyecto | Repositorio GitHub, Next.js, TypeScript y despliegue inicial en Vercel |
| 2. Base de datos | Neon PostgreSQL, Drizzle ORM, esquema y cinco dominios iniciales |
| 3. Aprendizaje | Página de estudio, lecciones y persistencia del progreso |
| 4. Banco de preguntas | Modelo de preguntas y carga de preguntas originales |
| 5. Práctica | Selección por dominio, corrección y explicaciones |
| 6. Simulacro | Examen completo, cronómetro, guardado y resultados |
| 7. Dashboard | Métricas generales, rendimiento por dominio y continuar donde quedó |
| 8. Validación | Pruebas funcionales, seguridad, responsive y revisión del contenido |

---

## 13. Criterios de aceptación

La primera versión estará lista cuando:

- El dashboard muestre el avance general.
- El usuario pueda continuar la última lección visitada.
- El usuario pueda continuar un examen guardado.
- Se puedan estudiar los cinco dominios.
- Se pueda seleccionar uno o varios dominios para practicar.
- Se pueda iniciar un simulacro completo de 65 preguntas.
- Se soporten los cuatro formatos de preguntas.
- El sistema calcule correctamente aciertos, errores y preguntas sin responder.
- Se puedan revisar todas las preguntas.
- Se puedan filtrar las preguntas incorrectas.
- Cada pregunta tenga una explicación y una referencia.
- El progreso y los resultados persistan al cerrar y volver a abrir la aplicación.

---

## 14. Documentación de tecnologías

- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs
- Neon PostgreSQL: https://neon.tech/docs
- Neon en Vercel Marketplace: https://vercel.com/marketplace/neon
- Drizzle ORM: https://orm.drizzle.team/docs/overview
- GitHub: https://docs.github.com/
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com/
- Zod: https://zod.dev/
- React Hook Form: https://react-hook-form.com/
- Recharts: https://recharts.org/

---

## 15. Decisión técnica final

La combinación tecnológica recomendada para el proyecto será:

**Frontend y backend:**
- Next.js.
- React.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.

**Base de datos:**
- Neon PostgreSQL.
- Drizzle ORM.
- @neondatabase/serverless.

**Infraestructura y repositorio:**
- Vercel.
- GitHub.

No se utilizará Supabase.

No se requiere un backend independiente ni administrar un servidor PostgreSQL propio. Neon proporcionará la base de datos administrada, mientras que Vercel alojará la aplicación y ejecutará la lógica del servidor.

Esta arquitectura permitirá desarrollar y mantener una aplicación pequeña, con persistencia del progreso y una estructura preparada para incorporar nuevas certificaciones.

**Principio del proyecto:** primero asegurar una buena experiencia de aprendizaje y práctica para AWS AI Practitioner; posteriormente ampliar la plataforma. La cantidad de preguntas no debe sustituir la calidad, vigencia y explicación de cada una.