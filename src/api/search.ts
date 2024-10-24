import { Place } from "./Place";

interface SearchResponse {
  features: {
    geometry: {
      coordinates: number[];
    };
    properties: {
      place_id: number;
      display_name: string;
    };
  }[];
}

export const search = async (term: string) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`
  );

  const data: SearchResponse = await res.json();

  const formatPlacesData: Place[] = data.features.map((feature) => {
    const { place_id: placeId, display_name: displayName } = feature.properties;
    const { coordinates } = feature.geometry;

    return {
      id: placeId,
      name: displayName,
      longitude: coordinates[0],
      latitude: coordinates[1],
    };
  });

  return formatPlacesData;
};
