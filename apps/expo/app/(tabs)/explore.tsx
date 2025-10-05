import { Box } from "@/components/ui/box";
import { Text } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Box className=" flex-1 justify-center items-center">
        <Text>Second Page</Text>
      </Box>
    </SafeAreaView>
  );
}
