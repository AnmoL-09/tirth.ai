import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LandingScreen() {
  const router = useRouter();


  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ImageBackground
        source={require("../assets/images/homeBackground3.png")}
        style={styles.background}
        blurRadius={1}
        resizeMode="cover"
      >
        {/* Text and Button Container */}
        <View className="flex-1 justify-end py-20 items-center px-5 gap-[60px]">
          <Text className="text-yellow-500 text-center text-[40px] leading-[49px] px-4" style={{ fontFamily: 'Anton-Regular' }}>
            Tirth.AI {"\n"} 
            <Text className="text-[#b28332] text-[25px]" style={{ fontFamily: 'Cardo-Italic' }}>Stories Etched in Stone.</Text>
          </Text>
          <LottieView
            source={require("../assets/animations/AI-Animation.json")}
            autoPlay
            loop
            style={styles.lottieAnimation}
          />

          <TouchableOpacity 
            className="bg-yellow-200 py-[15px] px-[20px] rounded-[30px] mb-8" 
            onPress={() => router.push("/divinity")}
          >
            <Text className="text-[#222] text-[15px] leading-tight" style={{ fontFamily: 'Anton-Regular' }}>Dive into the past</Text>
          </TouchableOpacity>
        </View>

        {/* Temple Image at Footer */}
        <View style={styles.footerImageContainer}>
          <Image 
            source={require("../assets/images/vectorTemple.png")}
            style={styles.footerImage}
            resizeMode="cover"
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  footerImageContainer: {
    width: '100%',
    height: 250,
    overflow: 'hidden',
  },
  footerImage: {
    width: '100%',
    height: '100%',
  },
  lottieAnimation: {
    width: 300,
    height: 110,
  },
});
