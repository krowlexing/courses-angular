import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService<T extends { id: number }, NewT extends Omit<T, 'id'>> {
    constructor() {}

    taskCounter = 1;

    valuesSubject = new BehaviorSubject<T[]>([]);

    values(): Observable<T[]> {
        return this.valuesSubject;
    }

    push(value: NewT) {
        this.valuesSubject.next([
            ...this.valuesSubject.value,
            this.generate(value),
        ]);
    }

    update(valueId: number, newValue: NewT) {
        const values = this.valuesSubject.value;
        const foundValueIndex = values.findIndex((task) => task.id === valueId);

        if (foundValueIndex !== -1) {
            const updatedValue = {
                ...values[foundValueIndex],
                ...newValue,
            };

            const newValues: T[] = values.filter((task) => task.id !== valueId);
            newValues.push(updatedValue);
            this.valuesSubject.next(newValues);
        }
    }

    remove(valueId: number) {
        this.valuesSubject.next(
            this.valuesSubject.value.filter((value) => value.id !== valueId)
        );
    }

    generate(newValue: NewT): T {
        const date = new Date().valueOf();
        const value: T = {
            ...newValue,
            id: this.taskCounter,
        } as any;
        this.taskCounter++;

        return value;
    }
}
