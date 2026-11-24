import { CreateUserDto } from "./create-user.dto.js";
import { PartialType } from "@nestjs/mapped-types";

// Inherit same shape from CreateUserDto (reusable the shape or object)
export class UpdateUserDto extends PartialType(CreateUserDto) { }