import React from "react"
import { Platform, StatusBar, useColorScheme } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import styled from "styled-components/native"

interface IProps {
  children?: React.ReactNode
  color?: string
}

export const WithSafeArea: React.FC<IProps> = ({ children, color }) => {
  const theme = useColorScheme()
  const currentBarStyle = theme === "dark" ? "light-content" : "dark-content"
  const backgroundColor = color ? color : "white"

  const { top } = useSafeAreaInsets()

  const handleRenderSafeArea = () => {
    if (Platform.OS === "android") {
      return (
        <SafeAreaAndroid>
          <StatusBar />
          {children}
        </SafeAreaAndroid>
      )
    }

    return (
      <SafeAreaIOS backgroundColor={backgroundColor}>
        <SafeAreaBlock inset={top} backgroundColor={backgroundColor} />
        <StatusBar
          backgroundColor={backgroundColor}
          translucent
          barStyle={currentBarStyle}
        />
        {children}
      </SafeAreaIOS>
    )
  }

  return <>{handleRenderSafeArea()}</>
}

const SafeAreaAndroid = styled.SafeAreaView``

const SafeAreaIOS = styled.View<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
`

const SafeAreaBlock = styled.View<{ backgroundColor?: string; inset: number }>`
  height: ${({ inset }) => inset}px;
  background-color: ${({ backgroundColor }) => backgroundColor ?? "white"};
`
