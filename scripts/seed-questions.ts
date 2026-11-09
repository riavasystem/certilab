import "dotenv/config";
import { db } from "../lib/db";
import { domains, questions } from "../lib/db/schema";
import { eq } from "drizzle-orm";

async function seedQuestions() {
  console.log("🌱 Starting questions seed...");

  // Get the Domain ID for "Fundamentals of AI and ML"
  const domain = await db.select().from(domains).where(eq(domains.name, "Fundamentals of AI and ML")).limit(1);

  if (domain.length === 0) {
    console.error("❌ Domain not found. Seed domains first.");
    return;
  }

  const domainId = domain[0].id;

  const questionsData = [
    {
      domainId,
      type: "single",
      questionText: "A manufacturer uses cameras to scan products on an assembly line. Which AI capability allows the system to identify visual defects such as scratches?",
      options: ["Computer vision", "Natural language processing", "Time-series forecasting", "Speech recognition"],
      correctAnswer: "Computer vision",
      explanation: "Computer vision is the AI field that analyzes and interprets visual data such as photographs to detect defects.",
      distractorExplanations: {
        "Natural language processing": "Analyzes text, not images.",
        "Time-series forecasting": "Predicts future values, doesn't detect immediate defects.",
        "Speech recognition": "Analyzes audio, not images."
      },
      difficulty: "basic"
    },
    {
      domainId,
      type: "single",
      questionText: "A business combines a spreadsheet containing customer purchase history and a collection of free-form text reviews. What are these data types?",
      options: ["Tabular data and unstructured text data", "Time-series data and labeled data", "Image data and tabular data", "Labeled data and unstructured text data"],
      correctAnswer: "Tabular data and unstructured text data",
      explanation: "Tabular data is organized into rows and defined columns, and unstructured text data has no fixed fields.",
      distractorExplanations: {
        "Time-series data and labeled data": "Reviews are not time-series nor labeled.",
        "Image data and tabular data": "Dataset contains no images.",
        "Labeled data and unstructured text data": "Spreadsheet is not labeled data."
      },
      difficulty: "basic"
    },
    {
        domainId,
        type: "single",
        questionText: "Why is machine learning generally inappropriate for a system requiring exact, guaranteed financial balance calculations?",
        options: ["ML models provide probabilistic rather than deterministic outputs", "ML models cannot handle numeric or financial data types", "Account balance calculations exceed ML model storage limits", "ML models are restricted to processing only unstructured text"],
        correctAnswer: "ML models provide probabilistic rather than deterministic outputs",
        explanation: "ML models output probabilistic predictions that approximate an outcome rather than guarantee it.",
        distractorExplanations: {
          "ML models cannot handle numeric or financial data types": "ML models routinely process numeric and financial data.",
          "Account balance calculations exceed ML model storage limits": "Irrelevant to the mismatch of logic.",
          "ML models are restricted to processing only unstructured text": "ML models regularly work with structured, tabular data."
        },
        difficulty: "intermediate"
    },
    {
        domainId,
        type: "single",
        questionText: "A data science team evaluates various hyperparameter settings and algorithms, logging performance metrics to select the best model. What is this process?",
        options: ["Experimentation", "Model monitoring", "Technical debt management", "Production readiness"],
        correctAnswer: "Experimentation",
        explanation: "Trying multiple algorithms and hyperparameters while tracking metrics for comparison is the definition of experimentation.",
        distractorExplanations: {
          "Model monitoring": "Applies to a model already running in production.",
          "Technical debt management": "Addresses accumulated shortcuts in code or process.",
          "Production readiness": "A certification step that happens after a model is chosen."
        },
        difficulty: "intermediate"
    },
    {
        domainId,
        type: "single",
        questionText: "An airline requires millisecond-latency predictions for personalized seat upgrade offers as customers browse the website. Which inferencing approach is appropriate?",
        options: ["Real-time inferencing", "Batch inferencing", "Training inferencing", "Offline inferencing"],
        correctAnswer: "Real-time inferencing",
        explanation: "This approach is designed to serve predictions for single incoming requests with millisecond-scale latency.",
        distractorExplanations: {
          "Batch inferencing": "Processes large groups of records together on a schedule.",
          "Training inferencing": "Training is a separate phase that happens before inferencing.",
          "Offline inferencing": "Introduces delay that does not meet a millisecond response requirement."
        },
        difficulty: "intermediate"
    }
  ];

  for (const q of questionsData) {
    await db.insert(questions).values(q);
    console.log(`✅ Question inserted: ${q.questionText.substring(0, 30)}...`);
  }

  console.log("🚀 Questions seeding completed!");
}

seedQuestions().catch((err) => {
  console.error("❌ Questions seed failed:", err);
  process.exit(1);
});
