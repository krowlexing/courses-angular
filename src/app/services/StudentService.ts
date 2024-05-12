import { Injectable } from '@angular/core';
import { Course, Student } from '../data/Course';
import { DataService } from './DataService';
import { PersistanceService } from './PersistanceService';

const persistanceKey = 'students';

@Injectable({ providedIn: 'root' })
export class StudentService extends DataService<Student, Omit<Student, 'id'>> {
    constructor(private persistance: PersistanceService) {
        super();

        const savedStudents = persistance.load<Student[]>(persistanceKey) ?? [];
        const maxId =
            savedStudents.reduce(
                (bestId, student) => Math.max(bestId, student.id),
                1
            ) + 1;

        this.setIdCounter(maxId);
        this.valuesSubject.next(savedStudents);

        this.valuesSubject.subscribe((values) => {
            this.persistance.store(persistanceKey, values);
        });
    }
}
