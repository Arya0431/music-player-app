// iTunes Search API service
export const searchSongs = async (term) => {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      term
    )}&entity=song&limit=20`
  );
  if (!response.ok) throw new Error("Failed to fetch from iTunes API");
  const data = await response.json();
  return data.results;
};
