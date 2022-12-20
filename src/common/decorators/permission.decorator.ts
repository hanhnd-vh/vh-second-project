import { SetMetadata } from '@nestjs/common';
import { Permission } from '../constants';
import { MetaDataKey } from './meta-data-key';

export const Permissions = (...permissions: Permission[]) =>
    SetMetadata(MetaDataKey.PERMISSIONS, permissions);
