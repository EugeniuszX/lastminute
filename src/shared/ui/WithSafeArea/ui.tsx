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
      <SafeAreaIOS backgroundColor={color}>
        <SafeAreaBlock inset={top} backgroundColor={color} />
        <StatusBar
          backgroundColor={color}
          translucent
          barStyle={currentBarStyle}
        />
        {children}
      </SafeAreaIOS>
    )
  }

  return <>{handleRenderSafeArea()}</>
}

const SafeAreaAndroid = styled.SafeAreaView`
  flex: 1;
`

const SafeAreaIOS = styled.View<{ backgroundColor?: string }>`
  flex: 1;
  background-color: ${(props) =>
    props.backgroundColor ?? props.theme.background};
`

const SafeAreaBlock = styled.View<{ backgroundColor?: string; inset: number }>`
  height: ${({ inset }) => inset}px;
  background-color: ${(props) =>
    props.backgroundColor ?? props.theme.background};
`
