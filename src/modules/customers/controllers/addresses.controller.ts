import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AddressesService } from '../services/addresses.service';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { AddressResponseDto } from '../dto/address-response.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('Addresses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('me/addresses')
export class AddressesController {
    constructor(private readonly addressesService: AddressesService) { }

    @Get()
    @ApiOperation({ summary: 'Get all saved addresses', operationId: 'getMyAddresses' })
    @ApiResponse({ status: HttpStatus.OK, type: [AddressResponseDto] })
    async getAddresses(@Req() req: { user: { sub: string } }): Promise<AddressResponseDto[]> {
        return this.addressesService.getAddresses(req.user.sub);
    }

    @Post()
    @ApiOperation({ summary: 'Add a new address', operationId: 'addAddress' })
    @ApiResponse({ status: HttpStatus.CREATED, type: AddressResponseDto })
    async addAddress(
        @Req() req: { user: { sub: string } },
        @Body() dto: CreateAddressDto,
    ): Promise<AddressResponseDto> {
        return this.addressesService.addAddress(req.user.sub, dto);
    }

    @Patch(':addressId')
    @ApiOperation({ summary: 'Update an existing address', operationId: 'updateAddress' })
    @ApiResponse({ status: HttpStatus.OK, type: AddressResponseDto })
    async updateAddress(
        @Req() req: { user: { sub: string } },
        @Param('addressId') addressId: string,
        @Body() dto: UpdateAddressDto,
    ): Promise<AddressResponseDto> {
        return this.addressesService.updateAddress(req.user.sub, addressId, dto);
    }

    @Delete(':addressId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remove a saved address', operationId: 'removeAddress' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT })
    async removeAddress(
        @Req() req: { user: { sub: string } },
        @Param('addressId') addressId: string,
    ): Promise<void> {
        return this.addressesService.removeAddress(req.user.sub, addressId);
    }
}
