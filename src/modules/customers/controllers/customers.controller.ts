import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CustomersService } from '../services/customers.service';
import { UpdateCustomerDto, CustomerResponseDto } from '../dto/customer.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('me')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @Get()
    @ApiOperation({ summary: 'Get current customer profile', operationId: 'getMyProfile' })
    @ApiResponse({ status: 200, type: CustomerResponseDto })
    async getProfile(@Req() req: { user: { sub: string } }): Promise<CustomerResponseDto> {
        return this.customersService.findByUserId(req.user.sub);
    }

    @Patch()
    @ApiOperation({ summary: 'Update customer profile', operationId: 'updateMyProfile' })
    @ApiResponse({ status: 200, type: CustomerResponseDto })
    async updateProfile(
        @Req() req: { user: { sub: string } },
        @Body() dto: UpdateCustomerDto,
    ): Promise<CustomerResponseDto> {
        return this.customersService.updateProfile(req.user.sub, dto);
    }
}
