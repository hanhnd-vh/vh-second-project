import { HttpException } from '@nestjs/common';
import { HttpStatus } from 'src/common/constants';

export class ItemAlreadyExistedException extends HttpException {
    constructor(message?: string) {
        super(
            message || 'Item already existed!',
            HttpStatus.ITEM_ALREADY_EXIST,
        );
    }
}
