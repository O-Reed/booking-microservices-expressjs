export declare class AirportDto {
    id: number;
    code: string;
    name: string;
    address: string;
    createdAt: Date;
    updatedAt?: Date;
    constructor(request?: Partial<AirportDto>);
}
