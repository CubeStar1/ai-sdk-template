# Vercel AI SDK Template for Next.js

Build and scale AI-powered applications with this Next.js template, which integrates the Vercel AI SDK for streaming, UI components, and React Server Components.

![Vercel AI SDK OG Image](https://raw.githubusercontent.com/vercel/ai-sdk/main/packages/core/static/og-image.png)

## Key Features

*   **Vercel AI SDK Integration**: Seamlessly integrated for building advanced, streaming-first AI applications.
*   **Next.js 14 with App Router**: Leverages the latest features of Next.js for optimal performance and developer experience.
*   **Supabase Integration**: Includes user authentication, database management, and server-side utilities.
*   **UI Components**: A rich set of UI components, including charts, data tables, and more, built with Shadcn UI.
*   **AI Chat Interface**: A fully functional chat interface with conversation history and management.
*   **Email & Notifications**: Integrated with Resend for sending transactional emails.
*   **Tool-Using AI**: Example implementation of an AI that can use tools (e.g., search).

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/)
*   **AI**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
*   **Database**: [Supabase](https://supabase.com/)
*   **UI**: [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
*   **Email**: [Resend](https://resend.com/)
*   **LLM Provider**: [OpenAI](https://openai.com/), [Google Gemini](https://makersuite.google.com/)
*   **Search Provider**: [Tavily](https://tavily.ai/)


## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/CubeStar1/ai-sdk-template.git
cd ai-sdk-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase Database

- Create a new Supabase project at [Supabase](https://supabase.com/).
- Copy the migration file contents from `lib/supabase/migrations` to your Supabase project SQL editor.
- Run the migrations.
- Get the Supabase URL, anon key, and admin key from your Supabase project settings.

### 4. Set Up Environment Variables

Create a `.env` file in the root of the project and add the following environment variables. You will need to get these keys from their respective services.

```bash
cp env.example .env
```

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
NEXT_PUBLIC_SUPABASE_ADMIN=<your_supabase_admin_key>

# Resend
NEXT_PUBLIC_RESEND_API_KEY=<your_resend_api_key>
NEXT_PUBLIC_RESEND_DOMAIN=<your_resend_domain>

# App
NEXT_PUBLIC_APP_NAME="AI SDK Template"
NEXT_PUBLIC_APP_ICON='/next.svg'

# AI
NEXT_PUBLIC_GEMINI_API_KEY=<your_gemini_api_key>
NEXT_PUBLIC_GOOGLE_API_KEY=<your_google_api_key>


# OpenAI
NEXT_PUBLIC_OPENAI_API_KEY=<your_openai_api_key>

# Tavily
NEXT_PUBLIC_TAVILY_API_KEY=<your_tavily_api_key>

# Ragie
NEXT_PUBLIC_RAGIE_API_KEY=<your_ragie_api_key>


```

### 5. Run the Development Server

```bash
npm run dev
```

### 6. Open the Application

Open your web browser and navigate to `http://localhost:3000` to view the application.