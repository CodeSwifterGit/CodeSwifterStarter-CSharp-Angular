import { ComponentCacheService } from "app/services/common/component-cache.service";
import { BehaviorSubject, Observable } from "rxjs";

export class ReactiveObject<T> {
    private subject: BehaviorSubject<T>;
    public stream$: Observable<T>;

    get value():T { return this.subject.value; }
    set value(value: T) { 
        this.componentCacheService.set(this.cacheIdentifier, value);
        this.subject.next(value); 
    }

    constructor(value: T, private readonly componentCacheService: ComponentCacheService, private readonly cacheIdentifier: string) {
        const cachedItem = this.componentCacheService.get(cacheIdentifier);
        this.subject = new BehaviorSubject<T>(cachedItem.found ? cachedItem.value : value);
        this.stream$ = this.subject.asObservable();
    }
}