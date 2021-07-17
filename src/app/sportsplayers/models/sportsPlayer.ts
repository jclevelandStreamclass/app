export class SportsPlayer {
    id: string;
    name: string;
    bio: string;
    job: string;
    photo: string;

    constructor(item?: any) {
        this.id = item?.id ?? '';
        this.name = item?.title ?? '';
        this.bio = item?.description ?? '';
        this.job = item?.photo ?? '';
        this.photo = item?.photo ?? '';
    }
}