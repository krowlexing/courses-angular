import { Injectable } from '@angular/core';
import { Course } from '../data/Course';
import { DataService } from './DataService';

@Injectable({ providedIn: 'root' })
export class CoursesService extends DataService<Course, Omit<Course, 'id'>> {
    defaultCourses(): Course[] {
        return [
            {
                id: 1,
                title: 'Как стать успешным фронтэндером за 15 минут',
                description:
                    'В этом курсе вы узнаете как овладеть мастерством создания прекраснейших сайтов и приложений используя фреймворк Angular.',
                duration: { weeks: 0 },
                price: 9000,
                lessons: [],
            },
        ];
    }
}
