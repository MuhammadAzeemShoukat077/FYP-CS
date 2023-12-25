import { StyleSheet, Text, View } from "react-native";
import React from "react";
// type PropertiesProps = {
//   label: string,
//   value: string,
// };

const Properties = ({ label, value }) => (
  <View style={styles.valueContainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default Properties;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // it might be black
    //alignItems: 'center',
    justifyContent: "center",
    padding: 25,
  },

  valueContainer: {
    // backgroundColor: 'lightyellow',
    //marginRight: 50,
    //marginVertical: 0,
    minWidth: "40%",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
    marginTop: 20,
  },
  value: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
  },
});
