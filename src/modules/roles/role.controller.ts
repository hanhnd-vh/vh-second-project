import { RoleService } from './role.service';
import { Controller } from '@nestjs/common';

@Controller('/roles')
export class RoleController {
    constructor(private roleService: RoleService) {}
}