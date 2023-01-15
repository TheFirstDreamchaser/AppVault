// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { SimpleLineIcons, Entypo } from "@expo/vector-icons";
import * as IntentLauncher from "expo-intent-launcher";
import * as LocalAuthentication from 'expo-local-authentication';

export default function HomeScreen({ navigation }) {
  const [searchItems, setsearchItems] = useState({});
  const Directory = FileSystem.documentDirectory;

  useEffect(() => {
    getContent();
  }, [searchItems]);
  const getContent = async () => {
    let content = await FileSystem.readDirectoryAsync(Directory);
    setsearchItems(content);
  };
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      const uri = result.uri;
      let fileUri = Directory + result.name;
      FileSystem.copyAsync({
        from: uri,
        to: fileUri,
      });
    }
  };
  const removeItem = async (key: string) => {
    let path: string = Directory + key;
    await FileSystem.deleteAsync(path);
  };
  const previewImage = async (key: string) => {
    const auth = await LocalAuthentication.authenticateAsync();
    if (auth.success) {
      let filePath: string = Directory + key;
      let file: any = await FileSystem.getInfoAsync(filePath);
      console.log(file.uri);
      FileSystem.getContentUriAsync(file.uri).then((uri) => {
        IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: uri,
          flags: 1,
        });
      });
    }
  };
  const renderItems = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          paddingTop: 5,
          marginTop: 15,
          borderWidth: 0.5,
          borderColor: "#ecf3ec",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => previewImage(item)}>
            <Image
              source={require("./icons/fileSearch.png")}
              style={styles.icon}
            />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              height: 90,
              alignItems: "center",
              paddingTop: 25,
            }}
          >
            <Text style={styles.flatListItem}>{item}</Text>
          </View>
          <View style={{ alignSelf: "center", margin: 15, }}>
            <TouchableOpacity onPress={() => removeItem(item)}>
              <SimpleLineIcons name="trash" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#15191b",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>AppVault</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Calculator");
          }}
        >
          <Image source={require("./icons/arrow.png")} style={styles.icon} />
        </Pressable>
        <Pressable onPress={pickDocument}>
          <Image source={require("./icons/file.png")} style={styles.icon} />
        </Pressable>
      </View>
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={searchItems}
          renderItem={renderItems}
          keyExtractor={(item) => item}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingTop: 10,
  },
  icon: {
    width: 40,
    height: 40,
    margin: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 30,
    flex: 1,
    color: "white",
    left: 5,
  },
  flatListItem: {
    color: "white",
    padding: 5,
    fontSize: 14,
  },
});
