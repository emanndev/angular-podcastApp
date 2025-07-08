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
    title: 'Entitlement - My Two Cents',
    description: "Lately, I've been hearing a lot of conversations about entitlement...",
    img_url: 'https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_image/9275051/9275051-1652105348300-2d46a38bf696a.jpg',
    audio_url: 'https://anchor.fm/s/37e1314c/podcast/play/51740900...',
    created_at: '2024-05-01'
  },
  {
    id: 2,
    title: 'Trip to Togo',
    description: 'Late last month, I took a trip to Togo with a few friends...',
    img_url: 'https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_image/9275051/9275051-1683579267909-4118292e8f6d1.jpg',
    audio_url: 'https://anchor.fm/s/37e1314c/podcast/play/70020861...',
    created_at: '2024-04-28'
  },
  {
    id: 3,
    title: 'Setting Standards',
    description: 'Are you tired of settling for less than you deserve?',
    img_url: 'https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_image/9275051/9275051-1740170443527-272f6875b8799.jpg',
    audio_url: 'https://anchor.fm/s/37e1314c/podcast/play/98840449...',
    created_at: '2024-04-20'
  },
  {
    id: 4,
    title: 'The Quiet Shape of Grief',
    description: 'In this episode, we talk about grief, what it feels like, and how to support someone grieving...',
    img_url: 'https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_image/9275051/9275051-1751115240877-0dac38085a9dd.jpg',
    audio_url: 'https://anchor.fm/s/37e1314c/podcast/play/10475619...',
    created_at: '2024-03-12'
  },
  {
    id: 5,
    title: 'Aggression',
    description: 'Aggression is defined as a type of behaviour intended to harm...',
    img_url: 'https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_image/9275051/9275051-1646306705417-349d4346b876b.jpg',
    audio_url: 'https://anchor.fm/s/37e1314c/podcast/play/48484496...',
    created_at: '2024-03-05'
  },
  {
    id: 6,
    title: 'The Chase',
    description: "As men, we're constantly told to chase the women we want...",
    img_url: 'https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_image/9275051/9275051-1648544562854-3d50a8ceb796f.jpg',
    audio_url: 'https://anchor.fm/s/37e1314c/podcast/play/49782133...',
    created_at: '2024-02-25'
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
    title: 'Tech Trends',
    description: 'Latest in tech',
    episodes: [],
    created_at: '2024-12-01T12:00:00Z',
  },
  {
    id: 2,
    title: 'Mindful Moments',
    description: 'Meditation and wellness',
    episodes: [],
    created_at: '2024-12-05T08:30:00Z',
  },
];
