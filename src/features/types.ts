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

export interface SeasonType {
    id?: number;
    number?: number;
    episodesCount?: number;
    episodes?: {
        number?: number;
        name?: string;
        still?: {
            previewUrl?: string;
            url?: string;
        };
    }[];
}

export interface FilmType {
    id?: number;
    name?: string;
    description?: string;
    type?: string;
    poster?: {
        url?: string;
        previewUrl?: string;
    }
    rating?: {
        kp: number;
        imdb: number;
    };
    persons?: {
        id: number;
        photo: string;
        name: string;
        enName: string;
        description: string;
        profession: string;
    }[];
    similarMovies?: {
        id: number;
        name: string;
        alternativeName: string;
        poster: {
            url: string;
            previewUrl: string;
        };
    }[];
}


export interface FlattenSeriesType {
    seasonId?: number;
    seasonNumber?: number;
    episodeNumber?: number;
    still?: {
        previewUrl?: string;
        url?: string;
    };
    episodeName?: string;
}

export interface SeasonsListType {
    docs?: SeasonType[];
    total?: number;
}

export interface PosterType {
    id?: number;
    url?: string;
    previewUrl?: string;
}

export interface PostersListType {
    docs?: PosterType[];
    total?: number;
    pages?: number;
}


export interface ReviewType {
    id?: number;
    movieId?: number;
    title?: string;
    type?: string;
    review?: string;
    author?: string;
    date?: string;
}

export interface ReviewsListType {
    docs?: ReviewType[];
    total?: number;
}