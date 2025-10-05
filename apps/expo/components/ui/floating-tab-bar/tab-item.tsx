import React, { useEffect, useRef } from "react";
import { Pressable, Animated, Easing } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";

export function TabItem({ route, isFocused, navigation }: any) {
  const scaleAnim = useRef(new Animated.Value(isFocused ? 1.15 : 1)).current;
  const bgAnim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isFocused ? 1.15 : 1,
        friction: 6,
        useNativeDriver: false,
      }),
      Animated.timing(bgAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 220,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();
  }, [bgAnim, isFocused, scaleAnim]);

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
