import { StyleSheet } from 'react-native';

const Background = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: null,
      height: null
    }
  })
  
  const SectionStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#292929",
    },
    rect: {
      width: 375,
      backgroundColor: "#fff",
      marginTop: 54,
      paddingBottom: 10,
      borderRadius: 20,
      alignSelf: "center",
      borderWidth: 2,
      borderBottomColor: "#000",
      borderTopColor: "#ccc",
      borderLeftColor: "#999",
      borderRightColor: "#555"
    },
    rect2: {
      width: 180,
      height: 169,
      borderRadius: 20,
      borderWidth: 3,
      borderStyle: "solid",
      borderColor: "#000",
      marginLeft: 5,
      marginRight: 5,
    },
    rect3: {
      width: 180,
      height: 169,
      borderRadius: 20,
      borderWidth: 3,
      borderStyle: "solid",
      borderColor: "#000",
      marginLeft: 5,
      marginRight: 5,
    },
    rect2Row: {
      height: 169,
      flexDirection: "row",
      marginTop: 18,
      marginRight: -1
    },
    TitleWrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  })

  const ImageStyles = StyleSheet.create({
    logoContainer: {
      paddingTop: 25,
      paddingBottom: 10,
      justifyContent: 'center',
      alignSelf: 'center'
    },
    logoImage: {
      width: 250,
      height: 250
    },
    nameImage: {
      width: 150,
      height: 20,
      marginTop: 5,
      marginBottom: 5,
      alignSelf: 'center',
    }
  })

  const ButtonStyles = StyleSheet.create({
    button: {
      width: 87,
      height: 35,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: 'center',
      backgroundColor: "#0099e0",
      borderRadius: 23,
      marginTop: 32,
    },
    button2: {
      width: 87,
      height: 35,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: 'center',
      backgroundColor: "rgba(223,89,89,1)",
      borderRadius: 23,
      marginTop: 28,
    },
    ctaButton: {
      backgroundColor: "#0099e0",
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      marginHorizontal: 20,
      marginBottom: 5,
      borderRadius: 8,
      paddingRight: 5,
      paddingLeft: 5,
    },
  })

  const TextStyles = StyleSheet.create({
    headingText: {
      justifyContent: 'center',
      alignSelf: 'center',
      color: '#0099e0',
      fontSize: 50,
      fontWeight: '700',
      paddingTop: 10,
      paddingBottom: 10
    },
    mainText: {
      color: '#000',
      fontSize: 18,
      fontWeight: '500',
      paddingTop: 10,
      paddingBottom: 8,
      paddingLeft: 10
    },
    BgText: {
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center",
      marginHorizontal: 20,
      color: "black",
    },
    errorText: {
      justifyContent: 'center',
      alignSelf: 'center',
      color: '#d6370f',
      fontSize: 40,
      fontWeight: '700',
      paddingTop: 10,
      paddingBottom: 10
    },
    smlText: {
      justifyContent: 'center',
      alignSelf: 'center',
      color: '#fff',
      fontSize: 12,
      fontWeight: '500'
    }, 
    btnText: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: '500'
    }
  })


export { Background, TextStyles, SectionStyles, ImageStyles, ButtonStyles };