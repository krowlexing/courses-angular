export type Course = {
    title: string;
    description: string;
    duration: CourseDuration;
    price: number;
    lessons: Lesson[];
};

export type CourseDuration = {
    weeks: number;
};

export type Lesson = {
    title: string;
    description: string;
    publicationDate: Date;
    attachments: LessonAttachment[];
};

export type LessonAttachment = {
    type: 'file' | 'image';
    url: string;
};

export type Student = {
    firstName: string;
    lastName: string;
    email: string;
    courses: Course[];
};
