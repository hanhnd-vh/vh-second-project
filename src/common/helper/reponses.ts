import * as dotenv from 'dotenv';
import { HttpStatus } from '../constants';
dotenv.config();

const DEFAULT_SUCCESS_MESSAGE = 'success';

export interface IErrorResponse {
    key?: string;
    code: number;
    message?: string;
}

export class SuccessResponse {
    constructor(data = {}) {
        return {
            code: HttpStatus.OK,
            message: DEFAULT_SUCCESS_MESSAGE,
            data,
        };
    }
}
export class ErrorResponse {
    constructor(
        code = HttpStatus.INTERNAL_SERVER_ERROR,
        message = '',
        errors: IErrorResponse[] = [],
    ) {
        return {
            code,
            message,
            errors,
        };
    }
}
