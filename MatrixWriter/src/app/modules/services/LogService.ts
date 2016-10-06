import { Injectable}    from '@angular/core';

export class LogService {

    LogMessage(message: string): LogService {
        console.log(message);
        return this;
    }
    Log(message: string, value?: any): LogService {
        console.log(message);
        if (value)
            console.log(value);
        return this;
    }
}