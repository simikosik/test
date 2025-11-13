
import { QuestInterface } from './quest-interface';

export interface PlayerInterface {

    id: number, nickname: string, level: number, clan?: number | null,
    quests?: QuestInterface[],
}

