import { Injectable } from '@angular/core';
import { v4 as uuidv5 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class RandomGeneratorService {
  constructor() {
  }
  newGuid(): string { return uuidv5(); }
  postGuid(guid: string): string { return `{${guid}}`; }
}
