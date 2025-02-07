import React, { useEffect } from "react";
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
  ThemeProvider as NavThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, RootState } from "../store/store";
import { toggleTheme } from "../store/slices/themeSlice";
import { ScrollView, View, StyleSheet } from "react-native";
import {
  PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  IconButton,
} from "react-native-paper";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeHandler />
    </Provider>
  );
}

function ThemeHandler() {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.isDarkTheme
  );
  const paperTheme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;
  const navTheme = isDarkTheme ? NavDarkTheme : NavDefaultTheme;

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <NavThemeProvider value={navTheme}>
        <View style={styles.content}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </View>
      </NavThemeProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    flex: 1,
  },
});
