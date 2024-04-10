import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { axios } from "axios";

import { useState } from "react";

import CustomInput from "../components/CustomInput";

export default function SignInScreen({ setToken, navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    /*     console.log("test"); */
    setErrorMessage("");
    if (username && password) {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          {
            username: username,
            password: password,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
      }
    } else {
      setErrorMessage("Mot de passe ou identifiant incorrect");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", gap: 20 }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logoPic1}
      />

      <Text style={styles.title}>Sign In </Text>
      <CustomInput name="username" state={username} setState={setUsername} />
      <CustomInput
        name="password"
        state={password}
        setState={setPassword}
        password
      />

      {errorMessage ? <Text>{errorMessage}</Text> : null}

      <Pressable
        onPress={() => {
          handleSubmit();
        }}
        style={styles.button}
      >
        <Text style={{ fontSize: 20 }}>Sign In</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("SignUp")}>
        <Text>No account ? Register</Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 30,
  },
  logoPic1: {
    height: 120,
    width: 120,
  },
  title: {
    fontSize: 30,
    color: "grey",
    fontWeight: "600",
  },
  button: {
    borderColor: "skyblue",
    borderWidth: 3,
    width: "50%",
    height: 75,
    borderRadius: 30,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
