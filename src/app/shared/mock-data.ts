import { Confession, Episode, Playlist } from '../model/podcast.models';

export const MOCK_CONFESSIONS: Confession[] = [
  {
    id: 1,
    message: 'I once pretended to be sick to skip a family dinner.',
    created_at: '2024-12-01T12:00:00Z',
  },
  {
    id: 2,
    message:
      'Sometimes I listen to my own voice recordings just to feel confident.',
    created_at: '2024-12-03T14:30:00Z',
  },
  {
    id: 3,
    message:
      'I told my boss my WiFi was down so I could nap during work hours.',
    created_at: '2024-12-05T08:45:00Z',
  },
];

export const MOCK_EPISODES: Episode[] = [
  {
    id: 1,
    title: 'First Episode - Welcome!',
    description: 'An introduction to the podcast and what to expect.',
    audio_url: 'https://example.com/audio/episode1.mp3',
    created_at: '2024-12-01T10:00:00Z',
    img_url: 'https://via.placeholder.com/150',
    duration: '1800',
    posted_on: '2024-12-01',
    season: 1,
    episode: 1,
  },
  {
    id: 2,
    title: 'Deep Dive into Angular',
    description: 'We explore advanced Angular topics in detail.',
    audio_url: 'https://example.com/audio/episode2.mp3',
    created_at: '2024-12-03T09:30:00Z',
    img_url: 'https://via.placeholder.com/150',
    duration: '2700',
    posted_on: '2024-12-03',
    season: 1,
    episode: 2,
  },
  {
    id: 3,
    title: 'The Art of Debugging',
    description: 'Techniques and tools for debugging in web apps.',
    audio_url: 'https://example.com/audio/episode3.mp3',
    created_at: '2024-12-05T15:45:00Z',
    img_url: 'https://via.placeholder.com/150',
    duration: '2100',
    posted_on: '2024-12-05',
    season: 1,
    episode: 3,
  },
];

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 1,
    name: 'Tech Trends',
    description: 'Latest in tech',
    episodes: [],
    created_at: '2024-12-01T12:00:00Z',
  },
  {
    id: 2,
    name: 'Mindful Moments',
    description: 'Meditation and wellness',
    episodes: [],
    created_at: '2024-12-05T08:30:00Z',
  },
];

export const MOCK_TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Kwame Boateng',
    bio: 'Sound engineer and podcast host.',
    image: 'https://i.pravatar.cc/150?img=3',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  },
  {
    id: 2,
    name: 'Ama Serwaa',
    bio: 'Social media manager and voice talent.',
    image: 'https://i.pravatar.cc/150?img=5',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  },
];
