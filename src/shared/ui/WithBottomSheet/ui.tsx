import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet"
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import { useFocusEffect } from "@react-navigation/native"
import React, { useCallback } from "react"
import { BackHandler } from "react-native"

interface IProps {
  index?: number
  snapPoints: number[] | string[]
  bottomSheetRef: React.RefObject<BottomSheet | null>
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

  const handlePressBack = useCallback(() => {
    bottomSheetRef.current?.close()

    return true
  }, [bottomSheetRef])

  const onClose = () => {
    bottomSheetRef.current?.close()
    handleCloseSheet()
  }

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
      backdropComponent={CustomBackdrop}
      onClose={onClose}
      //   handleComponent={null}
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
