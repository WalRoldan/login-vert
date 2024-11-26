import React, { useState, useEffect } from "react";
import { View, Button, Text, ActivityIndicator } from "react-native";
import { useAuthRequest } from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";

// Información de Strava
const clientId = "141105";
const clientSecret = "2a85d5757947de93d6b3c5ddd93a18ea42ed9621"; // Reemplaza con tu client_secret de Strava
const redirectUri = "login-vert-smoky.vercel.app"; // Este URI debe coincidir con el que configuraste en app.json
const authorizationEndpoint = "https://www.strava.com/oauth/authorize";
const tokenEndpoint = "https://www.strava.com/oauth/token";

export default function AuthScreen() {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const discovery = {
    authorizationEndpoint: authorizationEndpoint,
    tokenEndpoint: tokenEndpoint,
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      redirectUri: redirectUri,
      scopes: ["activity:read", "activity:write"], // Los permisos necesarios para acceder a las actividades
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      // Intercambiar el código de autorización por un token de acceso
      fetch(tokenEndpoint, {
        method: "POST",
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAccessToken(data.access_token); // Guarda el token de acceso
          setIsLoading(false);
          navigation.navigate("ActivitiesTab"); // Redirige a la pantalla de actividades
        })
        .catch((err) => {
          console.error(err);
          setError("Error obteniendo el token");
          setIsLoading(false);
        });
    }
  }, [response]);

  const handleAuth = async () => {
    setIsLoading(true);
    await promptAsync(); // Inicia el flujo de autenticación de OAuth
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text>¡Bienvenido! Inicia sesión con Strava</Text>
          {error && <Text style={{ color: "red" }}>{error}</Text>}
          {!accessToken ? (
            <Button title="Iniciar sesión con Strava" onPress={handleAuth} />
          ) : (
            <Text>Acceso exitoso!</Text>
          )}
        </>
      )}
    </View>
  );
}
