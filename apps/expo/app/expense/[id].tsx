import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
} from "@/components/ui/actionsheet";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Switch } from "@/components/ui/switch";

export default function ExpenseDetail() {
  const { id } = useLocalSearchParams();

  // Simulated expense data
  const expense = {
    id,
    title: "Test",
    amount: "-$45.23",
    category: "Test",
    date: "Today, 10:45 AM",
    notes: "Test Note",
  };

  const [showSheet, setShowSheet] = useState(false);

  // Stored trigger
  const [trigger, setTrigger] = useState<{
    title: string;
    hasAmountTrigger: boolean;
    mode: "exact" | "range";
    exact?: string;
    min?: string;
    max?: string;
  }>({
    title: expense.title,
    hasAmountTrigger: false,
    mode: "exact",
    exact: "",
    min: "",
    max: "",
  });

  const [draft, setDraft] = useState(trigger);

  const saveTrigger = () => {
    setTrigger(draft);
    setShowSheet(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        <VStack className="gap-6">
          {/* Expense Summary */}
          <Box className="bg-secondary/30 rounded-2xl p-5">
            <Heading className="text-text text-2xl font-bold mb-2">
              {expense.title}
            </Heading>
            <Text className="text-error text-lg font-semibold">
              {expense.amount}
            </Text>
            <Text className="text-text/70 text-sm mt-1">
              {expense.category}
            </Text>
            <Text className="text-text/70 text-sm mt-1">{expense.date}</Text>
          </Box>

          {/* Notes */}
          <Box className="bg-secondary/20 rounded-2xl p-5">
            <Heading className="text-text text-lg mb-2">Notes</Heading>
            <Text className="text-text/70 text-sm">
              {expense.notes || "No notes available"}
            </Text>
          </Box>

          {/* Trigger Info */}
          {trigger.hasAmountTrigger && (
            <Box className="bg-secondary/20 rounded-2xl p-5">
              <Heading className="text-text text-lg mb-2">Triggers</Heading>
              <Text className="text-text/80 text-sm mb-1">
                <Text className="font-semibold text-text">Title:</Text>{" "}
                {trigger.title}
              </Text>
              {trigger.mode === "exact" ? (
                <Text className="text-text/80 text-sm">
                  <Text className="font-semibold text-text">Amount:</Text> $
                  {trigger.exact}
                </Text>
              ) : (
                <Text className="text-text/80 text-sm">
                  <Text className="font-semibold text-text">
                    Amount Between:
                  </Text>{" "}
                  ${trigger.min} – ${trigger.max}
                </Text>
              )}
            </Box>
          )}

          <Button
            className="bg-primary mt-4 rounded-xl"
            onPress={() => {
              setDraft(trigger);
              setShowSheet(true);
            }}
          >
            <Text className="text-white font-semibold text-base">
              Set Triggers
            </Text>
          </Button>
        </VStack>
      </ScrollView>

      {/* --- Action Sheet --- */}
      <Actionsheet isOpen={showSheet} onClose={() => setShowSheet(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="bg-secondary rounded-t-3xl border-t border-secondary/20 p-6">
          <VStack className="gap-5 w-full">
            {/* Header */}
            <Heading className="text-text text-xl font-semibold text-center mb-1">
              Set Triggers
            </Heading>

            {/* Transaction Title */}
            <VStack className="gap-2">
              <Text className="text-text/70 text-sm ml-1">
                Transaction Title
              </Text>
              <Input className="bg-background/60 border border-secondary/30 rounded-xl ">
                <InputField
                  placeholder="Title"
                  className="text-text"
                  value={draft.title}
                  onChangeText={(v) => setDraft((p) => ({ ...p, title: v }))}
                />
              </Input>
            </VStack>

            {/* Amount Trigger Toggle */}
            <HStack className="justify-between items-center bg-background/50 rounded-xl px-4 py-3 border border-secondary/20">
              <Text className="text-text/80 font-medium">
                Enable Amount Trigger
              </Text>
              <Switch
                value={draft.hasAmountTrigger}
                onValueChange={(v) =>
                  setDraft((p) => ({ ...p, hasAmountTrigger: v }))
                }
              />
            </HStack>

            {/* Trigger Type + Inputs */}
            {draft.hasAmountTrigger && (
              <VStack className="gap-4 mt-2">
                <Text className="text-text/70 text-sm ml-1">Trigger Type</Text>

                {/* Mode Selector */}
                <HStack className="w-full bg-background/40 border border-secondary/20 rounded-xl overflow-hidden">
                  <Pressable
                    onPress={() => setDraft((p) => ({ ...p, mode: "exact" }))}
                    className={`flex-1 py-3 ${
                      draft.mode === "exact" ? "bg-primary/20" : ""
                    }`}
                  >
                    <Text
                      className={`text-center ${
                        draft.mode === "exact"
                          ? "text-primary font-semibold"
                          : "text-text/60"
                      }`}
                    >
                      Exact Amount
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setDraft((p) => ({ ...p, mode: "range" }))}
                    className={`flex-1 py-3 ${
                      draft.mode === "range" ? "bg-primary/20" : ""
                    }`}
                  >
                    <Text
                      className={`text-center ${
                        draft.mode === "range"
                          ? "text-primary font-semibold"
                          : "text-text/60"
                      }`}
                    >
                      Between
                    </Text>
                  </Pressable>
                </HStack>

                {draft.mode === "exact" ? (
                  <Input className="bg-background/60 border border-secondary/30 rounded-xl">
                    <InputField
                      placeholder="Enter amount"
                      className="text-text"
                      keyboardType="decimal-pad"
                      value={draft.exact}
                      onChangeText={(v) =>
                        setDraft((p) => ({ ...p, exact: v }))
                      }
                    />
                  </Input>
                ) : (
                  <HStack className="gap-3">
                    <Input className="flex-1 bg-background/60 border border-secondary/30 rounded-xl">
                      <InputField
                        placeholder="Min"
                        className="text-text"
                        keyboardType="decimal-pad"
                        value={draft.min}
                        onChangeText={(v) =>
                          setDraft((p) => ({ ...p, min: v }))
                        }
                      />
                    </Input>
                    <Input className="flex-1 bg-background/60 border border-secondary/30 rounded-xl">
                      <InputField
                        placeholder="Max"
                        className="text-text"
                        keyboardType="decimal-pad"
                        value={draft.max}
                        onChangeText={(v) =>
                          setDraft((p) => ({ ...p, max: v }))
                        }
                      />
                    </Input>
                  </HStack>
                )}
              </VStack>
            )}

            {/* Save Button */}
            <Button
              className="bg-primary mt-3 rounded-xl shadow-soft-card"
              onPress={saveTrigger}
            >
              <Text className="text-white font-semibold text-base">Save</Text>
            </Button>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </SafeAreaView>
  );
}
