import {Serie} from '../../series/models/serie';

export class Category  {
    id:string;
    name:string;
    photo:string;
    series: [];

    constructor (item?:any){
        this.id = item?.id ?? ''
        this.name = item?.name ?? ''
        this.photo = item?.photo ?? ''
        this.series = item?.serie ?? []
    }
}

