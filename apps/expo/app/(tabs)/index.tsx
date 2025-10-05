import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	return (
		<SafeAreaView className="bg-background-0 h-full">
			<Box className="m-4 gap-2">
				<Box className="items-center justify-center flex h-20 gap-2">
					<Text className="text-primary-0 text-sm">
						Total Balance
					</Text>
					<Heading className="text-primary-0 text-3xl font-bold">
						$12,345
					</Heading>
				</Box>
				<Box>
					<VStack className="w-full gap-3">
						<HStack className="w-full gap-3">
							<Card size="lg" variant="filled" className="flex-1">
								<Box className="items-center gap-1">
									<Heading>$24</Heading>
									<Text className="text-sm text-primary-300">
										Expense
									</Text>
								</Box>
							</Card>
							<Card size="lg" variant="filled" className="flex-1">
								<Box className="items-center gap-1">
									<Heading>$12,345</Heading>
									<Text className="text-sm text-primary-300">
										Income
									</Text>
								</Box>
							</Card>
						</HStack>

						<Card size="lg" variant="filled" className="w-full">
							<Box className="items-center gap-1">
								<Heading>Insight</Heading>
								<Text className="text-sm text-primary-300">
									Good shit
								</Text>
							</Box>
						</Card>
					</VStack>
				</Box>
			</Box>
		</SafeAreaView>
	);
}
