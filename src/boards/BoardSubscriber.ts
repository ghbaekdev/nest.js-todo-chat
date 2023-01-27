import { Board } from './board.entity';
import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';

@EventSubscriber()
export class BoardSubscriber implements EntitySubscriberInterface<Board> {
  // constructor(
  //   @InjectRepository(HistoryRepository)
  //   private historyRepository: HistoryRepository,
  // ) {}
  // listenTo() {
  //   return Board;
  // }
  // async afterInsert(event: InsertEvent<Board>) {
  //   const {
  //     user: { username },
  //     createdAt,
  //   } = event.entity;
  //   console.log(username, createdAt);
  //   console.log(this.historyRepository);
  //   // const history = await this.historyRepository.create({
  //   //   username,
  //   //   createdAt,
  //   //   status: HistoryStatus.INSERT,
  //   // });
  //   // await this.historyRepository.save(history);
  //   // console.log(history);
  //   // return history;
  // }
  // beforeRemove(event: RemoveEvent<Board>): void | Promise<any> {
  //   console.log('hi2');
  //   console.log(`BEFORE ENTITY WITH ID ${event.entityId}`);
  // }
}
