import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../repositories/admin.repository';
import { AdminDashboardResponseDto } from '../dto/admin-dashboard-response.dto';

export type RequestContext = { user: { sub: string } };

@Injectable()
export class AdminDashboardService {
    constructor(private readonly adminRepository: AdminRepository) { }

    async getDashboardStats(_context: RequestContext): Promise<AdminDashboardResponseDto> {
        const { total, active } = await this.adminRepository.countAdmins();
        return { totalAdmins: total, activeAdmins: active };
    }
}
