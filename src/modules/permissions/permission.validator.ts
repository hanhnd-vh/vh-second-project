import { CommonGetListQuerySchema } from 'src/common/constants';
import Joi from 'src/plugins/joi';
import { PERMISSION_NAME_MAX_LENGTH } from './permission.constant';

export const permissionGetListQuerySchema = Joi.object().keys({
    ...CommonGetListQuerySchema,
    orderBy: Joi.string().valid('id', 'name').optional(),
});

export const createPermissionSchema = Joi.object().keys({
    name: Joi.string().trim().max(PERMISSION_NAME_MAX_LENGTH).required(),
});

export const updatePermissionSchema = Joi.object().keys({
    name: Joi.string().trim().max(PERMISSION_NAME_MAX_LENGTH).required(),
});
