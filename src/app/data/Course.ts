export type NewCourse = {
    title: string;
    description: string;
    duration: CourseDuration;
    price: number;
    lessons: NewLesson[];
};

export type Course = Id & Omit<NewCourse, 'lessons'> & { lessons: Lesson[] };

export type CourseDuration = {
    weeks: number;
};
export type NewLesson = {
    title: string;
    description: string;
    publicationDate: Date;
    attachments: LessonAttachment[];
};

export type Lesson = NewLesson;

export type LessonAttachment = {
    url: string;
};

export type Student = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    courses: Id[];
};

export type CourseReference = Id;

export type NewStudent = {
    firstName: string;
    lastName: string;
    email: string;
    courses: Id[];
};

export type Id = {
    id: number;
};
