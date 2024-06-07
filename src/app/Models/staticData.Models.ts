export enum locationList {
  lebanon = 'lebanon',
  Beirut = 'Beirut',
  Tripoli = 'tripoli',
  NewYork = 'New York',
  LosAngeles = 'Los Angeles',
  Chicago = 'Chicago',
  SanFrancisco = 'San Francisco',
  London = 'London',
  Paris = 'Paris',
  Tokyo = 'Tokyo',
  Sydney = 'Sydney',
  Beijing = 'Beijing',
  Dubai = 'Dubai',
}
export enum Categories {
  all = 'all',
  food = 'food',
  sport = 'sport',
  fitness = 'fitness',
  adventure = 'adventure',
  education = 'education',
  technology = 'technology',
  travel = 'travel',
}

export const staticUser = [
  {
    id: 1,
    firstName: 'elie',
    lastName: 'lastname1',
    email: 'elie@hotmail.com',
    password: '123',
    location: '',
  },
  {
    id: 2,
    firstName: 'user2',
    lastName: 'lastname2',
    email: 'user2@hotmail.com',
    password: '123',
    location: '',
  },
  {
    id: 3,
    firstName: 'john',
    lastName: 'doe',
    email: 'john.doe@example.com',
    password: 'password123',
    location: 'new york, USA',
  },
  {
    id: 4,
    firstName: 'alice',
    lastName: 'smith',
    email: 'alice.smith@example.com',
    password: 'qwerty456',
    location: 'los angeles, USA',
  },
  {
    id: 5,
    firstName: 'michael',
    lastName: 'johnson',
    email: 'michael.johnson@example.com',
    password: 'abc123',
    location: 'chicago, USA',
  },
  {
    id: 6,
    firstName: 'david',
    lastName: 'williams',
    email: 'david.williams@example.com',
    password: 'securepassword',
    location: 'Tripoli, Lebanon',
  },
];

export const staticEvent = [
  {
    id: 1,
    title: 'event 1',
    description: 'asdasd',
    admin: 'elie bou mansour',
    type: '',
    startDate: new Date(),
    endDate: new Date(),
    image: 'people.jpg',
    location: 'usa',
    userList: [
      {
        id: 1,
        firstName: 'elie',
        lastName: 'bou mansour',
        email: '',
        password: '',
        location: 'dubai',
      },
      {
        id: 3,
        firstName: 'john',
        lastName: 'doe',
        email: 'john.doe@example.com',
        password: 'password123',
        location: 'new york',
      },
    ],
    hostList: [
      {
        id: 2,
        firstName: 'pierre',
        lastName: '',
        email: '',
        password: '',
        location: '',
      },
    ],
    agendaList: [],
    rating: [],
    presentationType: 'on site',
    totalRating: 0,
  },
  {
    id: 2,
    title: 'event 2',
    description: 'asdasd',
    admin: 'user2',
    type: '',
    startDate: new Date(),
    endDate: new Date(),
    image: 'people.jpg',
    location: 'france',
    userList: [
      {
        id: 1,
        firstName: 'elie',
        lastName: '',
        email: '',
        password: '',
        location: '',
      },
      {
        id: 2,
        firstName: 'user2',
        lastName: 'lastname2',
        email: 'user2@hotmail.com',
        password: '123',
        location: '',
      },
    ],
    hostList: [
      {
        id: 2,
        firstName: 'user2',
        lastName: 'lastname2',
        email: 'user2@hotmail.com',
        password: '123',
        location: '',
      },
    ],

    agendaList: [],
    rating: [],
    presentationType: 'on site',
    totalRating: 0,
  },
  {
    id: 3,
    title: 'Conference on AI and Machine Learning',
    description:
      'A conference focusing on the latest advancements in AI and machine learning technologies.',
    admin: 'admin3',
    type: 'Conference',
    startDate: new Date(),
    endDate: new Date(),
    image: 'technology.jpg',
    location: 'San Francisco',
    presentationType: 'Online',
    userList: [],
    hostList: [],
    agendaList: [],
    rating: [],
    totalRating: 0,
  },
  {
    id: 4,
    title: 'Tech Startup Expo',
    description:
      'An expo showcasing innovative startups in the technology sector',
    admin: 'admin1',
    type: 'Expo',
    startDate: new Date(),
    endDate: new Date(),
    image: 'technology.jpg',
    location: 'San Francisco',
    presentationType: 'Online',
    userList: [],
    hostList: [],
    agendaList: [],
    rating: [],
    totalRating: 0,
  },
  {
    id: 5,
    title: 'Italian Cuisine Cooking Class',
    description:
      'Learn the art of Italian cooking with our hands-on class led by expert chefs. Discover the secrets behind crafting authentic Italian dishes.',
    admin: 'admin5',
    type: 'Cooking Class',
    startDate: new Date(),
    endDate: new Date(),
    image: 'food.jpg',
    location: 'Lebanon',
    presentationType: 'On site',
    userList: [],
    hostList: [
      {
        id: 3,
        firstName: 'john',
        lastName: 'doe',
        email: 'john.doe@example.com',
        password: 'password123',
        location: 'new york',
      },
    ],
    agendaList: [],
    rating: [],
    totalRating: 0,
  },
  {
    id: 6,
    title: 'French Pastries Baking Workshop',
    description:
      'Immerse yourself in the art of French pastry-making during our workshop led by seasoned pastry chefs. Learn to create iconic French pastries from scratch, from flaky croissants to delicate macarons.',
    admin: 'david williams',
    type: 'Cooking Class',
    startDate: new Date(),
    endDate: new Date(),
    image: 'food.jpg',
    location: 'Lebanon',
    presentationType: 'Online',
    userList: [],
    hostList: [
      {
        id: 3,
        firstName: 'john',
        lastName: 'doe',
        email: 'john.doe@example.com',
        password: 'password123',
        location: 'new york',
      },
      {
        id: 6,
        firstName: 'david',
        lastName: 'williams',
        email: 'david.williams@example.com',
        password: 'securepassword',
        location: 'Tripoli',
      },
    ],
    agendaList: [],
    rating: [],
    totalRating: 0,
  },
];

