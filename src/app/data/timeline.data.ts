export interface TimelineStage {
  id: number;
  year: string;
  title: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  description: string;
  skills: string[];
  subStages?: {
    title: string;
    skills: string[];
  }[];
}

export const TIMELINE_DATA: TimelineStage[] = [
  {
    id: 1,
    year: '~2023',
    title: 'Обучение',
    subtitle: 'Старт. Первые строки кода',
    icon: '🎓',
    accentColor: '#4A90D9',
    description:
      'Изучение основ веб-разработки. Учебные проекты: лендинги, работа с DOM API.',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript ES6+',
      'Git',
      'Figma',
    ],
  },
  {
    id: 2,
    year: '~2023',
    title: 'Фриланс',
    subtitle: 'Первые заказы. Боевой опыт',
    icon: '💼',
    accentColor: '#27AE60',
    description:
      'Коммерческие проекты для малого бизнеса. 10+ проектов, включая Telegram-ботов. Первый опыт общения с заказчиками и оценки сроков.',
    skills: [
      'SCSS/BEM',
      'Pixel-perfect вёрстка',
      'REST API',
      'Telegram Bot API',
      'Деплой',
    ],
  },
  {
    id: 3,
    year: '~2024',
    title: 'Работа в компании',
    subtitle: 'В команде. Вёрстка + первый бэкенд',
    icon: '🏢',
    accentColor: '#E67E22',
    description:
      'Первая работа в команде. Начала с вёрстки в рамках дизайн-системы, затем перешла к полноценной интеграции с бэкендом и настройке CI/CD.',
    skills: [],
    subStages: [
      {
        title: 'Вёрстка и UI',
        skills: [
          'Angular Material',
          'Bootstrap',
          'Swiper',
          'Reactive Forms',
          'Дизайн-система',
          'Code Review',
        ],
      },
      {
        title: 'Интеграция с экенд и настройка CI/CD',
        skills: [
          'JWT Auth',
          'Docker',
          'CI/CD (GitLab CI)',
          'Unit-тесты',
        ],
      },
    ],
  },
  {
    id: 4,
    year: '2025–2026',
    title: 'Middle Angular',
    subtitle: 'Полный фокус. Angular Middle',
    icon: '🚀',
    accentColor: '#8E44AD',
    description:
      'Полный фокус на Angular. Самостоятельная разработка фич от проектирования до деплоя. Code review, участие в архитектурных решениях.',
    skills: [
      'Angular 17+',
      'Signals',
      'Standalone',
      'TypeScript',
      'RxJS',
      'NgRx / Component Store',
      'Performance (OnPush, trackBy)',
      'Jest',
      'Docker + Nginx',
      'Модульная архитектура',
      'ESLint / Prettier ',
    ],
  },
];

export interface Project {
  id: number;
  title: string;
  description: string;
  stack: string[];
  accentColor: string;
  link?: string;
  repo?: string;
  type: string;
  images: string[];
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: 'Habit Tracker',
    description:
      'Трекер привычек с челленджами, streak-сериями, календарём-heatmap и визуализацией прогресса. Две темы, glassmorphism-дизайн, адаптивность.',
    stack: ['Angular 19', 'SCSS', 'RxJS', 'json-server', 'Chart.js', 'TypeScript'],
    accentColor: '#00f0ff',
    type: 'SPA / Productivity',
    images: ['img-portfolio/habits-light.png', 'img-portfolio/habits-dark.png'],
    link: '#',
    repo: 'https://github.com/your_username/habit-tracker',
  },
  {
    id: 2,
    title: 'Салон «Орхидея»',
    description:
      'Сайт салона красоты с каталогом услуг, онлайн-записью и галереей работ. Элегантный дизайн, анимации, мобильная адаптация.',
    stack: ['Angular 17', 'SCSS/BEM', 'Reactive Forms', 'Animations', 'Responsive'],
    accentColor: '#ff00aa',
    type: 'Landing / Бизнес',
    images: ['img-portfolio/orh.png'],
    link: '#',
  },
  {
    id: 3,
    title: 'Админ-панель',
    description:
      'Административная панель с дашбордом, управлением услугами и аналитикой. Ролевой доступ, таблицы данных, графики.',
    stack: ['Angular 17', 'Angular Material', 'NgRx', 'Chart.js', 'REST API'],
    accentColor: '#b400ff',
    type: 'Dashboard / Admin',
    images: ['img-portfolio/admin-dashboard.png', 'img-portfolio/admin-services.png'],
    link: '#',
  },
];

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const ABOUT_DATA = {
  name: 'Алина',
  role: 'Middle Frontend Developer (Angular)',
  experience: '3+ года',
  location: 'Россия',
  summary:
    'Фронтенд-разработчик с фокусом на Angular-экосистему. Прошла путь от самообучения и фриланса до полноценной работы в продуктовой команде. Самостоятельно веду фичи от проектирования до деплоя. Активно участвую в code review и менторинге.',
  skillCategories: [
    {
      title: 'Frontend Core',
      icon: '▸',
      skills: [
        'Angular 17+ (Standalone, Signals, New Control Flow)',
        'TypeScript (Generics, Utility Types, Decorators)',
        'RxJS (Custom operators, Race conditions)',
        'HTML5, CSS3, SCSS/SASS, BEM',
      ],
    },
    {
      title: 'State & Data',
      icon: '▸',
      skills: [
        'NgRx (Store, Effects, Selectors)',
        'NgRx Component Store',
        'REST API, WebSocket, Interceptors',
        'JWT авторизация, Guards',
      ],
    },
    {
      title: 'Tooling & DevOps',
      icon: '▸',
      skills: [
        'Git Flow, Code Review, PR',
        'Docker + Nginx',
        'CI/CD (GitLab CI, GitHub Actions)',
        'ESLint, Prettier',
      ],
    },
    {
      title: 'Testing & Quality',
      icon: '▸',
      skills: [
        'Jest',
        'Компонентные тесты, моки сервисов',
        'Performance: OnPush, trackBy',
        'Angular CLI, Chrome DevTools',
      ],
    },
  ] as SkillCategory[],
};

export interface PipelineStep {
  id: number;
  command: string;
  label: string;
  icon: string;
  duration: string;
}

export const PIPELINE_STEPS: PipelineStep[] = [
  { id: 1, command: 'git push origin main', label: 'Push to GitHub', icon: '↑', duration: '~2s' },
  { id: 2, command: 'GitHub Actions: triggered', label: 'CI Triggered', icon: '⚡', duration: '~5s' },
  { id: 3, command: 'npm ci', label: 'Install deps', icon: '📦', duration: '~30s' },
  { id: 4, command: 'npm run build', label: 'Build project', icon: '⚙', duration: '~25s' },
  { id: 5, command: 'SFTP → VPS /var/www/html/', label: 'Deploy via SFTP', icon: '🚀', duration: '~15s' },
  { id: 6, command: 'Site updated — LIVE ✅', label: 'Site is live!', icon: '●', duration: '' },
];

export const CONTACT_DATA = {
  telegram: 'tg://resolve?domain=a_lina_04',
  email: 'utyusheva01@yandex.ru',
  github: 'https://github.com/Alina0411',
};
