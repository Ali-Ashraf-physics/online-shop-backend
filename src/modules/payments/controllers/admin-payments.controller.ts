import { Body, Controller, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from '../services/payments.service';
import { PaymentListResponseDto, PaymentResponseDto } from '../dto/payment-response.dto';
import { ManualPaymentDto } from '../dto/manual-payment.dto';
import { AdminPaymentQueryDto } from '../dto/admin-payment-query.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../common/guards/permissions.guard';
import { RequirePermissions } from '../../../common/decorators/permissions.decorator';
import { Permission } from '../../../common/enums/permission.enum';

@ApiTags('Admin Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/payments')
export class AdminPaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Get()
    @RequirePermissions(Permission.MANAGE_PAYMENTS)
    @ApiOperation({ summary: 'List payments', operationId: 'listAdminPayments' })
    @ApiResponse({ status: 200, type: PaymentListResponseDto })
    async list(@Query() query: AdminPaymentQueryDto): Promise<PaymentListResponseDto> {
        return this.paymentsService.listPayments(query);
    }

    @Patch(':paymentId/mark-paid')
    @RequirePermissions(Permission.MANAGE_PAYMENTS)
    @ApiOperation({ summary: 'Mark payment as paid', operationId: 'markPaymentPaid' })
    @ApiResponse({ status: 200, type: PaymentResponseDto })
    async markPaid(
        @Req() req: { user: { sub: string } },
        @Param('paymentId') paymentId: string,
        @Body() dto: ManualPaymentDto,
    ): Promise<PaymentResponseDto> {
        return this.paymentsService.markManualPaid({ user: { sub: req.user.sub } }, paymentId, dto);
    }

    @Patch(':paymentId/mark-failed')
    @RequirePermissions(Permission.MANAGE_PAYMENTS)
    @ApiOperation({ summary: 'Mark payment as failed', operationId: 'markPaymentFailed' })
    @ApiResponse({ status: 200, type: PaymentResponseDto })
    async markFailed(
        @Req() req: { user: { sub: string } },
        @Param('paymentId') paymentId: string,
        @Body() dto: ManualPaymentDto,
    ): Promise<PaymentResponseDto> {
        return this.paymentsService.markFailed({ user: { sub: req.user.sub } }, paymentId, dto);
    }
}
