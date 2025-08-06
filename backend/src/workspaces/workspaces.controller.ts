import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { WorkspacesService } from "./workspace.service";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { CheckSlugDto } from "./dto/check-slug.dto";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";

@Controller("workspaces")
@UseGuards(JwtAuthGuard)
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  create(@Body() dto: CreateWorkspaceDto, @Req() req) {
    const ownerId = req.user.userId;
    return this.workspacesService.create(dto, ownerId);
  }

  @Post("check-slug")
  checkSlug(@Body() dto: CheckSlugDto) {
    return this.workspacesService.checkSlug(dto.slug);
  }

  @Get()
  findAll(@Req() req) {
    const ownerId = req.user.userId;
    return this.workspacesService.findAllByUser(ownerId);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Req() req) {
    const ownerId = req.user.userId;
    return this.workspacesService.findOneById(id, ownerId);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateWorkspaceDto, @Req() req) {
    const ownerId = req.user.userId;
    return this.workspacesService.update(id, dto, ownerId);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Req() req) {
    const ownerId = req.user.userId;
    return this.workspacesService.remove(id, ownerId);
  }
}
