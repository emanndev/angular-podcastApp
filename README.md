# 🎙️ ManBel Pod - Podcast Web App

Welcome to **ManBel Pod**, a podcast web application built with modern Angular architecture. This platform allows users to browse curated podcast episodes, explore themed playlists, meet the team behind the content, and submit anonymous confessions.

## 🌟 Features

- 🎧 **Episodes Listing & Details**  
  Browse and listen to the latest episodes, with support for tags, durations, and deep links.

- 🗂️ **Curated Playlists**  
  Discover playlists grouped by theme or topic, featuring selected podcast episodes.

- 🔊 **Persistent Audio Player**  
  A global audio player bar that persists across pages with play/pause, skip, mute, volume, and speed controls. Mobile-friendly mini player included.

- 💬 **Confessions Submission**  
  Anonymously share your stories and possibly get featured in upcoming episodes.

- 👥 **Meet the Team**  
  Showcase podcast team members with bios and social media links.

- 🛠️ **Admin Dashboard**
  - Manage episodes, playlists, confessions, and team members.
  - Create, edit, delete, and approve content with rich forms and modals.

## 🛠 Technologies Used

- **Angular 19+** with Standalone Components
- **RxJS** for reactive data handling
- **Angular Material** for UI components & dialogs
- **SCSS** for responsive styling
- **REST API Integration**  
  Using `https://api.rantsnconfess.com/v1/` as the backend.

## 📁 Project Structure

src/
│
├── app/
│ ├── core/ # Services, interceptors, models
│ ├── shared/ # Reusable components: navbar, footer, player, toast
│ ├── admin/ # Admin pages: dashboards, playlists, team, confessions
│ ├── pages/ # Public pages: homepage, playlists, episodes, team, confession
│ ├── app.component.ts # Root component with global audio player
│
└── assets/ # Static images, icons

bash
Copy
Edit

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/podcast-app.git
cd podcast-app

# Install dependencies
npm install

# Run the app
ng serve
Then open http://localhost:4200 in your browser.

🔐 Environment
Create an environment.ts file under src/environments/:

ts
Copy
Edit
export const environment = {
  production: false,
  apiUrl: 'https://api.rantsnconfess.com/v1'
};
🧪 Development Notes
The Audio Player is global and controlled via AudioPlayerService.

Admin routes use Material Dialogs for forms instead of routing.

Mock data fallback is included in services for development purposes.

Confessions submitted from users require approval in admin.

🧑‍💻 Author
Emann – GitHub
Built as part of a full-stack podcast platform project.

📜 License
No license.
```
