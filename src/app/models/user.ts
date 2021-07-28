export class UserModel {
  id: string;
  name: string;
  email: string;
  role: string;
  bearer: string;
  phone: string;
  avatar: string;
  active: boolean;

  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.name = item?.name ?? '';
    this.email = item?.email ?? '';
    this.role = item?.role ?? '';
    this.bearer = item?.bearer ?? '';
    this.phone = item?.phone ?? '';
    this.avatar = item?.avatar ?? '';
    this.active = item?.active ?? false;
  }
}
