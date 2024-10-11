import { StyleSheet, Text, View } from "react-native"
import { globalStyles } from "../../ulti/const";
const styles = StyleSheet.create({
    about: {
        fontSize: 30
    }
})
const AboutScreen = () => {
    return (
        <View>
            <Text style={[styles.about, globalStyles.globalFont]}> about screen google</Text>
        </View>
    )
}
export default AboutScreen;