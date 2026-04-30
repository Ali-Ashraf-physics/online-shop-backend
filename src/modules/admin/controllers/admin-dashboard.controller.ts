import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminDashboardService } from '../services/admin-dashboard.service';
import { AdminDashboardResponseDto } from '../dto/admin-dashboard-response.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../common/guards/permissions.guard';
import { RequirePermissions } from '../../../common/decorators/permissions.decorator';
import { Permission } from '../../../common/enums/permission.enum';

@ApiTags('Admin Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/dashboard')
export class AdminDashboardController {
    constructor(private readonly dashboardService: AdminDashboardService) { }

    @Get()
    @RequirePermissions(Permission.ADMIN_DASHBOARD_READ)
    @ApiOperation({ summary: 'Get admin dashboard stats', operationId: 'getAdminDashboard' })
    @ApiResponse({ status: 200, type: AdminDashboardResponseDto })
    async getDashboard(@Req() req: { user: { sub: string } }): Promise<AdminDashboardResponseDto> {
        return this.dashboardService.getDashboardStats({ user: { sub: req.user.sub } });
    }
}
