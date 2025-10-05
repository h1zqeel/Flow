import { Tabs } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Box } from "@/components/ui/box";
import { Pressable, Animated, Easing } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/icon-symbol";

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

function TabItem({ route, isFocused, navigation }: any) {
  const scaleAnim = useRef(new Animated.Value(isFocused ? 1.15 : 1)).current;
  const bgAnim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isFocused ? 1.15 : 1,
        friction: 6,
        useNativeDriver: false, // ✅ both false
      }),
      Animated.timing(bgAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 220,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false, // ✅ both false
      }),
    ]).start();
  }, [isFocused]);

  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(24,24,27,0.7)", "rgba(59,130,246,0.15)"],
  });

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const iconColor = isFocused
    ? "rgb(var(--color-primary-400))"
    : "rgb(var(--color-primary-100))";

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          backgroundColor: bgColor,
          width: 56,
          height: 56,
          borderRadius: 9999,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconSymbol
          name={
            route.name === "index"
              ? isFocused
                ? "house.fill"
                : "house"
              : isFocused
              ? "paperplane.fill"
              : "paperplane"
          }
          color={iconColor}
          size={isFocused ? 28 : 26}
        />
      </Animated.View>
    </Pressable>
  );
}

function FloatingTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const capsuleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(capsuleAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false, // ✅ stays JS-driven
    }).start();
  }, [state.index]);

  const capsuleBg = capsuleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(15,15,15,0.6)", "rgba(15,15,15,0.9)"],
  });

  return (
    <Box
      className="absolute w-full items-center"
      style={{ bottom: Math.max(insets.bottom, 24) }}
    >
      <Animated.View
        style={{
          backgroundColor: capsuleBg,
          borderRadius: 9999,
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.08)",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        {state.routes.map((route: any, index: number) => (
          <TabItem
            key={route.key}
            route={route}
            isFocused={state.index === index}
            navigation={navigation}
          />
        ))}
      </Animated.View>
    </Box>
  );
}
