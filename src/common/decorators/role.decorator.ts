import { SetMetadata } from '@nestjs/common';
import { Role } from '../constants';
import { MetaDataKey } from './meta-data-key';

export const Roles = (...roles: Role[]) =>
    SetMetadata(MetaDataKey.ROLES, roles);
