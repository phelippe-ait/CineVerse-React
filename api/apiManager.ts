import { Movie, mapJsonToMovie } from "../Models/APIModels";

class ApiManager {
    private static instance: ApiManager;
    private baseUrl: string;
    private options;
    private apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY || "";

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

}

export default ApiManager.getInstance();