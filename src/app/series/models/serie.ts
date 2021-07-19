export class Serie {
  id: string;
  title: string;
  description: string;
  photo: string;
  episodes: [];
  sportsPlayerId: string;

  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.title = item?.title ?? '';
    this.description = item?.description ?? '';
    this.photo = item?.photo ?? '';
    this.episodes = item?.episodes ?? [];
    this.sportsPlayerId = item?.sportsPlayerId ?? '';
  }
}
