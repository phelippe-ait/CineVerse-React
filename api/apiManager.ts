import { Movie, mapJsonToMovie } from "../Models/APIModels";

class ApiManager {
    private static instance: ApiManager;
    private baseUrl: string;
    private options;
    private apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY || "";

    private normalizeSearchResults(results: any[]): any[] {
        const movies: any[] = [];

        for (const item of results) {
            if (item?.media_type === "movie") {
                movies.push(item);
                continue;
            }

            if (item?.media_type !== "person" || !Array.isArray(item.known_for)) {
                continue;
            }

            const knownForMovies = item.known_for.filter(
                (knownItem: any) => knownItem?.media_type === "movie"
            );

            movies.push(...knownForMovies);
        }

        const uniqueMovies = new Map<number, any>();

        for (const movie of movies) {
            if (movie?.id && !uniqueMovies.has(movie.id)) {
                uniqueMovies.set(movie.id, movie);
            }
        }

        return Array.from(uniqueMovies.values());
    }

    private constructor() {
        this.baseUrl = 'https://api.themoviedb.org/3/';
        this.options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${this.apiKey}`
            }
        };
    }

    // Singleton pattern to ensure only one instance of ApiManager exists
    public static getInstance(): ApiManager {
        if (!ApiManager.instance) {
            ApiManager.instance = new ApiManager();
        }
        return ApiManager.instance;
    }

    // Method to fetch popular movies from TMDB API
    async getPopularMovies(page: number): Promise<[Movie[], number]> {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}`, this.options);
            if (!response.ok) {
                throw new Error("TMDB request failed: " + response.status);
            }
            const data = await response.json();
            return [data.results.map(mapJsonToMovie), data.total_pages];
        } catch (error) {
            console.error("Error fetching popular movies:", error);
            throw error;
        }
    }

    async searchMovies(query: string, page: number): Promise<[Movie[], number]> {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`, this.options);
            if (!response.ok) {
                throw new Error("TMDB request failed: " + response.status);
            }
            const data = await response.json();

            const movieResults = this.normalizeSearchResults(data.results || []);

            return [movieResults.map(mapJsonToMovie), data.total_pages];
        } catch (error) {
            console.error("Error fetching searched movies:", error);
            throw error;
        }
    }

}

export default ApiManager.getInstance();