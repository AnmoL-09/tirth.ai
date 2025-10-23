import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

export default function Home() {
  const router = useRouter();

  const handleExplorePress = () => {
    router.push('/Scan');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Tirth.AI</Text>
          <Text style={styles.subtitle}>Discover the divine stories</Text>
        </View>

        {/* Animation */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require("../assets/animations/roadmap.json")}
            autoPlay
            loop
            style={styles.roadmapAnimation}
          />
        </View>

        {/* Instructions */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Point your camera at an idol to discover its story and significance
          </Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={handleExplorePress}
          activeOpacity={0.9}
        >
          <View style={styles.buttonContent}>
            <View style={styles.cameraIcon}>
              <View style={styles.cameraLens} />
            </View>
            <Text style={styles.buttonText}>Let's Explore</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Anton-Regular',
    color: '#eab308',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 17,
    color: '#b28332',
    marginBottom: 24,
    fontFamily: 'Anton-Regular',
  },
  animationContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  lottieAnimation: {
    width: 300,
    height: 300,
    marginBottom: 20, // Add some space below the animation
  },
  instructionContainer: {
    marginTop: 10,
    marginBottom: 40,
    padding: 22,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#fcd34d',
    borderTopWidth: 4,
    borderTopColor: '#fcd34d',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  instructionText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Anton-Regular',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 10,
    letterSpacing: 0.3,
  },
  cameraIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDEBA3',
  },
  cameraLens: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  roadmapAnimation: {
    width: 300,
    height: 300,
  },
  primaryButton: {
    backgroundColor: '#FDEBA3',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    alignSelf: 'center',
    minWidth: 0,
    width: 'auto',
    alignItems: 'center',
    marginBottom: 60,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    transform: [{ scale: 1 }],
  },
  
});
