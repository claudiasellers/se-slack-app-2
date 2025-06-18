# Slack Plan Comparison Tool

This is a web application designed to help Slack's sales teams and solutions engineers effectively articulate the value of different Slack plans to customers. It allows for dynamic comparison of features, highlights the specific pain points each feature solves for various lines of business, and provides a clear view of the benefits of upgrading.

## Key Features

- **Dual Comparison Modes:**
  - **New Feature List:** See exactly what features a customer gains when upgrading from one specific plan to another.
  - **Plan Comparison Table:** Get a comprehensive, side-by-side view of feature availability across multiple selected plans.
- **Line of Business (LOB) Contextualization:** Select a customer's LOB (e.g., Sales, IT, HR, Marketing) to view the specific business pain points that each feature helps solve. This tailors the conversation to what matters most to the customer.
- **PDF Export:** Generate a clean, professional PDF of the plan comparison table to share with customers or for internal review.
- **Dynamic & Categorized Views:** Features are grouped into logical categories (e.g., Collaboration, Security, Administration), with interactive accordions to make the data easy to navigate.

## Tech Stack

- **Framework:** [React](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

To run the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd se-slack-app-2
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Data Structure

All the application's data is centralized in `src/data/features.ts`. This file exports a single object, `featureData`, which contains three key parts:

- `featureAvailability`: An object where keys are feature names and values are objects mapping plan IDs (e.g., `free`, `pro`, `plus_v2`) to the feature's status (`true`, `false`, or a string for partial availability).
- `featureDescriptions`: A simple map of feature names to their text descriptions.
- `featurePainPoints`: An object mapping feature names to another object. This inner object maps a line of business (e.g., `it`, `sales`) to the specific pain point that the feature solves for them.

To add or update a feature, you only need to modify this file.

## Future Enhancements

Here are some potential ideas to make the tool even more powerful:

- **ROI Calculator:** Integrate a simple calculator for key features (like Workflow Builder) to quantify the financial benefit of automation.
- **Feature-to-Plan Recommender:** Allow a user to select "must-have" features and have the tool recommend the most cost-effective plan that meets those needs.
- **Concrete Use Cases:** Add short, anonymous customer success stories alongside feature descriptions to make the benefits more tangible.
- **Pricing & Competitor Info:** Include optional toggles to display plan pricing or compare Slack's features against key competitors.
- **Shareable Configurations:** Allow salespeople to save a specific comparison (plans + LOB) and generate a unique URL to share it.

