import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { WorkspacesService } from "./workspace.service";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
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

  @Get("check-slug")
  checkSlug(@Query("slug") slug: string) {
    return this.workspacesService.checkSlugAvailability(slug);
  }

  @Get()
  findAll(@Req() req) {
    const ownerId = req.user.userId;
    return this.workspacesService.findAllByUser(ownerId);
  }

  @Get("slug/:slug")
  findOneBySlug(@Param("slug") slug: string, @Req() req) {
    const ownerId = req.user.userId;
    return this.workspacesService.findOneBySlug(slug, ownerId);
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
