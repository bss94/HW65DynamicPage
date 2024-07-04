export interface ApiPage {
  title: string;
  content: string;
}

export interface ApiPages {
  [id: string]: ApiPage;
}

export interface Page extends ApiPage {
  id: string;
}