import "dotenv/config";
import { db } from "../lib/db";
import { domains, questions } from "../lib/db/schema";
import { eq } from "drizzle-orm";

async function populateMoreQuestions() {
  console.log("🌱 Starting to populate more questions...");

  const domainsList = await db.select().from(domains);

  for (const domain of domainsList) {
    console.log(`\nProcessing domain: ${domain.name}`);

    let questionsToAdd: any[] = [];

    if (domain.name === "Fundamentals of AI and ML") {
      questionsToAdd = [
        {
          domainId: domain.id,
          type: "single",
          questionText: "What is the primary difference between Supervised Learning and Unsupervised Learning?",
          options: [
            "Supervised uses labeled data; Unsupervised uses unlabeled data",
            "Supervised uses unlabeled data; Unsupervised uses labeled data",
            "Supervised is for images; Unsupervised is for text",
            "There is no difference"
          ],
          correctAnswer: "Supervised uses labeled data; Unsupervised uses unlabeled data",
          explanation: "Supervised learning trains on labeled datasets where the desired output is known, whereas Unsupervised learning finds patterns in unlabeled data.",
          distractorExplanations: {
            "Supervised uses unlabeled data; Unsupervised uses labeled data": "This is the reverse.",
            "Supervised is for images; Unsupervised is for text": "Both techniques can be applied to both data types.",
            "There is no difference": "They are fundamentally different approaches."
          },
          difficulty: "basic"
        },
        {
          domainId: domain.id,
          type: "single",
          questionText: "Which of the following is an example of a Regression problem?",
          options: [
            "Predicting the price of a house",
            "Categorizing an email as spam or not spam",
            "Grouping customers into segments",
            "Identifying objects in an image"
          ],
          correctAnswer: "Predicting the price of a house",
          explanation: "Regression predicts a continuous numeric value, such as a price.",
          distractorExplanations: {
            "Categorizing an email as spam or not spam": "This is classification.",
            "Grouping customers into segments": "This is clustering.",
            "Identifying objects in an image": "This is classification or object detection."
          },
          difficulty: "basic"
        }
      ];
    } else if (domain.name === "Fundamentals of GenAI") {
      questionsToAdd = [
        {
          domainId: domain.id,
          type: "single",
          questionText: "What is a 'token' in the context of Large Language Models?",
          options: [
            "A unit of text representing characters, subwords, or words",
            "A security credential for API access",
            "A visual representation of an image",
            "A specific type of database record"
          ],
          correctAnswer: "A unit of text representing characters, subwords, or words",
          explanation: "LLMs break down text into smaller units called tokens to process input.",
          distractorExplanations: {
            "A security credential for API access": "This is an API token, different concept.",
            "A visual representation of an image": "Irrelevant.",
            "A specific type of database record": "Irrelevant."
          },
          difficulty: "basic"
        }
      ];
    } else if (domain.name === "Applications of Foundation Models") {
      questionsToAdd = [
        {
          domainId: domain.id,
          type: "single",
          questionText: "What is RAG (Retrieval-Augmented Generation)?",
          options: [
            "A technique to retrieve external data to ground the FM response",
            "A method to train the FM from scratch",
            "An algorithm to compress FM models",
            "A security protocol for FM access"
          ],
          correctAnswer: "A technique to retrieve external data to ground the FM response",
          explanation: "RAG connects the FM to external data sources to improve response accuracy and reduce hallucinations.",
          distractorExplanations: {
            "A method to train the FM from scratch": "This is pre-training.",
            "An algorithm to compress FM models": "This is quantization or pruning.",
            "A security protocol for FM access": "Irrelevant."
          },
          difficulty: "intermediate"
        }
      ];
    } else if (domain.name === "Guidelines for Responsible AI") {
      questionsToAdd = [
        {
          domainId: domain.id,
          type: "single",
          questionText: "Why is bias in AI models a critical concern?",
          options: [
            "It can lead to unfair treatment or discrimination against specific groups",
            "It makes the models too slow to execute",
            "It causes the models to consume too much memory",
            "It prevents models from processing images"
          ],
          correctAnswer: "It can lead to unfair treatment or discrimination against specific groups",
          explanation: "Bias occurs when models learn and perpetuate societal prejudices present in training data.",
          distractorExplanations: {
            "It makes the models too slow to execute": "Bias is about fairness, not performance.",
            "It causes the models to consume too much memory": "Bias is about fairness, not resource usage.",
            "It prevents models from processing images": "Bias does not prevent processing."
          },
          difficulty: "basic"
        }
      ];
    } else if (domain.name === "Security, Compliance, and Governance for AI Solutions") {
      questionsToAdd = [
        {
          domainId: domain.id,
          type: "single",
          questionText: "What is the role of an AI 'Model Card'?",
          options: [
            "To document the model's intended use, limitations, and performance",
            "To provide a physical card for accessing the AWS Console",
            "To act as a password for the model",
            "To store training data in a physical file"
          ],
          correctAnswer: "To document the model's intended use, limitations, and performance",
          explanation: "Model cards increase transparency by documenting model characteristics.",
          distractorExplanations: {
            "To provide a physical card for accessing the AWS Console": "Irrelevant.",
            "To act as a password for the model": "Irrelevant.",
            "To store training data in a physical file": "Irrelevant."
          },
          difficulty: "basic"
        }
      ];
    }

    for (const q of questionsToAdd) {
      await db.insert(questions).values(q);
      console.log(`✅ Question added to ${domain.name}: ${q.questionText.substring(0, 30)}...`);
    }
  }

  console.log("🚀 Question population completed!");
}

populateMoreQuestions().catch(console.error);
