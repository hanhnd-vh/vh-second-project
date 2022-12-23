import { Includeable } from 'sequelize';
import { User } from 'src/models';
import { userExcludeAttributes } from 'src/models/user.model';

export const userGroupIncludes: Includeable[] = [
    {
        model: User,
        as: 'manager',
        attributes: {
            exclude: userExcludeAttributes,
        },
    },
    {
        model: User,
        as: 'users',
        attributes: {
            exclude: userExcludeAttributes,
        },
        through: {
            attributes: [],
        },
    },
];

export const userGroupExcludeAttributes = ['manager_id'];

export const USER_GROUP_NAME_MAX_LENGTH = 200;
