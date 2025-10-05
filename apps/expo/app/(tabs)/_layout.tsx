import { Tabs } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Pressable, Animated, Easing } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FloatingTabBar } from "@/components/ui/floating-tab-bar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
    </Tabs>
  );
}
