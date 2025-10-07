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
import { useRouter } from "expo-router";

export default function ExpensesScreen() {
  const router = useRouter();
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
            <Pressable
              key={tx.id}
              onPress={() => router.push(`/expense/${tx.id}`)}
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
            </Pressable>
          ))}
        </VStack>
      </ScrollView>

      {/* Bottom Sheet */}
      <Actionsheet isOpen={showSheet} onClose={() => setShowSheet(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="bg-secondary rounded-t-3xl border-t border-secondary/20 p-6">
          <VStack className="gap-5 w-full">
            {/* Header */}
            <Heading className="text-text text-xl font-semibold text-center mb-1">
              Add New Expense
            </Heading>

            {/* Title */}
            <VStack className="gap-2">
              <Text className="text-text/70 text-sm ml-1">Title</Text>
              <Input className="bg-background/60 border border-secondary/30 rounded-xl">
                <InputField
                  className="text-text"
                  placeholder="Title"
                  value={newExpense.title}
                  onChangeText={(v) =>
                    setNewExpense((prev) => ({ ...prev, title: v }))
                  }
                />
              </Input>
            </VStack>

            {/* Amount */}
            <VStack className="gap-2">
              <Text className="text-text/70 text-sm ml-1">Amount</Text>
              <Input className="bg-background/60 border border-secondary/30 rounded-xl">
                <InputField
                  className="text-text"
                  placeholder="Amount"
                  keyboardType="decimal-pad"
                  value={newExpense.amount}
                  onChangeText={(v) =>
                    setNewExpense((prev) => ({ ...prev, amount: v }))
                  }
                />
              </Input>
            </VStack>

            {/* Category */}
            <VStack className="gap-2">
              <Text className="text-text/70 text-sm ml-1">Category</Text>
              <Input className="bg-background/60 border border-secondary/30 rounded-xl">
                <InputField
                  className="text-text"
                  placeholder="Category"
                  value={newExpense.category}
                  onChangeText={(v) =>
                    setNewExpense((prev) => ({ ...prev, category: v }))
                  }
                />
              </Input>
            </VStack>

            {/* Date Picker Trigger */}
            <VStack className="gap-2">
              <Text className="text-text/70 text-sm ml-1">Date</Text>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                className="bg-background/60 border border-secondary/30 rounded-xl px-4 py-3"
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
            </VStack>

            {/* Save Button */}
            <Button
              className="bg-primary mt-3 rounded-xl shadow-soft-card"
              onPress={addExpense}
            >
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
