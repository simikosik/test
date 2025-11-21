
import { QuestInterface } from './quest-interface';

export interface PlayerInterface {

    id: number, nickname: string, xp: number, clan?: number | null,
    assignedQuests: QuestInterface[];
    completedQuests: QuestInterface[],
}

