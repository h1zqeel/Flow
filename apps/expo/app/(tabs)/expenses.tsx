import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
} from "@/components/ui/actionsheet";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ExpensesScreen() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Test",
      date: "Today, 10:45 AM",
      amount: "-$45.23",
      category: "Test",
    },
  ]);

  const [showSheet, setShowSheet] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const addExpense = () => {
    if (!newExpense.title || !newExpense.amount) return;
    setExpenses((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: newExpense.title,
        date:
          newExpense.date ||
          selectedDate?.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }) ||
          "Today",
        amount: `-$${parseFloat(newExpense.amount).toFixed(2)}`,
        category: newExpense.category || "Misc",
      },
    ]);
    setNewExpense({ title: "", amount: "", category: "", date: "" });
    setSelectedDate(null);
    setShowSheet(false);
  };

  const onDateChange = (_event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setNewExpense((prev) => ({
        ...prev,
        date: date.toLocaleDateString(),
      }));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
      >
        <VStack className="gap-6 mt-4">
          <HStack className="justify-between items-center">
          <Heading className="text-text text-3xl font-bold">Expenses</Heading>

          <Pressable
            onPress={() => setShowSheet(true)}
            className="bg-primary/90 active:bg-primary/80 rounded-2xl px-5 py-3 w-auto self-start shadow-soft-card"
          >
            <Text className="text-white font-semibold text-base">
              + Add Expense
            </Text>
            </Pressable>
          </HStack>

          {expenses.map((tx) => (
            <Box
              key={tx.id}
              className="bg-secondary/40 border border-secondary/20 rounded-2xl px-5 py-4 shadow-soft-card"
            >
              <HStack className="justify-between items-center">
                <VStack>
                  <Text className="text-text font-semibold text-base">
                    {tx.title}
                  </Text>
                  <Text className="text-text/60 text-xs mt-1">{tx.date}</Text>
                </VStack>
                <VStack className="items-end">
                  <Text className="text-error font-semibold text-base">
                    {tx.amount}
                  </Text>
                  <Text className="text-text/70 text-xs mt-1">
                    {tx.category}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </ScrollView>

      {/* Bottom Sheet */}
      <Actionsheet isOpen={showSheet} onClose={() => setShowSheet(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="p-6 bg-slate-600 rounded-t-2xl border-t border-secondary/20">
          <Heading className="text-text text-lg font-semibold mb-4">
            Add New Expense
          </Heading>

          <VStack className="gap-3">
            <Input className="bg-secondary/30 border-secondary/20">
              <InputField
                placeholder="Title"
                placeholderTextColor="rgba(var(--color-text),0.5)"
                value={newExpense.title}
                onChangeText={(v) =>
                  setNewExpense((prev) => ({ ...prev, title: v }))
                }
              />
            </Input>

            <Input className="bg-secondary/30 border-secondary/20">
              <InputField
                placeholder="Amount"
                placeholderTextColor="rgba(var(--color-text),0.5)"
                keyboardType="decimal-pad"
                value={newExpense.amount}
                onChangeText={(v) =>
                  setNewExpense((prev) => ({ ...prev, amount: v }))
                }
              />
            </Input>

            <Input className="bg-secondary/30 border-secondary/20">
              <InputField
                placeholder="Category"
                placeholderTextColor="rgba(var(--color-text),0.5)"
                value={newExpense.category}
                onChangeText={(v) =>
                  setNewExpense((prev) => ({ ...prev, category: v }))
                }
              />
            </Input>

            {/* Styled Date Picker trigger */}
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="bg-secondary/30 border border-secondary/20 rounded-xl px-4 py-3"
            >
              <Text className="text-text/80">
                {selectedDate
                  ? selectedDate.toLocaleDateString()
                  : "Select Date"}
              </Text>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display="spinner"
                onChange={onDateChange}
              />
            )}

            <Button className="bg-primary mt-3 rounded-xl" onPress={addExpense}>
              <Text className="text-white font-semibold text-base">
                Save Expense
              </Text>
            </Button>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </SafeAreaView>
  );
}
