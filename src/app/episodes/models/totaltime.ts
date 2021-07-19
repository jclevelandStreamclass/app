export class Totaltime {
  total_time: string;
  constructor(item?: any) {
    this.total_time = item?.total_time ?? '';
  }
}
