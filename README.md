# Arham's Work | Full Stack Developer's Portfolio

A high performance, conversational portfolio built with **Next.js 14**, **Framer Motion**, and **Tailwind CSS**. This project features a unique chat based interface, a true black dark mode, and seamless video integration for project showcases.

---

## 🚀 Live Demo

Check out the live site: [arhamswork](https://arhamswork.vercel.app/)

---

## ✨ Key Features

- **Conversational UI:** A custom AI chat interface that guides users through my journey, projects, and skills.
- **True Black Dark Mode:** A premium, high contrast dark theme designed for modern displays.
- **Video Project Cards:** Auto playing, muted video previews for a dynamic portfolio experience.
- **Interactive Skills Bento:** Categorized technical stack with expandable tags and smooth hover effects.
- **Integrated Music Player:** A custom built audio component featuring my favorite tracks.
- **Functional Contact Form:** Direct email integration using EmailJS with real time status feedback.
- **Glassmorphic Design:** Modern UI elements using backdrop blurs and subtle gradients.

---

## 🛠️ Technical Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Components:** [Shadcn/UI](https://ui.shadcn.com/) & [Aceternity UI](https://ui.aceternity.com/)
- **Email:** [EmailJS](https://www.emailjs.com/)

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ArhammJain/arham-s-portfolio.git
cd arham-s-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add your EmailJS keys:

```plaintext
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Folder Structure

```
arham-s-portfolio/
├── app/              # Main page logic and theme configuration
├── components/
│   └── ui/          # Reusable UI components (Project Cards, Bento Grid, Skills Tags)
├── public/          # Static assets including project videos and profile images
├── music/           # Local audio files and album covers
└── README.md
```

---

## 🚀 Deployment

This project is deployed on [Vercel](https://vercel.com/). To deploy your own version:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

---

## 📝 License

This project is for personal portfolio use. Feel free to use the logic and inspiration for your own builds!

---

## 👨‍💻 Author

**Arham Jain**

- GitHub: [@ArhammJain](https://github.com/ArhammJain)
- Portfolio: [Arham's Work](https://arhamswork.vercel.app/)

---

Built with 💙 by Arham Jain
