import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet"
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import { useFocusEffect } from "@react-navigation/native"
import React, { useCallback, useEffect } from "react"
import { BackHandler } from "react-native"
import { useSharedValue, withTiming } from "react-native-reanimated"

interface IProps {
  index?: number
  snapPoints: number[] | string[]
  bottomSheetRef: React.RefObject<BottomSheet>
  handleCloseSheet: () => void
  animateOnMount?: boolean
  children: React.ReactNode
  customHandleComponent?: () => React.ReactElement
  topInset?: number
}

export const WithBottomSheet: React.FC<IProps> = (props) => {
  const {
    children,
    animateOnMount = true,
    snapPoints,
    handleCloseSheet,
    index,
    bottomSheetRef,
    topInset,
  } = props

  const isOpenShared = useSharedValue(0)

  const handleForceCloseSheet = () => {
    isOpenShared.value = withTiming(0, { duration: 100 })
    bottomSheetRef.current?.close()
  }

  const handlePressBack = useCallback(() => {
    bottomSheetRef.current?.close()

    return true
  }, [bottomSheetRef])

  const onClose = () => {
    handleForceCloseSheet()
    handleCloseSheet()
  }

  useEffect(() => {
    isOpenShared.value = withTiming(1, { duration: 200 })
  }, [isOpenShared])

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        handlePressBack,
      )

      return () => subscription.remove()
    }, [handlePressBack]),
  )

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index ?? 0}
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
      backdropComponent={CustomBackdrop}
      onClose={onClose}
      handleComponent={null}
      snapPoints={snapPoints}
      animateOnMount={animateOnMount}
      backgroundStyle={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      topInset={topInset ?? 0}
    >
      {children}
    </BottomSheet>
  )
}

const CustomBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
)
