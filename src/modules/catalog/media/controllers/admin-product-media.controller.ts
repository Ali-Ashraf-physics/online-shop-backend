import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductMediaService } from '../services/product-media.service';
import type { RequestContext } from '../services/product-media.service';
import { UploadProductMediaDto } from '../dto/upload-product-media.dto';
import { ProductMediaResponseDto } from '../../products/dto/product-response.dto';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../../common/guards/permissions.guard';
import { RequirePermissions } from '../../../../common/decorators/permissions.decorator';
import { Permission } from '../../../../common/enums/permission.enum';

@ApiTags('Admin Product Media')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('admin/products')
export class AdminProductMediaController {
    constructor(private readonly mediaService: ProductMediaService) { }

    @Post(':productId/media')
    @RequirePermissions(Permission.MANAGE_PRODUCTS)
    @ApiOperation({ summary: 'Attach product media', operationId: 'adminAttachProductMedia' })
    @ApiResponse({ status: 201, type: ProductMediaResponseDto })
    async attachMedia(
        @Req() req: RequestContext,
        @Param('productId') productId: string,
        @Body() dto: UploadProductMediaDto,
    ): Promise<ProductMediaResponseDto> {
        return this.mediaService.attachProductMedia(req, productId, dto);
    }
}
