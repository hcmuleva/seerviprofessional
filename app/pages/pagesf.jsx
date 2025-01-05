import { View } from "react-native";
import MemberCard from "../Screen/membercard";


export default function Page() {
  return (
    <View ViewclassName="min-h-screen bg-gray-100 p-8">
      <MemberCard 
        name="श्रीमान तरुण जी काग"
        title="Sports Minister"
        location="Sunkadakatte, Bangalore"
        imageUrl="/placeholder.svg?height=200&width=200"
        message="सीरवी समाज ट्रस्ट सुनकदकट्टे बेंगलौर पश्चिम के खेल मंत्री बनने पर श्रीमान तरुण जी काग को सीरवी खेल और सांस्कृतिक क्लब की ओर से हार्दिक बधाई एवं शुभकामनाएं।"
        clubName="Seervi Sports & Cultural Club"
      />
    </View>
  );
}
