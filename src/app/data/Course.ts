export type NewCourse = {
    title: string;
    description: string;
    duration: CourseDuration;
    price: number;
    lessons: Lesson[];
};

export type Course = Id & NewCourse;

export type CourseDuration = {
    weeks: number;
};
export type NewLesson = {
    title: string;
    description: string;
    publicationDate: Date;
    attachments: LessonAttachment[];
};

export type Lesson = Id & NewLesson;

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

type Id = {
    id: number;
};
