import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import LottieView from "lottie-react-native";
import React, { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

type Idol = {
  name: string;
  story: string;
  deity: string;
  symbol: string;
};

export default function Scan() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [recognizedIdol, setRecognizedIdol] = useState<Idol | null>(null);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const idols: Idol[] = [
    {
      name: "Lord Ganesha",
      deity: "Remover of Obstacles",
      symbol: "🕉",
      story: "Lord Ganesha is the beloved elephant-headed deity who removes obstacles and brings wisdom. He is invoked at the beginning of any new venture.",
    },
    {
      name: "Goddess Lakshmi",
      deity: "Goddess of Wealth",
      symbol: "🪷",
      story: "Goddess Lakshmi embodies wealth, prosperity, and spiritual abundance. She bestows both material and spiritual riches upon her devotees.",
    },
    {
      name: "Lord Shiva",
      deity: "The Transformer",
      symbol: "🔱",
      story: "Lord Shiva is the supreme deity of transformation and meditation. As the cosmic dancer, he represents the eternal cycle of creation and destruction.",
    },
  ];

  const handleScan = () => {
    const random = idols[Math.floor(Math.random() * idols.length)];
    
    // Stop camera
    setCameraActive(false);
    
    // Show result
    setRecognizedIdol(random);
    setShowAnimation(true);
    
    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Start speech
    Speech.stop();
    Speech.speak(`${random.name}. ${random.story}`, {
      language: "en-US",
    });
    
    setTimeout(() => setShowAnimation(false), 3000);
  };

  const handleReset = () => {
    Speech.stop();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setRecognizedIdol(null);
      setCameraActive(true);
    });
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.centerContent}>
          <View style={styles.permissionCard}>
            <Text style={styles.permissionIcon}>📷</Text>
            <Text style={styles.permissionTitle}>Camera Access</Text>
            <Text style={styles.permissionDesc}>
              Allow camera to recognize sacred idols
            </Text>
            <TouchableOpacity onPress={requestPermission} style={styles.allowButton}>
              <Text style={styles.allowButtonText}>Allow</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Camera View */}
      <CameraView 
        style={styles.camera} 
        facing="back"
        active={cameraActive}
      />

      {/* Dark overlay when result is shown */}
      {recognizedIdol && (
        <View style={styles.darkOverlay} />
      )}

      {/* Lottie animation */}
      {showAnimation && (
        <LottieView
          source={require("../assets/animations/Aura.json")}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      )}

      {/* Close button */}
      <SafeAreaView style={styles.topBar} edges={['top']}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            Speech.stop();
            router.back();
          }}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Scan View */}
      {!recognizedIdol && (
        <View style={styles.scanView}>
          <View style={styles.scanContent}>
            <View style={styles.scanFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
            
            <Text style={styles.scanTitle}>Point at idol</Text>
            <Text style={styles.scanSubtitle}>Tap to discover the story</Text>
          </View>

          <TouchableOpacity 
            style={styles.scanButtonWrapper}
            onPress={handleScan}
            activeOpacity={0.9}
          >
            <View style={styles.scanButton}>
              <View style={styles.scanButtonInner} />
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Result Card */}
      {recognizedIdol && (
        <Animated.View 
          style={[
            styles.resultCard,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            }
          ]}
        >
          <View style={styles.symbolWrapper}>
            <Text style={styles.symbol}>{recognizedIdol.symbol}</Text>
          </View>

          <Text style={styles.idolName}>{recognizedIdol.name}</Text>
          <Text style={styles.deityLabel}>{recognizedIdol.deity}</Text>

          <View style={styles.divider} />

          <Text style={styles.storyText}>{recognizedIdol.story}</Text>

          <TouchableOpacity 
            style={styles.resetButton}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Text style={styles.resetButtonText}>Scan Again</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: 1,
  },
  lottieAnimation: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
  },
  permissionCard: {
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    maxWidth: 300,
  },
  permissionIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  permissionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  permissionDesc: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  allowButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  allowButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  scanView: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 120,
  },
  scanContent: {
    alignItems: 'center',
  },
  scanFrame: {
    width: 240,
    height: 240,
    marginBottom: 32,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#fff',
    borderWidth: 2,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 4,
  },
  scanSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '300',
  },
  scanButtonWrapper: {
    marginBottom: 40,
  },
  scanButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  scanButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
  },
  resultCard: {
    position: 'absolute',
    top: '50%',
    left: 24,
    right: 24,
    marginTop: -200,
    backgroundColor: 'rgba(20, 20, 20, 0.98)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    zIndex: 5,
  },
  symbolWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  symbol: {
    fontSize: 40,
  },
  idolName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  deityLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
  },
  storyText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
  },
  resetButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});