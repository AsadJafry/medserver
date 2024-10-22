import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number;
  
    @IsNotEmpty()
    @IsString()
    currency: string;
  
    @IsNotEmpty()
    @IsString()
    source: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
}
