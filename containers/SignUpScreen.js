import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";

import { useState } from "react";
import CustomInput from "../components/CustomInput";

export default function SignUpScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [desc, setDesc] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    console.log("test");
    setErrorMessage("");
    if (email && username && desc && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            {
              email: email,
              username: username,
              description: desc,
              password: password,
            }
          );
          console.log(response.data);
        } catch (error) {
          console.log(error.response.data.error);
          setErrorMessage(error.response.data.error);
        }
      } else {
        setErrorMessage("Vos mots de passe doivent être identiques");
      }
    } else {
      setErrorMessage("Veuillez remplir tout les champs");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", gap: 20 }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logoPic}
      />
      <Text style={styles.title}>Sign up</Text>
      <CustomInput name="email" state={email} setState={setEmail} />
      <CustomInput name="username" state={username} setState={setUsername} />
      <TextInput
        placeholder="Describe yourself in a few words ..."
        style={styles.bigInput}
        value={desc}
        onChangeText={(text) => {
          setDesc(text);
        }}
        multiline={true}
      />
      <CustomInput
        name="password"
        state={password}
        setState={setPassword}
        password
      />
      <CustomInput
        name="confirm password"
        state={confirmPassword}
        setState={setConfirmPassword}
        password
      />

      {errorMessage ? <Text>{errorMessage}</Text> : null}

      <Pressable
        onPress={() => {
          handleSubmit();
        }}
        style={styles.button}
      >
        <Text style={{ fontSize: 20 }}>Sign up</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text>Already have an account ? Go there</Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 30,
    // alignItems: "center",
    // gap: 20,
  },
  logoPic: {
    height: 120,
    width: 120,
  },
  title: {
    fontSize: 30,
    color: "grey",
    fontWeight: "600",
  },
  bigInput: {
    height: 100,
    // backgroundColor: "red",
    padding: 10,
    width: "100%",
    borderColor: "pink",
    borderWidth: 2,
  },
  button: {
    borderColor: "red",
    borderWidth: 3,
    width: "50%",
    height: 65,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
