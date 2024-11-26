import { mockActivities } from "../components/mockActivities";

export const fetchActivities = (userToken) => {
  // Aquí puedes simular una condición, por ejemplo, si no hay token
  if (!userToken) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockActivities), 1000); // Simula un retraso de 1 segundo
    });
  }

  // Aquí iría tu llamada real a la API de Strava si tienes un token válido
  return fetch("https://api.strava.com/v3/athlete/activities", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error al obtener actividades:", error);
      return [];
    });
};
export const fetchAccessToken = async (code) => {
  const response = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: "141105",
      client_secret: "2a85d5757947de93d6b3c5ddd93a18ea42ed9621",
      code: code,
      grant_type: "authorization_code",
      redirect_uri: "login-vert-smoky.vercel.app",
    }),
  });

  const data = await response.json();
  return data.access_token; // O manejar el refresh_token
};

export const refreshAccessToken = async (refreshToken) => {
  const response = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: "141105",
      client_secret: "2a85d5757947de93d6b3c5ddd93a18ea42ed9621",
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const data = await response.json();
  return data.access_token; // O manejar el refresh_token
};