export const staticGroupEvent = [
  {
    id: 1,
    title: 'groupe one title',
    description:
      'Join us for an encouraging couples counseling session designed to help partners strengthen their bond, improve communication andresolve conflicts through faith-based guidance and support. Whether you’re facing specific challenges or simply looking to deepen you connection, our mentors will help you navigate challenges with biblical principles. Our counsel is rooted in Christian values and will provide you with tools and insights to foster a loving and',
    category: 'food',
    image: 'travel.jpg',
    adminList: [
      {
        id: 6,
        firstName: 'david',
        lastName: 'williams',
        email: 'david.williams@example.com',
        password: 'securepassword',
        location: 'beirut',
      },
    ],
    eventList: [],
  },
  {
    id: 2,
    title: 'groupe two title',
    description:
      'group two description group two description group two description group two description ',
    category: 'sport',
    image: 'sport.jpg',
    adminList: [
      {
        id: 4,
        firstName: 'alice',
        lastName: 'smith',
        email: 'alice.smith@example.com',
        password: 'qwerty456',
        location: 'los angeles, USA',
      },
    ],
    eventList: [],
  },
  {
    id: 3,
    title: 'Delicious Delights Cooking Club',
    description:
      'Join us to explore the art of cooking and share your favorite recipes!',

    category: 'food',
    image: 'food.jpg',
    adminList: [
      {
        id: 3,
        firstName: 'john',
        lastName: 'doe',
        email: 'john.doe@example.com',
        password: 'password123',
        location: 'new york',
      },
      {
        id: 1,
        firstName: 'elie',
        lastName: 'lastname1',
        email: 'elie@hotmail.com',
        password: '123',
        location: '',
      },
    ],
    eventList: [
      {
        id: 5,
        title: 'Italian Cuisine Cooking Class',
        description:
          'Learn the art of Italian cooking with our hands-on class led by expert chefs. Discover the secrets behind crafting authentic Italian dishes.',
        admin: 'admin5',
        type: 'Cooking Class',
        startDate: new Date(),
        endDate: new Date(),
        image: 'food.jpg',
        location: 'Beirut',
        presentationType: 'On site',
        userList: [],
        hostList: [
          {
            id: 3,
            firstName: 'john',
            lastName: 'doe',
            email: 'john.doe@example.com',
            password: 'password123',
            location: 'new york',
          },
        ],
        agendaList: [],
        rating: [],
        totalRating: 0,
      },
      {
        id: 6,
        title: 'French Pastries Baking Workshop',
        description:
          'Immerse yourself in the art of French pastry-making during our workshop led by seasoned pastry chefs. Learn to create iconic French pastries from scratch, from flaky croissants to delicate macarons.',
        admin: 'david williams',
        type: 'Cooking Class',
        startDate: new Date(),
        endDate: new Date(),
        image: 'food.jpg',
        location: 'Lebanon',
        presentationType: 'Online',
        userList: [],
        hostList: [
          {
            id: 3,
            firstName: 'john',
            lastName: 'doe',
            email: 'john.doe@example.com',
            password: 'password123',
            location: 'new york',
          },
          {
            id: 6,
            firstName: 'david',
            lastName: 'williams',
            email: 'david.williams@example.com',
            password: 'securepassword',
            location: 'Tripoli',
          },
        ],
        agendaList: [],
        rating: [],
        totalRating: 0,
      },
    ],
  },
];
