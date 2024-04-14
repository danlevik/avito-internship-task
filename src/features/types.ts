export interface FilmCardType {
    id: number;
    name: string;
    alternativeName: string;
    poster: {
        url: string;
        previewUrl: string;
    };
}

export interface FilmsListType {
    docs?: FilmCardType[];
    pages?: number;
}