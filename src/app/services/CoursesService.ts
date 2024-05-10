import { Injectable } from '@angular/core';
import { Course } from '../data/Course';

@Injectable({ providedIn: 'root' })
export class CoursesService {
    constructor() {}

    courses(): Course[] {
        return [
            {
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
