# EurekAI - The Ultimate Study & Presentation Assistant

## 🌍 Revolutionizing Education with AI

EurekAI is an innovative **AI-powered study and presentation assistant** designed to empower **students, teachers, and lifelong learners worldwide**. It provides a structured approach to **learning, understanding, and presenting information** effortlessly. Whether you are a student struggling to grasp a complex subject or a teacher looking to create well-structured presentations, EurekAI simplifies the process with AI-generated outlines and slide-based learning material.

### 🎯 **Key Features**

- **AI-Powered Outlines**: Enter any topic, and EurekAI breaks it down into structured subtopics.
- **Editable Content**: Users can modify, rearrange, or add new points to customize their learning structure.
- **Automated Slide Creation**: Based on user-approved outlines, EurekAI generates detailed, AI-enriched presentation slides.
- **For All Ages & Professions**: Useful not only for students but also for teachers, professionals, and anyone looking to simplify complex subjects.
- **Cloud-based Accessibility**: Access your saved outlines and presentations anytime, anywhere.

---

## 🚀 Getting Started

EurekAI runs as a **Next.js application with Prisma for database management**, leveraging **PostgreSQL (Neon) for production** while providing a **Dockerized environment for development**. Follow the steps below to **run the application locally or inside Docker**.

### 🛠 **Prerequisites**

Ensure you have the following installed:

- **Node.js (18+)**
- **Docker & Docker Compose**
- **PostgreSQL (for local development)**
- **Neon PostgreSQL account (for production deployment)**

---

## 🔧 **Installation & Setup**

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/your-repo/eurekai.git
cd eurekai
```

### **2️⃣ Install Dependencies**

```bash
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the root directory and configure the database connection:

```env
DATABASE_URL="ask_for_code"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=ask_for_key
CLERK_SECRET_KEY=Ask_For_key
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT=/callback
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT=/callback

NEXT_PUBLIC_HOST_URL="http://localhost:3000"

OPENAI_API_KEY= "Key_provided_by_hackathon"

STRIPE


```

### **4️⃣ Run Prisma Migrations**

```bash
npx prisma migrate dev
```

### **5️⃣ Start the Development Server**

```bash
npm run dev
```

Your app will be available at `http://localhost:3000`

---

🚀 Running EurekAI with Docker

To fully containerize EurekAI and comply with hackathon requirements, follow these steps:

1️⃣ Build and Start Docker Containers

Run the following command to build the image and start the application:

docker-compose up --build -d

This will:

Build the Docker container.

Install all dependencies.

Start the Next.js application inside the container.

Serve it on port 80 (http://localhost).

Note: The -d flag runs the container in the background. If you want to see real-time logs, use:

docker logs -f eurekai_app

2️⃣ Apply Prisma Migrations (If Using a Database)

If your application relies on a PostgreSQL database (such as Neon), apply the latest Prisma migrations inside the running container:

docker exec -it eurekai_app npx prisma migrate deploy

This will ensure the database schema is up to date.

If the application does not use Prisma, this step can be skipped.

3️⃣ Access the Application

Once everything is running, open your browser and visit:

http://localhost

Since the app runs on port 80, there’s no need to specify a port.

4️⃣ Managing the Application

To stop the application:

docker-compose down

To restart the application without rebuilding:

docker-compose up -d

To rebuild and restart the application:

docker-compose up --build -d

📌 Troubleshooting & Common Issues

❗ Prisma Client Initialization Errors

If you encounter Prisma errors such as:

Error: Prisma Client could not locate the Query Engine for runtime "linux-musl".

Ensure your schema.prisma file includes:

generator client {
provider = "prisma-client-js"
binaryTargets = ["native", "linux-musl"]
}

Then, regenerate Prisma inside the container:

docker exec -it eurekai_app npx prisma generate

❗ Environment Variables Not Loaded

If the application is not picking up your environment variables:

Ensure your .env file is correctly placed in the root directory.

If variables are missing inside Docker, explicitly pass them using:

docker-compose --env-file .env up --build

❗ Debugging & Checking Logs

If the application is not working as expected, check the logs:

docker logs -f eurekai_app

✅ Final Checklist Before Submission

## 🔍 **Project Structure**

EurekAI follows a **modern modular structure**, leveraging the **Next.js App Router** for efficient routing and organization.

```
📂 src/
 ├── 📁 app/                  # Next.js App Router
 │   ├── (auth)/             # Authentication pages
 │   ├── (protected)/        # Protected routes
 │   ├── layout.tsx          # Shared layout
 │   ├── page.tsx            # Homepage
 ├── 📁 components/          # Reusable UI components
 ├── 📁 hooks/               # Custom React hooks
 ├── 📁 lib/                 # Utilities and constants
 ├── 📁 store/               # Zustand state management
 ├── 📁 prisma/              # Prisma schema and migrations
 ├── 📁 public/              # Static assets
 ├── next.config.js          # Next.js configuration
 ├── docker-compose.yml      # Docker setup
 ├── Dockerfile              # Dockerfile for Alpine Linux
 ├── .env                    # Environment variables
```

---

## 📌 **How EurekAI Works**

### **1️⃣ Enter a Topic**

Users provide a subject they want to explore or present.

### **2️⃣ AI Generates Outlines**

The app breaks the topic into key subtopics and learning points.

### **3️⃣ Customize & Edit**

Users can adjust outlines, remove unnecessary details, or add new ones.

### **4️⃣ Generate Full Presentation**

EurekAI transforms the outline into structured slides, with detailed explanations.

### **5️⃣ Download or Share**

Users can download the slides or share them with others.

---

## 🔥 **Why EurekAI is a Game-Changer in Education?**

- 📚 **Simplifies Research** → No more scattered information; structured outlines make studying effortless.
- 🎤 **Effortless Presentations** → AI-generated slides ensure clarity and coherence.
- 🏫 **Ideal for Teachers** → Educators can create lesson plans and teaching materials within minutes.
- 🌍 **Global Accessibility** → Useful for both Greek and international students, teachers, and professionals.
- 🚀 **AI-Powered Efficiency** → Speeds up learning, comprehension, and content creation.

---

## 🛠 **Future Improvements**

🔹 AI-driven **voice-over presentations**
🔹 **Collaborative editing** for group projects
🔹 **Integration with Google Slides & PowerPoint**
🔹 **Multi-language support**

---

## 🤝 **Contributing**

We welcome contributions from developers, designers, and educators worldwide! If you'd like to contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature-name`)
3. **Commit your changes** (`git commit -m 'Add new feature'`)
4. **Push to GitHub** (`git push origin feature-name`)
5. **Create a Pull Request**

---

## 📜 **License**

EurekAI is licensed under **MIT License**. Feel free to use, modify, and distribute it for educational purposes.

---

## 📞 **Contact & Support**

If you have any questions, feel free to reach out via:
📧 Email: `pegadeli12345@gmail.com`
🌐 Website: ...

🚀 **Let’s transform education together with AI!**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
