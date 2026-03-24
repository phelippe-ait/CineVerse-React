interface Response {
    page: number;
    results: Movie[];
}

 export interface Movie {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    posterPath: string;
}

export function mapJsonToMovie(json: any): Movie {
    return {
        id: json.id,
        title: json.title ?? "",
        overview: json.overview ?? "",
        releaseDate: json.release_date ?? "",
        posterPath: json.poster_path ?? ""
    };
}