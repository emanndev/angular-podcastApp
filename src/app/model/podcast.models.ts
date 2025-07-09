// User Models

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  token: string;
}

export interface LoginResponse {
  status: 'success' | 'error';
  message?: string;
  data: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: 'admin' | 'user';
    };
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Confession

export interface Confession {
  id: number;
  message: string;
  category?: string;
  emotion?: string;
  is_approved?: boolean;
  created_at: string;
  updated_at?: string;
}

// Episode

export interface Episode {


  id: number;
  title: string;
  description: string;
  img_url: string;
  audio_url: string;
  duration: string;
  posted_on: string;
  season: number;
  episode: number;
  spotify_url?: string;
  apple_podcasts_url?: string;
  archive?: number;
  featured?: number;
  slug?: string;
  created_at: string;
   img_url: string;
}



// Playlist

export interface Playlist {
  id: number;
  name: string;
  description: string;
  episodes: Episode[];
  created_at: string;
  updated_at?: string;
}

export interface PlaylistForm {
  name: string;
  description: string;
  episode_ids: number[];
}

// Team Member

export interface TeamMember {
img_url: string;
  id: number;
  name: string;
  bio: string;
  image: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

// Generic API Response

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}
//Toast model
export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}


export interface Podcast {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  audioUrl: string;
  tags: string[];
  date: string;
  image?: string;
}


