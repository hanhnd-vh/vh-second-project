import {
    Body,
    Controller,
    InternalServerErrorException,
    Post,
} from '@nestjs/common';
import { SuccessResponse } from 'src/common/helper/reponses';
import { ILoginBody, IRegisterBody } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('/')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    async login(@Body() body: ILoginBody) {
        try {
            const token = await this.authService.login(body);
            return new SuccessResponse(token);
        } catch (error) {
            throw error;
        }
    }

    @Post('/register')
    async register(@Body() body: IRegisterBody) {
        try {
            const token = await this.authService.register(body);
            return new SuccessResponse(token);
        } catch (error) {
            throw error;
        }
    }
}
