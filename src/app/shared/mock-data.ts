import { Confession, Episode,  Playlist } from '../model/podcast.models';

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

// import { Episode } from './podcast.models';

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
  {
    id: 7,
    title: 'Emotional Intelligence',
    description: 'In this episode of Rants & Confessions, we dive into emotional intelligence...',
    img_url: 'https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_image/9275051/9275051-1745254506840-67418a603bf75.jpg',
    audio_url: 'https://anchor.fm/s/37e1314c/podcast/play/10157621...',
    created_at: '2024-02-01'
  },
  {
    id: 8,
    title: "Checkin' In",
    description: "How are you doing? How have you been? Today, I talked about a few things that's been going on...",
    img_url: 'https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_image/9275051/9275051-1694356087111-9a4f01ea45dd3.jpg',
    audio_url: 'https://anchor.fm/s/37e1314c/podcast/play/75710918...',
    created_at: '2024-01-15'
  },
  {
    id: 9,
    title: 'A Dark Place - Unscripted',
    description: "This is an unscripted episode. I believe we're not alone...",
    img_url: 'https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_image/9275051/9275051-1623100356008-3056f1d57f4ba.jpg',
    audio_url: 'https://anchor.fm/s/37e1314c/podcast/play/35029375...',
    created_at: '2023-12-10'
  },
  {
    id: 10,
    title: 'Gender Equality: My Two Cents',
    description: 'In this episode, I share my views on equality...',
    img_url: 'https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_image/9275051/9275051-1648253016695-b6924f46eb1bb.jpg',
    audio_url: 'https://anchor.fm/s/37e1314c/podcast/play/49628761...',
    created_at: '2023-11-25'
  }
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
