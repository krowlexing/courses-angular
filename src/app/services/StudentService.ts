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

        this.valuesSubject.next(savedStudents);

        this.valuesSubject.subscribe((values) => {
            this.persistance.store(persistanceKey, values);
        });
    }
}
