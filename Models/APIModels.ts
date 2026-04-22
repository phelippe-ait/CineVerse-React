interface Response {
    page: number;
    results: Movie[];
}

 export interface Movie {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    posterPath: string | null;
    voteAverage: string;
}

export function mapJsonToMovie(json: any): Movie {
    return {
        id: json.id,
        title: json.title ?? "Unknown Title",
        overview: json.overview ?? "No overview available.",
        releaseDate: json.release_date ?? "No release date available.",
        posterPath: json.poster_path ?? null,
        voteAverage: json.vote_average ?? "0.0",
    };
}