import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from '../services/payments.service';
import { InitiatePaymentDto } from '../dto/initiate-payment.dto';
import { PaymentResponseDto } from '../dto/payment-response.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post('initiate')
    @ApiOperation({ summary: 'Initiate payment for an order', operationId: 'initiatePayment' })
    @ApiResponse({ status: 200, type: PaymentResponseDto })
    async initiate(
        @Req() req: { user: { sub: string } },
        @Body() dto: InitiatePaymentDto,
    ): Promise<PaymentResponseDto> {
        return this.paymentsService.initiatePayment({ user: { sub: req.user.sub } }, dto, dto.idempotencyKey);
    }
}
