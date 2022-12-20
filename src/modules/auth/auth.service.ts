import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { uniqBy } from 'lodash';
import { ItemAlreadyExistedException } from 'src/exception/item-already-existed.exception';
import { Role, User } from 'src/models';
import { compare, hash } from 'src/plugins/bcrypt';
import { PermissionService } from '../permissions/permission.service';
import { RoleService } from '../roles/role.service';
import { UserService } from '../users/user.service';
import { IJwtPayload } from './../../../dist/plugins/jwt.d';
import { ConfigKey } from './../../common/config/config-key';
import { RoleGroup } from './../../models/role-group.model';
import { ILoginBody, IRegisterBody } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private jwtService: JwtService,
        private configService: ConfigService,
        private userService: UserService,
        private roleService: RoleService,
        private permissionService: PermissionService,
    ) {}

    private readonly logger = new Logger(AuthService.name);

    async login(body: ILoginBody) {
        try {
            const existedUser = await this.getUserByUsername(body.username);
            if (!existedUser) {
                throw new NotFoundException('user not found!');
            }
            if (existedUser.deletedAt) {
                throw new ForbiddenException('this user has been deleted!');
            }
            const isPasswordMatched = await compare(
                body.password,
                existedUser.password,
            );
            if (!isPasswordMatched) {
                throw new BadRequestException('invalid username or password');
            }

            const token = await this.signUserToken(existedUser);
            return token;
        } catch (error) {
            this.logger.error('Error at service login: ' + error);
            throw error;
        }
    }

    async register(body: IRegisterBody) {
        try {
            const isUsernameExisted = await this.getUserByUsername(
                body.username,
            );
            if (isUsernameExisted) {
                throw new ItemAlreadyExistedException();
            }

            const hashedPassword = await hash(body.password);
            const createdUser = await User.create({
                ...body,
                password: hashedPassword,
            });

            // Set role is user by default
            await createdUser.setRoles([2]);
            const user = await this.userService.getUserById(createdUser.id);
            const token = await this.signUserToken(user);
            return token;
        } catch (error) {
            this.logger.error('Error at service register: ' + error);
            throw error;
        }
    }

    async getUserByUsername(username: string) {
        try {
            const existedUser = await this.userModel.findOne({
                where: {
                    username,
                },
                paranoid: false,
                include: [Role, RoleGroup],
            });
            return existedUser;
        } catch (error) {
            this.logger.error('Error at service getUserByUsername: ' + error);
            throw error;
        }
    }

    async signUserToken(user: User) {
        try {
            const roleGroupIds = (user.roleGroups || []).map(
                (roleGroup: RoleGroup) => roleGroup.id,
            );
            const roleInRoleGroups =
                await this.roleService.getRolesByRoleGroupIds(roleGroupIds);
            const userRoles = uniqBy(
                [...roleInRoleGroups, ...(user.roles || [])],
                'id',
            );
            const roleIds = userRoles.map((role) => role.id);
            const roles = userRoles.map((role) => role.name);
            const permissions = (
                (await this.permissionService.getPermissionsByRoleIds(
                    roleIds,
                )) || []
            ).map((permission) => permission.name);
            const token = await this.createToken({
                userId: user.id,
                username: user.username,
                roles,
                permissions,
            });
            return token;
        } catch (error) {
            this.logger.error('Error at service signUserToken: ' + error);
            throw error;
        }
    }

    async createToken(payload: IJwtPayload) {
        try {
            const accessToken = await this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>(
                    ConfigKey.JWT_ACCESS_TOKEN_SECRET,
                ),
                expiresIn: this.configService.get<string>(
                    ConfigKey.JWT_ACCESS_TOKEN_EXPIRES_TIME,
                ),
            });
            return accessToken;
        } catch (error) {
            this.logger.error('Error at service createToken: ' + error);
            throw error;
        }
    }
}
