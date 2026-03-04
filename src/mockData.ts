import { Post, Sermon, Event, Ministry, Testimony, Submission } from "./types";

export const MOCK_POSTS: Post[] = [
  // Devotionals
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: 100 + i,
    title: `Devotional: Finding Strength in Week ${i + 1}`,
    slug: `devotional-strength-${i + 1}`,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    excerpt: `A weekly reflection on finding spiritual strength and perseverance in your daily walk with God (Part ${i + 1}).`,
    featured_image: `https://picsum.photos/seed/devotional${i}/800/600`,
    author: "Pastor Samuel Adeyemi",
    category: "Devotionals",
    status: "published",
    created_at: new Date(Date.now() - i * 86400000 * 7).toISOString()
  })),
  // Church News
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: 200 + i,
    title: `Church Update: Monthly News ${i + 1}`,
    slug: `church-news-${i + 1}`,
    content: "Stay informed about what's happening in our church community. We have many exciting updates to share...",
    excerpt: `Catch up on the latest happenings, community projects, and upcoming initiatives at Faith Tabernacle.`,
    featured_image: `https://picsum.photos/seed/news${i}/800/600`,
    author: "Sister Grace Mensah",
    category: "Church News",
    status: "published",
    created_at: new Date(Date.now() - i * 86400000 * 14).toISOString()
  })),
  // Announcements
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: 300 + i,
    title: `Important Announcement: Notice ${i + 1}`,
    slug: `announcement-${i + 1}`,
    content: "Please take note of these important changes and upcoming deadlines for our various church activities...",
    excerpt: `Essential information for all members regarding service times, special meetings, and administrative updates.`,
    featured_image: `https://picsum.photos/seed/announcement${i}/800/600`,
    author: "Church Office",
    category: "Announcements",
    status: "published",
    created_at: new Date(Date.now() - i * 86400000 * 3).toISOString()
  })),
  // Testimonies
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: 400 + i,
    title: `Testimony: God's Faithfulness in My Life ${i + 1}`,
    slug: `testimony-${i + 1}`,
    content: "I want to share how God turned my situation around when I least expected it. His grace is truly sufficient...",
    excerpt: `Inspiring stories of transformation, healing, and provision from members of our church family.`,
    featured_image: `https://picsum.photos/seed/testimony${i}/800/600`,
    author: "Various Members",
    category: "Testimonies",
    status: "published",
    created_at: new Date(Date.now() - i * 86400000 * 30).toISOString()
  })),
  // Youth Corner
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: 500 + i,
    title: `Youth Corner: Leading the Next Gen ${i + 1}`,
    slug: `youth-corner-${i + 1}`,
    content: "Our youth are not just the future; they are the present. Here is how we are empowering them today...",
    excerpt: `Insights, event recaps, and encouragement specifically tailored for our teens and young adults.`,
    featured_image: `https://picsum.photos/seed/youthpost${i}/800/600`,
    author: "Brother David Smith",
    category: "Youth Corner",
    status: "published",
    created_at: new Date(Date.now() - i * 86400000 * 10).toISOString()
  })),
  // Missions
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: 600 + i,
    title: `Missions Report: Impact in Region ${i + 1}`,
    slug: `missions-${i + 1}`,
    content: "Our mission teams have been working hard to spread the Gospel and provide practical aid in various regions...",
    excerpt: `Updates from the field about our local and international mission efforts and how you can support them.`,
    featured_image: `https://picsum.photos/seed/missions${i}/800/600`,
    author: "Missions Team",
    category: "Missions",
    status: "published",
    created_at: new Date(Date.now() - i * 86400000 * 45).toISOString()
  }))
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
  },
  {
    id: 3,
    title: "Living a Life of Purpose",
    speaker: "Pastor Grace Mensah",
    date: "2024-02-11",
    scripture: "Ephesians 2:10",
    series: "Divine Destiny",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_url: "#",
    notes: "You were created on purpose, for a purpose. God has a unique plan for your life...",
    thumbnail: "https://picsum.photos/seed/sermon3/800/450",
    created_at: "2024-02-11T12:00:00Z"
  },
  {
    id: 4,
    title: "The Grace That Transforms",
    speaker: "Pastor Samuel Adeyemi",
    date: "2024-02-04",
    scripture: "Titus 2:11-14",
    series: "Amazing Grace",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_url: "#",
    notes: "Grace is not just for salvation; it's for transformation. It teaches us to live godly lives...",
    thumbnail: "https://picsum.photos/seed/sermon4/800/450",
    created_at: "2024-02-04T12:00:00Z"
  },
  {
    id: 5,
    title: "Overcoming Fear with Faith",
    speaker: "Pastor Samuel Adeyemi",
    date: "2024-01-28",
    scripture: "Isaiah 41:10",
    series: "Faith Foundations",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_url: "#",
    notes: "Fear is a liar. God has given us a spirit of power, love, and a sound mind...",
    thumbnail: "https://picsum.photos/seed/sermon5/800/450",
    created_at: "2024-01-28T12:00:00Z"
  },
  {
    id: 6,
    title: "The Joy of the Lord",
    speaker: "Pastor Grace Mensah",
    date: "2024-01-21",
    scripture: "Nehemiah 8:10",
    series: "Fruit of the Spirit",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audio_url: "#",
    notes: "Joy is not dependent on circumstances. It is a deep-seated assurance in God's goodness...",
    thumbnail: "https://picsum.photos/seed/sermon6/800/450",
    created_at: "2024-01-21T12:00:00Z"
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
  },
  {
    id: 3,
    title: "Christmas Outreach 2023",
    date: "2023-12-20",
    time: "10:00 AM",
    location: "Community Plaza",
    description: "Our annual gift-giving and community lunch for the families in Biao.",
    featured_image: "https://picsum.photos/seed/christmas/800/600",
    status: "past",
    created_at: "2023-11-01T00:00:00Z"
  },
  {
    id: 4,
    title: "Leadership Summit",
    date: "2024-01-15",
    time: "08:00 AM",
    location: "Conference Hall",
    description: "Equipping our ministry leaders for the new year with vision and strategy.",
    featured_image: "https://picsum.photos/seed/leadership/800/600",
    status: "past",
    created_at: "2023-12-01T00:00:00Z"
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
