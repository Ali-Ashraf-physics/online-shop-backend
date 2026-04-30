import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CustomersRepository } from '../repositories/customers.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';

@Injectable()
export class CustomersService {
    constructor(private readonly repo: CustomersRepository) { }

    private mapToDto(customer: import("../schemas/customer.schema").CustomerDocument): CustomerResponseDto {
        return {
            id: customer._id.toString(),
            userId: customer.userId.toString(),
            fullName: customer.fullName,
            phone: customer.phone,
            avatarUrl: customer.avatarUrl,
        };
    }

    async createCustomer(dto: CreateCustomerDto): Promise<CustomerResponseDto> {
        const existing = await this.repo.findByUserId(dto.userId);
        if (existing) throw new ConflictException('Customer profile already exists');

        const customer = await this.repo.create(dto);
        return this.mapToDto(customer);
    }

    async findByUserId(userId: string): Promise<CustomerResponseDto> {
        const customer = await this.repo.findByUserId(userId);
        if (!customer) throw new NotFoundException('Customer profile not found');

        return this.mapToDto(customer);
    }

    async updateProfile(userId: string, dto: UpdateCustomerDto): Promise<CustomerResponseDto> {
        const customer = await this.repo.updateByUserId(userId, dto);
        if (!customer) throw new NotFoundException('Customer profile not found');

        return this.mapToDto(customer);
    }
}
