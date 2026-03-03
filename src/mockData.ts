import { Post, Sermon, Event, Ministry, Testimony, Submission } from "./types";

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: "Finding Peace in the Midst of the Storm",
    slug: "finding-peace-in-storm",
    content: "Life often brings unexpected challenges that can leave us feeling overwhelmed and anxious. However, as believers, we have access to a peace that surpasses all understanding...",
    excerpt: "Discover how to anchor your soul in God's promises when life gets difficult.",
    featured_image: "https://picsum.photos/seed/peace/800/600",
    author: "Pastor Samuel Adeyemi",
    category: "Devotionals",
    status: "published",
    created_at: "2024-03-01T10:00:00Z"
  },
  {
    id: 2,
    title: "The Power of Community: Why We Need Each Other",
    slug: "power-of-community",
    content: "God never intended for us to walk the journey of faith alone. From the very beginning, He established the importance of fellowship and mutual support...",
    excerpt: "Exploring the biblical foundation for church community and how it strengthens our walk with Christ.",
    featured_image: "https://picsum.photos/seed/community/800/600",
    author: "Sister Grace Mensah",
    category: "Church Life",
    status: "published",
    created_at: "2024-02-25T14:30:00Z"
  }
];

export const MOCK_SERMONS: Sermon[] = [
  {
    id: 1,
    title: "Walking by Faith, Not by Sight",
    speaker: "Pastor Samuel Adeyemi",
    date: "2024-02-25",
    scripture: "2 Corinthians 5:7",
    series: "Faith Foundations",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_url: "#",
    notes: "Faith is not the absence of doubt, but the presence of trust in God's character...",
    thumbnail: "https://picsum.photos/seed/sermon1/800/450",
    created_at: "2024-02-25T12:00:00Z"
  },
  {
    id: 2,
    title: "The Power of Persistent Prayer",
    speaker: "Pastor Samuel Adeyemi",
    date: "2024-02-18",
    scripture: "Luke 18:1-8",
    series: "Prayer Life",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_url: "#",
    notes: "Jesus taught us that we should always pray and not give up...",
    thumbnail: "https://picsum.photos/seed/sermon2/800/450",
    created_at: "2024-02-18T12:00:00Z"
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: "Annual Women's Conference",
    date: "2024-03-15",
    time: "09:00 AM",
    location: "Main Sanctuary",
    description: "Join us for a weekend of empowerment, worship, and sisterhood. Guest speakers and special music.",
    featured_image: "https://picsum.photos/seed/women/800/600",
    status: "upcoming",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    title: "Youth Revival Weekend",
    date: "2024-04-05",
    time: "06:00 PM",
    location: "Youth Center",
    description: "A high-energy weekend for teens and young adults to encounter God through worship and word.",
    featured_image: "https://picsum.photos/seed/youth/800/600",
    status: "upcoming",
    created_at: "2024-01-01T00:00:00Z"
  }
];

export const MOCK_MINISTRIES: Ministry[] = [
  {
    id: 1,
    name: "Children's Ministry",
    description: "Nurturing young hearts with Bible stories, worship, and fun activities for ages 2-12.",
    schedule: "Sundays at 9:00 AM & 11:00 AM",
    leader: "Sister Mary Johnson",
    icon: "Baby"
  },
  {
    id: 2,
    name: "Youth Ministry",
    description: "Empowering the next generation through discipleship, fellowship, and leadership development.",
    schedule: "Fridays at 6:30 PM",
    leader: "Brother David Smith",
    icon: "Users"
  }
];

export const MOCK_TESTIMONIES: Testimony[] = [
  {
    id: 1,
    name: "Grace M.",
    content: "I walked into Faith Tabernacle broken and hopeless. Through the love of this church and the power of God's Word, I found healing, purpose, and a family I never knew I needed.",
    image: "https://picsum.photos/seed/person1/100/100"
  },
  {
    id: 2,
    name: "Brother James O.",
    content: "The youth ministry transformed my son's life. He went from disconnected to passionate about serving and leading.",
    image: "https://picsum.photos/seed/person2/100/100"
  }
];

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    type: "Prayer Request",
    message: "Please pray for my family's health and financial situation. We are going through a tough time.",
    date: "2024-03-01T10:00:00Z",
    status: "new"
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    type: "First-time Visitor",
    message: "I visited last Sunday and really enjoyed the service. I'd like to know more about the children's ministry.",
    date: "2024-03-01T14:30:00Z",
    status: "new"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    type: "General Inquiry",
    message: "What are the office hours during the week?",
    date: "2024-02-28T09:00:00Z",
    status: "read"
  }
];
