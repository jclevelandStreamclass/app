export class SportsPlayer {
  id: string;
  name: string;
  bio: string;
  job: string;
  photo: string;
  // implementacion serie
  serie: string;

  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.name = item?.name ?? '';
    this.bio = item?.bio ?? '';
    this.job = item?.job ?? '';
    this.photo = item?.photo ?? '';
    this.serie = item?.serie?.title ?? '';
  }
}
