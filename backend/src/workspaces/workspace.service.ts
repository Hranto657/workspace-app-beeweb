import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Workspace } from "./workspace.entity";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>
  ) {}

  private async getWorkspaceOrThrow(id: string): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findOneBy({ id });
    if (!workspace) throw new NotFoundException("Workspace not found");
    return workspace;
  }

  private ensureOwnership(workspace: Workspace, userId: string): void {
    if (String(workspace.ownerId) !== String(userId)) {
      throw new ForbiddenException("Access denied");
    }
  }

  private async ensureSlugUnique(
    slug: string,
    ignoreId?: string
  ): Promise<void> {
    const existing = await this.workspaceRepository.findOneBy({ slug });
    if (existing && existing.id !== ignoreId) {
      throw new ConflictException("Slug is already taken");
    }
  }

  async create(
    createWorkspaceDto: CreateWorkspaceDto,
    ownerId: string
  ): Promise<Workspace> {
    await this.ensureSlugUnique(createWorkspaceDto.slug);

    const workspace = this.workspaceRepository.create({
      ...createWorkspaceDto,
      ownerId,
    });

    return this.workspaceRepository.save(workspace);
  }

  async checkSlug(slug: string): Promise<{ available: boolean }> {
    const existing = await this.workspaceRepository.findOneBy({ slug });
    return { available: !existing };
  }

  async findAllByUser(ownerId: string): Promise<Workspace[]> {
    return this.workspaceRepository.find({
      where: { ownerId },
      order: { createdAt: "DESC" },
    });
  }
  async findOneById(id: string, ownerId: string): Promise<Workspace> {
    const workspace = await this.getWorkspaceOrThrow(id);
    this.ensureOwnership(workspace, ownerId);
    return workspace;
  }

  async update(
    id: string,
    dto: UpdateWorkspaceDto,
    ownerId: string
  ): Promise<Workspace> {
    const workspace = await this.getWorkspaceOrThrow(id);
    this.ensureOwnership(workspace, ownerId);

    if (dto.slug && dto.slug !== workspace.slug) {
      await this.ensureSlugUnique(dto.slug, workspace.id);
    }

    Object.assign(workspace, dto);
    return this.workspaceRepository.save(workspace);
  }

  async remove(id: string, ownerId: string): Promise<{ message: string }> {
    const workspace = await this.getWorkspaceOrThrow(id);
    this.ensureOwnership(workspace, ownerId);

    await this.workspaceRepository.remove(workspace);
    return { message: "Workspace deleted successfully" };
  }
}
