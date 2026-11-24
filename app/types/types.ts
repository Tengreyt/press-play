export interface GuideArticle {
  title: string;
  steps: string[];
  source?: string;
}

export interface GuideVideo {
  title: string;
  channel: string;
  id: string;
}
