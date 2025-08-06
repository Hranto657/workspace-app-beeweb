import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Workspace } from "./workspace.entity";
import { WorkspacesService } from "./workspace.service";
import { WorkspacesController } from "./workspaces.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Workspace])],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
