import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'User email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: 'User password' })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'User role' })
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
