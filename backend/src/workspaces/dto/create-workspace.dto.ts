import { IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/^[a-z0-9-]+$/, {
    message: "Slug can only contain lowercase letters, numbers and dashes",
  })
  slug: string;
}
