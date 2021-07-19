import {Serie} from '../../series/models/serie';

export class Category  {
    id:number;
    name:string;
    photo:string;
    serie: Serie;

    constructor (item?:any){
        this.id = item?.id ?? ''
        this.name = item?.name ?? ''
        this.photo = item?.photo ?? ''
        this.serie = item?.serie ?? ''
    }
}

