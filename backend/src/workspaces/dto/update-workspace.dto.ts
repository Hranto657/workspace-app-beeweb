import { IsOptional, IsString, MaxLength, Matches } from "class-validator";

export class UpdateWorkspaceDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @Matches(/^[a-z0-9-]+$/, {
    message: "Slug can only contain lowercase letters, numbers and dashes",
  })
  slug?: string;
}
