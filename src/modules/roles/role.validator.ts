import { CommonGetListQuerySchema } from 'src/common/constants';
import Joi from 'src/plugins/joi';
import { ROLE_NAME_MAX_LENGTH } from './role.constant';

export const roleGetListQuerySchema = Joi.object().keys({
    ...CommonGetListQuerySchema,
    orderBy: Joi.string().valid('id', 'name').optional(),
});

export const createRoleSchema = Joi.object().keys({
    name: Joi.string().trim().max(ROLE_NAME_MAX_LENGTH).required(),
});

export const updateRoleSchema = Joi.object().keys({
    name: Joi.string().trim().max(ROLE_NAME_MAX_LENGTH).required(),
});

export const updateRolePermissionsSchema = Joi.object().keys({
    permissionIds: Joi.array().items(Joi.number()),
});
