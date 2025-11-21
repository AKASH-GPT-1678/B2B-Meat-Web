import axios from "axios";

export async function getLocationName(lat: number, lng: number) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_LOCATION_KEY as string;
  console.log(apiKey);
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
    const data = response.data;
    console.log(data);
    if (data.status === "OK") {
      const location = data.results[0].formatted_address;
      console.log("Location:", location);
      return location;
    } else {
      throw new Error("Geocoding failed: " + data.status);
    }
  } catch (error) {
    console.error("Error getting location:", error);
    return null;
  }
}

