import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
import React from "react";

export default function TabLayout() {
  return (
    <NativeTabs minimizeBehavior="automatic">
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="expenses">
        <Label>Expenses</Label>
        <Icon sf="dollarsign" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
