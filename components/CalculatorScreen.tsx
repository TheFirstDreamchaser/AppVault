import * as React from "react";
import { View, Text, Pressable, Alert, StyleSheet, SafeAreaView } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';


export default function CalculatorScreen({ navigation }) {
  
  const [firstNumber, setFirstNumber] = React.useState("");
  const [secondNumber, setSecondNumber] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [result, setResult] = React.useState<Number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    setOperation(buttonValue);
    setSecondNumber(firstNumber + " ");
    setFirstNumber("");
  };

  const clear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 99999
              ? [styles.screenFirstNumber, { color: '#46D5B2' }]
              : [
                  styles.screenFirstNumber,
                  { fontSize: 50, color: '#46D5B2' },
                ]
          }
        >
          {result?.toString()}
        </Text>
      );
    }
    if (firstNumber && firstNumber.length < 6) {
      return <Text style={styles.screenFirstNumber}>{firstNumber}</Text>;
    }
    if (firstNumber === "") {
      return <Text style={styles.screenFirstNumber}>{"0"}</Text>;
    }
    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[styles.screenFirstNumber, { fontSize: 70 }]}>
          {firstNumber}
        </Text>
      );
    }
    if (firstNumber.length > 7) {
      return (
        <Text style={[styles.screenFirstNumber, { fontSize: 50 }]}>
          {firstNumber}
        </Text>
      );
    }
  };

  const getResult = () => {
    switch (operation) {
      case "+":
        clear();
        setResult(parseFloat(secondNumber) + parseFloat(firstNumber));
        break;
      case "-":
        clear();
        setResult(parseFloat(secondNumber) - parseFloat(firstNumber));
        break;
      case "*":
        clear();
        setResult(parseFloat(secondNumber) * parseFloat(firstNumber));
        break;
      case "/":
        clear();
        setResult(parseFloat(secondNumber) / parseFloat(firstNumber));
        break;
      case "%":
        clear();
        setResult(parseFloat(secondNumber) % parseFloat(firstNumber));
        break;
      case "^":
        clear();
        setResult(Math.pow(parseFloat(secondNumber), parseFloat(firstNumber)));
        break;
      default:
        clear();
        setResult(0);
        break;
    }
  };
  
  return (
      <SafeAreaView style={styles.container}>
         <View style={styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: "90%",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        <Text style={styles.screenSecondNumber}>
          {secondNumber}
          <Text style={{ color: "purple", fontSize: 50, fontWeight: "500" }}>
            {operation}
          </Text>
        </Text>
        {firstNumberDisplay()}
      </View>
      <View style={styles.row}>
        <Pressable onPress={clear} style={styles.btnGray}>
          <Text style={styles.smallTextLight}>C</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOperationPress("^")}
          style={styles.btnGray}
        >
          <Text style={styles.smallTextLight}>^</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOperationPress("%")}
          style={styles.btnGray}
        >
          <Text style={styles.smallTextLight}>%</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOperationPress("/")}
          style={styles.btnBlue}
        >
          <Text style={styles.smallTextLight}>/</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable
          onPress={() => handleNumberPress("7")}
          style={styles.btnLight}
        >
          <Text style={styles.smallTextDark}>7</Text>
        </Pressable>
        <Pressable
          onPress={() => handleNumberPress("8")}
          style={styles.btnLight}
        >
          <Text style={styles.smallTextDark}>8</Text>
        </Pressable>
        <Pressable
          onPress={() => handleNumberPress("9")}
          style={styles.btnLight}
        >
          <Text style={styles.smallTextDark}>9</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOperationPress("*")}
          style={styles.btnBlue}
        >
          <Text style={styles.smallTextLight}>*</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable
          onPress={() => handleNumberPress("4")}
          style={styles.btnLight}
        >
          <Text style={styles.smallTextDark}>4</Text>
        </Pressable>
        <Pressable
          onPress={() => handleNumberPress("5")}
          style={styles.btnLight}
        >
          <Text style={styles.smallTextDark}>5</Text>
        </Pressable>
        <Pressable
          onPress={() => handleNumberPress("6")}
          style={styles.btnLight}
        >
          <Text style={styles.smallTextDark}>6</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOperationPress("-")}
          style={styles.btnBlue}
        >
          <Text style={styles.smallTextLight}>-</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable
          onPress={() => handleNumberPress("1")}
          style={styles.btnLight}
        >
          <Text style={styles.smallTextDark}>1</Text>
        </Pressable>
        <Pressable
          onPress={() => handleNumberPress("2")}
          style={styles.btnLight}
        >
          <Text style={styles.smallTextDark}>2</Text>
        </Pressable>
        <Pressable
          onPress={() => handleNumberPress("3")}
          style={styles.btnLight}
        >
          <Text style={styles.smallTextDark}>3</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOperationPress("+")}
          style={styles.btnBlue}
        >
          <Text style={styles.smallTextLight}>+</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable
          onPress={() => handleNumberPress(".")}
          style={styles.btnLight}
        >
          <Text style={styles.smallTextDark}>.</Text>
        </Pressable>
        <Pressable
          onPress={() => handleNumberPress("0")}
          style={styles.btnLight}
        >
          <Text style={styles.smallTextDark}>0</Text>
        </Pressable>
        <Pressable
          onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
          style={styles.btnLight}
        >
          <Text style={styles.smallTextDark}>⌫</Text>
        </Pressable>
        <Pressable
          onPress={() => getResult()}
          style={styles.btnBlue}
          onLongPress={async () => {
            const auth = await LocalAuthentication.authenticateAsync()
            if (auth.success) {
              navigation.navigate("Home")
            }
          }}
          delayLongPress={2000}
        >
          <Text style={styles.smallTextLight}>=</Text>
        </Pressable>
      </View>
    </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15191b',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },btnBlue: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#4B5EFC',
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  btnDark: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#2E2F38',
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  btnLight: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  btnGray: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#4E505F',
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  smallTextLight: {
    fontSize: 32,
    color: '#FFFFFF',
  },
  smallTextDark: {
    fontSize: 32,
    color: '#000000',
  },
  row: {
    maxWidth: "100%",
    flexDirection: "row",
  },
  viewBottom: {
    position: "absolute",
    bottom: 50,
  },
  screenFirstNumber: {
    fontSize: 96,
    color: '#747477',
    fontWeight: "200",
    alignSelf: "flex-end",
  },
  screenSecondNumber: {
    fontSize: 40,
    color: '#747477',
    fontWeight: "200",
    alignSelf: "flex-end",
  },
});
