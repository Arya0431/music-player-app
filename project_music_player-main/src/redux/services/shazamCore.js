import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// define allowed genres
const VALID_GENRES = [
  "POP_WORLD",
  "HIP_HOP_RAP_WORLD",
  "DANCE_WORLD",
  "ROCK_WORLD",
  "LATIN_WORLD",
  "AFRO_BEATS_WORLD",
  "COUNTRY_WORLD",
  "ELECTRONIC_WORLD",
  "RNB_SOUL_WORLD",
];

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "v1/charts/world?limit=20",
    }),

    getSongsByGenre: builder.query({
      query: (genre = "POP_WORLD") => {
        const safeGenre = VALID_GENRES.includes(genre) ? genre : "POP_WORLD";
        return `v1/charts/genre-world?genre_code=${safeGenre}`;
      },
    }),

    getSongsByCountry: builder.query({
      query: (countryCode) => `v1/charts/country?country_code=${countryCode}`,
    }),

    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),

    getArtistDetails: builder.query({
      query: (artistId) => `v2/artists/details?artist_id=${artistId}`,
    }),

    getSongDetails: builder.query({
      query: ({ songid }) => `v1/tracks/details?track_id=${songid}`,
    }),

    getSongRelated: builder.query({
      query: ({ songid }) => `v1/tracks/related?track_id=${songid}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;
