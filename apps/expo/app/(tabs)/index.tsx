import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { supabase } from "@/utils/supabase";
import { Transaction } from "@/shared/database/types";
import { useEffect, useState } from "react";


export default function HomeScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const { data } = await supabase.from("transactions").select();
      setTransactions(data as Transaction[]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 5, paddingVertical: 0 }}
      >
        <VStack className="gap-6">
          <Box className="items-center mt-2">
            <Text className="text-text/70 text-sm">Total Balance</Text>
            <Heading className="text-primary text-4xl font-bold">
              $500,489
            </Heading>
          </Box>

          <HStack className="gap-4">
            <Card className="flex-1 items-center bg-secondary border border-white/5 rounded-2xl p-5">
              <Heading className="text-text text-xl">$24,589</Heading>
              <Text className="text-error text-xs mt-1">
                ▼ 13.39% this month
              </Text>
              <Text className="text-text/70 text-sm mt-1">Expense</Text>
            </Card>

            <Card className="flex-1 items-center bg-secondary border border-white/5 rounded-2xl p-5">
              <Heading className="text-text text-xl">$40,432</Heading>
              <Text className="text-success text-xs mt-1">
                ▲ 5.22% this month
              </Text>
              <Text className="text-text/70 text-sm mt-1">Income</Text>
            </Card>
          </HStack>

          <Card className="bg-secondary border border-white/5 rounded-2xl p-5">
            <Text className="text-primary text-sm mb-1">✨ AI Insight</Text>
            <Text className="text-text/80">idk some insight here</Text>
          </Card>

          <VStack className="gap-3">
            <Heading className="text-text text-lg mb-1">Transactions</Heading>

            {transactions.map((tx) => (
              <Card
                key={tx.id}
                className="bg-secondary border border-white/5 rounded-2xl p-4 flex-row justify-between items-center"
              >
                <HStack className="items-center gap-3">
                  <View
                    className={`w-10 h-10 rounded-full items-center justify-center`}
                  >
                    <IconSymbol
                      color="text-text/70"
                      name="fork.knife"
                      size={20}
                    />
                  </View>
                  <VStack>
                    <Text className="text-text font-semibold">{tx.title}</Text>
                    <Text className="text-text/50 text-xs">{tx.date}</Text>
                  </VStack>
                </HStack>

                <VStack className="items-end">
                  <Text
                    className={`font-semibold ${
                      tx.amount > 0 ? "text-success" : "text-error"
                    }`}
                  >
                    {tx.amount}
                  </Text>
                  <Text className="text-text/60 text-xs mt-1">Cash</Text>
                </VStack>
              </Card>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
