import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, Image, Dimensions, Text, TextStyle, Easing } from "react-native";

interface SplashScreenProps {
    onFinish: () => void;
}

const { width, height } = Dimensions.get('window');

const frames = [
    require("../../assets/images/AnimationEllipse.png"),
    require("../../assets/images/Animationlogo.png"),
    require("../../assets/images/Animationlogo.png"),
    require("../../assets/images/Animationlogo.png"),
    require("../../assets/images/Animationlogo.png"),
];

const frameDimensions = [
    { width: 199, height: 61 },
    { width: 72, height: 83 },
    { width: 57, height: 66 },
    { width: 57, height: 66 },
    { width: 57, height: 66 },
];
const FINAL_LOGO_WIDTH = frameDimensions[4].width;
const TARGET_TEXT = "SAFEDRIVE";
const TEXT_ANIMATION_DURATION = 600;
const STEP_INTERVAL_MS = 1000;
const DEFAULT_ANIM_DURATION = 600;
const BOUNCE_DURATION = 1100;
const TEXT_WIDTH_ESTIMATE = 9 * 28;
const FINAL_COMBINED_WIDTH = FINAL_LOGO_WIDTH + 10 + TEXT_WIDTH_ESTIMATE;
const FINAL_TRANSLATE_X = -(FINAL_COMBINED_WIDTH / 2) + (width / 2);

const frameStyles = [
    { scale: 1, translateX: 0, translateY: 0 },
    { scale: 1, translateX: 0, translateY: 0 },
    { scale: 1, translateX: 0, translateY: 0 },
    { scale: 1, translateX: (FINAL_TRANSLATE_X - (width / 2) + (frameDimensions[3].width / 2)), translateY: 0 },
    { scale: 1, translateX: (FINAL_TRANSLATE_X - (width / 2) + (FINAL_LOGO_WIDTH / 2)), translateY: 0 },
];

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [typedText, setTypedText] = useState("");
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const animatedScale = useRef(new Animated.Value(frameStyles[0].scale)).current;
    const animatedTranslateX = useRef(new Animated.Value(frameStyles[0].translateX)).current;
    const animatedTranslateY = useRef(new Animated.Value(frameStyles[0].translateY)).current;
    const bounceShrinkAnim = useRef(new Animated.Value(1)).current;
    const animateFrame = (frameIndex: number) => {
        const nextStyle = frameStyles[frameIndex];
        if (frameIndex === 1) {
            animatedTranslateY.setValue(-height * 0.6);
            bounceShrinkAnim.setValue(1);
            const bounceAnim = Animated.timing(animatedTranslateY, {
                toValue: 0,
                duration: BOUNCE_DURATION,
                easing: Easing.bounce,
                useNativeDriver: true,
            });
            const shrinkAnim = Animated.timing(bounceShrinkAnim, {
                toValue: 57 / 72,
                duration: BOUNCE_DURATION,
                easing: Easing.linear,
                useNativeDriver: true,
            });
            Animated.parallel([bounceAnim, shrinkAnim]).start();
            return;
        }
        bounceShrinkAnim.setValue(1);
        Animated.parallel([
            Animated.timing(animatedScale, {
                toValue: nextStyle.scale,
                duration: DEFAULT_ANIM_DURATION,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(animatedTranslateX, {
                toValue: nextStyle.translateX,
                duration: DEFAULT_ANIM_DURATION,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(animatedTranslateY, {
                toValue: nextStyle.translateY,
                duration: DEFAULT_ANIM_DURATION,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();
    };

    const startTypewriterEffect = () => {
        let currentText = "";
        let index = 0;
        const interval = setInterval(() => {
            if (index < TARGET_TEXT.length) {
                currentText += TARGET_TEXT[index];
                setTypedText(currentText);
                index++;
            } else {
                clearInterval(interval);
            }
        }, TEXT_ANIMATION_DURATION / TARGET_TEXT.length);
    };


    useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
        const interval = setInterval(() => {
            setCurrentFrame((prev) => {
                const nextFrame = prev + 1;
                if (nextFrame === frames.length) {
                    clearInterval(interval);
                    setTimeout(onFinish, 1000);
                    return prev;
                }
                animateFrame(nextFrame);
                if (nextFrame === 4) {
                    startTypewriterEffect();
                }
                return nextFrame;
            });
        }, STEP_INTERVAL_MS);
        return () => clearInterval(interval);
    }, []);

    const animatedStyle = {
        opacity: fadeAnim,
        transform: [
            { translateX: animatedTranslateX },
            { translateY: animatedTranslateY },
            { scale: Animated.multiply(animatedScale, bounceShrinkAnim) },
        ],
        position: 'absolute' as const
    };

    const currentDimensions = frameDimensions[currentFrame];
    const textStyle: TextStyle = {
        marginLeft: 35,
        color: 'white',
        fontSize: 47,
        fontWeight: 'bold',
    };

    const finalFrameTranslateX = (currentFrame === 4 ? frameStyles[4].translateX : 0);
    const textContainerStyle = [
        styles.textContainer,
        {
            transform: [{ translateX: finalFrameTranslateX }],
            left: width / 2,
        }
    ];

    return (
        <View style={styles.container}>
            <Animated.Image
                source={frames[currentFrame]}
                style={[
                    styles.imageBase,
                    { width: currentDimensions.width, height: currentDimensions.height },
                    animatedStyle
                ]}
                resizeMode="contain"
            />
            {currentFrame === 4 && (
                <View style={textContainerStyle}>
                    <Text style={textStyle}>
                        {typedText}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E2141E",
        justifyContent: "center",
        alignItems: "center",
    },
    imageBase: {
    },
    textContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});

export default SplashScreen;