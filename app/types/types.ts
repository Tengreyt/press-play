export interface RentalFormValues {
  name: string;
  contact: string;
  startsOn: string;
  endsOn: string;
  note: string;
  contactConsent: boolean;
}

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
