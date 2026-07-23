export interface PageSeo {
  title: string;
  description: string;
}

export interface SeoSettings {
  siteName: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultOgImage: string;
  twitterHandle: string;
  robotsIndexable: boolean;
  pages: {
    home: PageSeo;
    catalog: PageSeo;
  };
}
