export interface LookupResult {
  query: string;
  queryType: 'phone' | 'uid';
  fullName: string;
  phoneNumber: string;
  operator: string;
  operatorColor?: string;
  gender: string;
  isVerified: boolean;
  searchTimestamp: number;
}

export interface LookupResponse {
  result: LookupResult;
  isRateLimited?: boolean;
  rateLimitMessage?: string;
  meta?: ApiMeta;
}

export interface ApiMeta {
  responseTimeMs?: number;
  httpStatus?: number;
  user?: string;
  plan?: string;
  limits?: {
    minute?: number;
    hour?: number;
    day?: number;
  };
}

export interface ApiSettings {
  apiUrl: string;
  apiKey: string;
}

export type ActiveTab = 'home' | 'search' | 'about' | 'settings';
export type SearchMode = 'phone' | 'uid';
