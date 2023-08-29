export interface PaginatedResponseData<T> {
  status: number | string;
  message: string;
  meta: MetaData;
  data: T | T[];
}

interface MetaData {
  total_items: number;
  total_pages: number;
  current_page: number;
}
