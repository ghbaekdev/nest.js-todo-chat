import { CustomRepository } from 'src/configs/typeorm.decorator';
import { Repository } from 'typeorm';
import { History } from './history.entity';

@CustomRepository(History)
export class HistoryRepository extends Repository<History> {}
