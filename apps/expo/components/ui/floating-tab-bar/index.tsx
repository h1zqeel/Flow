import React, { useEffect, useRef } from "react";
import { Box } from "@/components/ui/box";
import { Animated, Easing } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabItem } from "./tab-item";

export function FloatingTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const capsuleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(capsuleAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();
  }, [capsuleAnim, state.index]);

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
