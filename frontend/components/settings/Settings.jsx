import { StyleSheet, View,Text } from "react-native";
import { GLOBAL_STYLES } from "../../styles/Style";
import { sUtils } from "./SettingsUtils";
import { Button, Icon } from 'react-native-elements';

export default function Settings() {
  const listItemIconSize = 20;
  return (
    <View style={{padding:10}}>
    <Text style ={{fontSize:30,color:"white",textAlign:"center",padding:10}} >Settings</Text>
      <View style={{justifyContent:"center",alignItems:"center"}} >



<Button
      icon={
        <Icon
          name="refresh"
          type="ionicon"
          color="black"
        />
      }
      title="Clear Data"
      onPress={sUtils.clearData}
      buttonStyle={{ backgroundColor: 'white' }}
      titleStyle={{ color: 'black' }}
      containerStyle={{ marginTop: 20 ,width:300}}
    />







      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: GLOBAL_STYLES.COLORS.foreground,
    paddingVertical: 20,

  },
  listItemIcon: {
    color: GLOBAL_STYLES.COLORS.background,
  },
  listItemTitle: {
    color: GLOBAL_STYLES.COLORS.background,
  },
});
