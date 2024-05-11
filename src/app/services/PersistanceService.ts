import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PersistanceService {
    store<T>(key: string, object: T) {
        localStorage.setItem(key, JSON.stringify(object));
    }

    load<T>(key: string): T | undefined {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        } else {
            return undefined;
        }
    }
}
