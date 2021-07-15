export class Category {
    id:number;
    name:string;
    photo:string;

    constructor (item?:any){
        this.id = item?.id ?? ''
        this.name = item?.name ?? ''
        this.photo = item?.photo ?? ''

    }
}

