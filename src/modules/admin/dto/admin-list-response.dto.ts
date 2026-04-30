import { ApiProperty } from '@nestjs/swagger';
import { AdminResponseDto } from './admin-response.dto';

class AdminListMetaDto {
    @ApiProperty()
    total: number;

    @ApiProperty()
    page: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    totalPages: number;
}

export class AdminListResponseDto {
    @ApiProperty({ type: [AdminResponseDto] })
    items: AdminResponseDto[];

    @ApiProperty({ type: AdminListMetaDto })
    meta: AdminListMetaDto;
}
