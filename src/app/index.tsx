import { Text, View, ScrollView } from "react-native";
import { Header } from "../Header/Header";

export default function Index() {
  return (
    <ScrollView style={{ flex: 1 }} className="" showsVerticalScrollIndicator={false}>
      <Header/>

    </ScrollView>
  );
}
