
export type StageId = 'A' | 'B' | 'C' | 'D' | 'E';

export interface AIOpsStage {
  id: StageId;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  description: string;
}

export interface AIOpsTask {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  type: 'hard-block' | 'soft-task';
}

export interface AIOpsDeliverable {
  id: string;
  name: string;
  type: string;
  url?: string;
}

export interface AIOpsRun {
  id: string;
  stageId: StageId;
  startTime: string;
  endTime?: string;
  status: 'running' | 'completed' | 'failed';
  progress: number;
}

export interface AIOpsRequest {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'completed';
  createdAt: string;
  updatedAt: string;
  stages: AIOpsStage[];
  tasks: AIOpsTask[];
  deliverables: AIOpsDeliverable[];
  runs: AIOpsRun[];
}
