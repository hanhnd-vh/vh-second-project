import { CommonGetListQuerySchema, Regex } from 'src/common/constants';
import Joi from 'src/plugins/joi';
import { USER_PASSWORD_MIN_LENGTH } from './user.constant';

export const userGetListQuerySchema = Joi.object().keys({
    ...CommonGetListQuerySchema,
});

export const updateUserProfileSchema = Joi.object().keys({
    email: Joi.string().trim().regex(new RegExp(Regex.EMAIL)).required(),
});

export const updateUserPasswordSchema = Joi.object().keys({
    password: Joi.string().trim().min(USER_PASSWORD_MIN_LENGTH).required(),
});

export const updateUserRolesSchema = Joi.object().keys({
    roleIds: Joi.array().items(Joi.number()),
});

export const updateUserRoleGroupsSchema = Joi.object().keys({
    roleGroupIds: Joi.array().items(Joi.number()),
});
