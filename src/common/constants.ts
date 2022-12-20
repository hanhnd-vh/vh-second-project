import Joi from 'joi';

export const Regex = {
    EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{1,255}$/,
};

export const MIN_PAGE_VALUE = 1;
export const MIN_PAGE_LIMIT = 1;
export const DEFAULT_PAGE_VALUE = 1;
export const DEFAULT_PAGE_LIMIT = 10;

export enum OrderDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum OrderBy {
    ID = 'id',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at',
}

export const CommonListQuerySchema = {
    page: Joi.number().min(MIN_PAGE_VALUE).optional().allow(null),
    limit: Joi.number().min(MIN_PAGE_LIMIT).optional().allow(null),
    keyword: Joi.string().optional().allow(null, ''),
    orderDirection: Joi.string()
        .valid(...Object.values(OrderDirection))
        .optional(),
    orderBy: Joi.string()
        .valid(...Object.values(OrderBy))
        .optional(),
};

export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    INVALID_USERNAME_OR_PASSWORD = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    GROUP_HAS_CHILDREN = 410,
    GROUP_MAX_QUANTITY = 412,
    ITEM_NOT_FOUND = 444,
    ITEM_ALREADY_EXIST = 445,
    ITEM_INVALID = 446,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export enum Roles {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export enum Permissions {
    // User
    CREATE_USER = 'CREATE_USER',
    READ_USER = 'READ_USER',
    UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE',
    CHANGE_PASSWORD = 'CHANGE_PASSWORD',
    CHANGE_USER_ROLES = 'CHANGE_USER_ROLES',
    DELETE_USER = 'DELETE_USER',

    // Role
    CREATE_ROLE = 'CREATE_ROLE',
    READ_ROLE = 'READ_ROLE',
    UPDATE_ROLE = 'UPDATE_ROLE',
    DELETE_ROLE = 'DELETE_ROLE',

    // Role Group
    CREATE_ROLE_GROUP = 'CREATE_ROLE_GROUP',
    READ_ROLE_GROUP = 'READ_ROLE_GROUP',
    UPDATE_ROLE_GROUP = 'UPDATE_ROLE_GROUP',
    DELETE_ROLE_GROUP = 'DELETE_ROLE_GROUP',
}
