export interface IItem {
  name: string;
  quantity?: number;
  purchased: boolean;
}

export interface IStore {
  name: string;
  location?: string; // El signo de interrogacion es para decir que es opcional
  items: IItem[];
}