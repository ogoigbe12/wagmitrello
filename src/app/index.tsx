import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Colors } from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ModalType } from "../types/enums";
import * as WebBrowser from 'expo-web-browser';
import {useActionSheet} from '@expo/react-native-action-sheet'
import {BottomSheetModalProvider, BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet'
import AuthModel from "../components/AuthModel";

export default function Index() {
  const { top } = useSafeAreaInsets();
  const {showActionSheetWithOptions} = useActionSheet();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // const snapPoints: string[] = useMemo(() => ["1%", height], [height]);

  const snapPoints: string[] = useMemo(() => ['33%'], []);
  const [authType, setAuthType] = useState<ModalType | null>(null) 
  const showModal = async (type:ModalType) => {
    setAuthType(type);
    bottomSheetModalRef.current?.present();
    // console.log(bottomSheetModalRef)
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.2}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        onPress={() => bottomSheetModalRef.current?.close()}
      />
    ),
    []
  );

  const openLink = () => {
    WebBrowser.openBrowserAsync('https://www.atlassian.com/legal/privacy-policy');
  }
  const openActionSheet = async () => {
    const options = ['View support Docs', 'Contact us', 'cancel'];
    const cancelButtonIndex= 2

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: `Can't Log in or Sign up`
      },
      (selectedIndex: any) => {
        console.log(selectedIndex)
      }
    )
  }
  return (
    <BottomSheetModalProvider>
    <View style={[styles.container, { paddingTop: top + 30 }]}>
      <Image source={require('@/assets/images/login/trello.png')} style={styles.image}/>
      <Text style={styles.introText}>Move teamwork forward - even on the go</Text>
    <View style={styles.bottomContainer}>
    <TouchableOpacity style={[styles.btn, {backgroundColor: '#fff'}]} onPress={()=> showModal(ModalType.Login)}>
      <Text style={[styles.btnText, {color: Colors.primary}]}>Log in</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.btn]} onPress={() => showModal(ModalType.SignUp)}>
      <Text style={[styles.btnText, {color: '#fff'}]}>Sign Up</Text>
    </TouchableOpacity>
    <Text style={styles.description}>
      By signing up, you agree to the
       <Text style={styles.link} onPress={openLink}> {''} User Notice </Text>
       and {''}
       <Text style={styles.link} onPress={openLink}> {''} Privacy Policy</Text>.
    </Text>
    <Text style={styles.link} onPress={openActionSheet}>can't log in or sign up?</Text>
    </View>
    </View>
    <BottomSheetModal 
    ref={bottomSheetModalRef}
    index={0}
    backdropComponent={renderBackdrop}
    snapPoints={snapPoints}
    handleComponent={null}
    enableOverDrag={false}
    enablePanDownToClose
    >
      <AuthModel authType={authType}/>
    </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  image: {
    height: 450,
    paddingHorizontal: 40,
    resizeMode: 'center'
  },
  introText: {
    fontWeight: '600',
    color: 'white',
    fontSize: 17,
    padding: 30,
  },
  bottomContainer: {
    gap:10,
    width: '100%',
    paddingHorizontal: 40,
  },
  btn: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1
  },
  btnText: {
    fontSize: 18
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    marginHorizontal: 60,
  },
  link: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
});
