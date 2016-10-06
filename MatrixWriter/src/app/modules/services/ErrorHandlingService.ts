import { Injectable} from '@angular/core';
// Error handling service
@Injectable()
export class ErrorHandlingService {

    constructor() {
    }

    HandleError(error:any) {
        console.log(error);
    }
}