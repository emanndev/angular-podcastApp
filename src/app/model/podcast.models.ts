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
  created_at: string;
}

// Episode

export interface Episode {
  id: number;
  title: string;
  description: string;
  audio_url: string;
  created_at: string;
  updated_at?: string;
}

// Playlist

export interface Playlist {
  id: number;
  title: string;
  description: string;
  episodes: Episode[];
  created_at: string;
}

export interface PlaylistForm {
  title: string;
  description: string;
  episode_ids: number[];
}

// Team Member

export interface TeamMember {
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
