import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Box className=" flex-1 justify-center items-center">
        <Text className="text-white">Second Page</Text>
      </Box>
    </SafeAreaView>
  );
}
