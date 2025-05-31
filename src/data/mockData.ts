// Mock data for the application

// Lessons
export const lessons = [
  {
    id: '1',
    title: 'Introduction to the Alphabet',
    description: 'Learn the basics of the alphabet and letter sounds.',
    content: 'This lesson introduces students to the alphabet and the sounds that each letter makes. Students will practice identifying letters and their sounds through interactive activities.',
    file_path: '/uploads/alphabet.pdf',
    difficulty: 'easy',
    uploaded_by: 'Teacher Johnson',
    created_at: '2025-03-15T10:30:00'
  },
  {
    id: '2',
    title: 'Vowel Sounds',
    description: 'Explore the sounds of vowels and their importance in words.',
    content: 'This lesson focuses on the five vowels (A, E, I, O, U) and their sounds. Students will learn about short and long vowel sounds through examples and exercises.',
    file_path: '/uploads/vowels.pdf',
    difficulty: 'easy',
    uploaded_by: 'Teacher Johnson',
    created_at: '2025-03-20T14:15:00'
  },
  {
    id: '3',
    title: 'Simple Word Formation',
    description: 'Learn how to form simple three-letter words by combining consonants and vowels.',
    content: 'In this lesson, students will learn how to combine consonants and vowels to form simple three-letter words like "cat", "dog", and "sun". Interactive exercises will help them practice reading and writing these words.',
    file_path: '/uploads/wordformation.pdf',
    difficulty: 'medium',
    uploaded_by: 'Teacher Smith',
    created_at: '2025-03-25T09:45:00'
  },
  {
    id: '4',
    title: 'Reading Simple Sentences',
    description: 'Practice reading simple sentences composed of basic vocabulary.',
    content: 'This lesson helps students practice reading simple sentences made up of the words they have learned. They will focus on sentence structure and reading fluency.',
    file_path: '/uploads/sentences.pdf',
    difficulty: 'medium',
    uploaded_by: 'Teacher Johnson',
    created_at: '2025-04-02T11:20:00'
  },
  {
    id: '5',
    title: 'Recognizing Sight Words',
    description: 'Learn to recognize common sight words that appear frequently in reading.',
    content: 'Sight words are words that appear frequently in reading and often don\'t follow regular phonetic rules. This lesson introduces common sight words like "the", "and", "is", and "to".',
    file_path: '/uploads/sightwords.pdf',
    difficulty: 'hard',
    uploaded_by: 'Teacher Smith',
    created_at: '2025-04-10T13:00:00'
  },
  {
    id: '6',
    title: 'Blending Sounds',
    description: 'Practice blending letter sounds to form words.',
    content: 'In this lesson, students will learn the skill of blending sounds together to read words. They will practice hearing individual sounds and then combining them to recognize whole words.',
    file_path: '/uploads/blending.pdf',
    difficulty: 'medium',
    uploaded_by: 'Teacher Johnson',
    created_at: '2025-04-15T10:10:00'
  }
];

// Students
export const students = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'password',
    grade_level: '1',
    progress: 68,
    completed_lessons: 4,
    total_lessons: 6,
    achievements: 2,
    study_hours: 14,
    last_activity: '2 hours ago'
  },
  {
    id: '2',
    name: 'Sofia Martinez',
    email: 'sofia@example.com',
    password: 'password',
    grade_level: '1',
    progress: 42,
    completed_lessons: 2,
    total_lessons: 6,
    achievements: 1,
    study_hours: 8,
    last_activity: '1 day ago'
  },
  {
    id: '3',
    name: 'Jamal Wilson',
    email: 'jamal@example.com',
    password: 'password',
    grade_level: '1',
    progress: 83,
    completed_lessons: 5,
    total_lessons: 6,
    achievements: 3,
    study_hours: 18,
    last_activity: '3 hours ago'
  },
  {
    id: '4',
    name: 'Emily Chang',
    email: 'emily@example.com',
    password: 'password',
    grade_level: '1',
    progress: 55,
    completed_lessons: 3,
    total_lessons: 6,
    achievements: 2,
    study_hours: 12,
    last_activity: '5 hours ago'
  },
  {
    id: '5',
    name: 'Noah Roberts',
    email: 'noah@example.com',
    password: 'password',
    grade_level: '1',
    progress: 25,
    completed_lessons: 1,
    total_lessons: 6,
    achievements: 1,
    study_hours: 6,
    last_activity: '2 days ago'
  }
];