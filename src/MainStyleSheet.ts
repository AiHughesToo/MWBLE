import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
      backgroundColor: "#fff",
      borderRadius: 20,
      marginBottom: 10,
      marginTop: 25,
    },
    containerTwo: {
      flex: 1,
      backgroundColor: "#004ea8",
    },
    rect: {
      width: width * 0.90,
      backgroundColor:  "rgba(241,242,250,0.5)",
      marginTop: 10,
      marginRight: 10,
      marginLeft: 10,
      marginBottom: 5,
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
      width: width * 0.70,
      height: 50,
      borderRadius: 20,
      justifyContent: "center", 
      alignSelf: "center",
      flex: 1, 
      alignItems: "center", 
      marginLeft: 5,
      marginRight: 5,
    },
    rect3: {
      width: width * 0.70,
      height: 28,
      flexDirection: "row",
      alignSelf: "center",
      flex: 1, 
      justifyContent: "space-between", 
      alignItems: "center", 
      
    },
    rect4: {
      width: width * 0.80,
      alignSelf: "center",
      flex: 1, 
      marginTop: 10,
    },
    rect5: {
      width: width * 0.95,
      marginTop: 10,
      marginRight: 5,
      marginLeft: 5,
      marginBottom: 5,
      paddingBottom: 10,
      alignSelf: "center",
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
      paddingBottom: 0,
      justifyContent: 'center',
      alignSelf: 'center'
    },
    logoImage: {
      width: 225,
      height: 225
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
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: 'center',
      backgroundColor: "#0099e0",
      borderRadius: 50,
      marginTop: 5,
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
    start: {
      width: 300,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: 'center',
      backgroundColor: "rgba(223,89,89,1)",
      borderRadius: 23,
      marginTop: 5,
    },
    stop: {
      width: 300,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: 'center',
      backgroundColor: "#40904d",
      borderRadius: 23,
      marginTop: 5,
    },
    incrimentButton: {
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: 'center',
      backgroundColor: "#0099e0",
      borderRadius: 50,
      marginTop: 5,
    },
    incrimentButtonDead: {
      width: 55,
      height: 55,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: 'center',
      backgroundColor: "#ddd",
      borderRadius: 50,
      marginTop: 5,
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
      color: '#fff',
      fontSize: 20,
      fontWeight: '500',
      textAlign: "center",
    },
    modeText: {
      color: '#0099e0',
      fontSize: 25,
      fontWeight: '500',
      textAlign: "center",
    },
    BgText: {
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
      marginHorizontal: 20,
      color: "black",
    },
    appTitleText: {
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center",
      marginHorizontal: 20,
      color: "white",
    },
    errorText: {
      justifyContent: 'center',
      alignSelf: 'center',
      color: '#d6370f',
      fontSize: 20,
      fontWeight: '700',
      paddingTop: 15,
      paddingBottom: 15
    },
    medText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
      paddingBottom: 5,
      textAlign: "left"
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
    },
    incBtnText: {
      justifyContent: 'center',
      alignSelf: 'center',
      color: '#fff',
      fontSize: 50,
      lineHeight: 55,
      fontWeight: '600'
  },
  inputStyle: {
    color: '#000',
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 17,
    lineHeight: 23,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 8
  },

  })


export { Background, TextStyles, SectionStyles, ImageStyles, ButtonStyles };