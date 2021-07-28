export class Episode {
  id: string;
  number: number;
  title: string;
  duration: string;
  description: string;
  photo: string;
  video: string;
  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.number = item?.number ?? '';
    this.title = item?.title ?? '';
    this.duration = item?.duration ?? '';
    this.description = item?.description ?? '';
    this.photo = item?.photo ?? '';
    this.video = item?.video ?? '';
  }
}
