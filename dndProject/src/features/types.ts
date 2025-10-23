export type ListQuery<T extends object = {}> = Partial<T> & {
  limit?: number;
  page?: number;
  query?: string;
  worldId?: number;
};

export interface GetList<T> {
  data: T[];
  meta: Meta;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
}
