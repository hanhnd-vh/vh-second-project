import { Controller } from '@nestjs/common';
import { RoleGroupService } from './role-group.service';

@Controller('/role-groups')
export class RoleGroupController {
    constructor(private roleGroupService: RoleGroupService) {}
}
