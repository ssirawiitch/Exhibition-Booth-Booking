export interface ExhibitionItem {
  id: number;
  name: string;
  description: string;
  venue: string;
  startDate: string;
  durationDay: number;
  smallBoothQuota: number;
  bigBoothQuota: number;
  posterPicture: string;
}

export interface ExhibitionJson {
  count: number;
  data: ExhibitionItem[];
}