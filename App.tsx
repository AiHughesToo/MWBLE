import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, Image, Linking, TextInput} from "react-native";
import { TextStyles, SectionStyles, ImageStyles, ButtonStyles} from "./src/MainStyleSheet";
import DeviceModal from "./DeviceConnectionModal";
import useBLE from "./useBLE";

const App = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    powerLevel,
    minutes,
    seconds,
    dualSide,
    running,
    errorCode,
    errorOne,
    editMode,
    authenticated,
    disconnectFromDevice,
    authEmail,
    increaseTimerValue,
    decreaseTimerValue,
    increasePowerValue,
    decreasePowerValue,
    sessionStart,
    sessionPause,
    sideChange,
  } = useBLE();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [authedEmail, setAuthedEmail] = useState<string>('');

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  const handlePress = () => {
    Linking.openURL('https://www.magnawavepemf.com/ble_instructions');
  };

  const handlePressToo = () => {
    Linking.openURL('https://magnawavepemf.zendesk.com/hc/en-us');
  };
  
  return (
    <SafeAreaView style={SectionStyles.containerTwo}>
      <View style={SectionStyles.TitleWrapper}>
           {connectedDevice ? (
          <>
            {errorCode == 1 ? 
                    (
                      <View style={SectionStyles.container}>
                        <View style={SectionStyles.rect}>
                        <Text style={TextStyles.errorText}>Attachment Not Detected. Please check lead connections.</Text>
                        </View>
                      </View >
                    ) : (
                    <View style={SectionStyles.container}>
                      
                      <View style={SectionStyles.TitleWrapper}>
                        <Text style={TextStyles.BgText}>{connectedDevice.name}</Text>
                      </View>
                    
                      <View style={SectionStyles.rect}>
                        <Text style={TextStyles.headingText}>{minutes}:{seconds.toString().padStart(2,'0')}</Text>
                      </View>

                      <View style={SectionStyles.rect3}>

                        {running > 0 ? 
                           <TouchableOpacity
                            style={ButtonStyles.incrimentButtonDead}
                           >
                           <Text style={TextStyles.incBtnText}>-</Text>
                          </TouchableOpacity>
                          :
                          <TouchableOpacity
                            onPress={decreaseTimerValue}
                            style={ButtonStyles.incrimentButton}
                          >
                           <Text style={TextStyles.incBtnText}>-</Text>
                          </TouchableOpacity>
                        }
 
                        <Text style={TextStyles.modeText}>{editMode > 0 ? "TIMER >" : "TIMER" }</Text>

                        {running > 0 ? 
                          <TouchableOpacity
                            style={ButtonStyles.incrimentButtonDead}
                            >
                            <Text style={TextStyles.incBtnText}>+</Text>
                          </TouchableOpacity>
                          :
                          <TouchableOpacity
                            onPress={increaseTimerValue}
                            style={ButtonStyles.incrimentButton}
                            >
                            <Text style={TextStyles.incBtnText}>+</Text>
                          </TouchableOpacity>
                        }
                         
                      </View>                      

                      <View style={SectionStyles.rect}>
                        <Text style={TextStyles.headingText}>{powerLevel}</Text>
                      </View>

                      <View style={SectionStyles.rect3}>
                                  
                           <TouchableOpacity
                            onPress={decreasePowerValue}
                            style={ButtonStyles.incrimentButton}
                          >
                            <Text style={TextStyles.incBtnText}>-</Text>
                          </TouchableOpacity>

                          <Text style={TextStyles.modeText}>{editMode > 0 ? "POWER" : "POWER >" }</Text>
    
                          <TouchableOpacity
                            onPress={increasePowerValue}
                            style={ButtonStyles.incrimentButton}
                          >
                            <Text style={TextStyles.incBtnText}>+</Text>
                          </TouchableOpacity>

                        </View>                      
      
                    
                        <View style={SectionStyles.rect2}>
                          {running > 0 ?
                        
                          <TouchableOpacity
                            onPress={sessionPause}
                            style={ButtonStyles.start}>
                            <Text style={TextStyles.btnText}>STOP</Text>
                          </TouchableOpacity>

                          :

                          <TouchableOpacity
                          onPress={sessionStart}
                          style={ButtonStyles.stop}>
                          <Text style={TextStyles.btnText}>Start</Text>
                        </TouchableOpacity>
                        
                        }
                        </View>
                  
                      <View >
                        {dualSide > 0 && (
                        <TouchableOpacity
                            onPress={sideChange}
                            style={ButtonStyles.ctaButton}
                          >
                          <Text style={TextStyles.btnText}>Switch Sides</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                  
                    </View>
              )}
          </>
        ) : (
          <View style={SectionStyles.containerTwo}>
            <View style={ImageStyles.logoContainer}> 
              <Image source={require('./assets/adaptive-icon.png')} style={ImageStyles.logoImage} />
            </View>
            <Text style={TextStyles.appTitleText}>
                MagnaWave Remote App
              </Text>
            <View style={SectionStyles.rect4}>  
              <Text style={TextStyles.medText}>
                This Bluetooth remote app is for MagnaWave Julian models manufactured after Nov 6 2023.
              </Text>
              <Text style={TextStyles.medText}>
                For instructions you can visit
              </Text>
              <TouchableOpacity onPress={handlePress}>
                  <Text style={{ color: 'white', textDecorationLine: 'underline', fontSize: 16 }}>
                    magnawavepemf.com/ble_instructions
                  </Text>
              </TouchableOpacity>

              <Text style={TextStyles.medText}>
                For service and support visit
              </Text>
              <TouchableOpacity onPress={handlePressToo}>
                  <Text style={{ color: 'white', textDecorationLine: 'underline', fontSize: 16 }}>
                    magnawavepemf.com/support
                  </Text>
              </TouchableOpacity>
            </View>
            <View style={SectionStyles.rect5}>
            
            </View>
          </View>
        )}
      </View>

      { authenticated ? 
        <><View style={SectionStyles.rect5}>
          <Text style={TextStyles.mainText}>
            Please connect to a MagnaWave device
          </Text>
        </View><TouchableOpacity
          onPress={connectedDevice ? disconnectFromDevice : openModal}
          style={ButtonStyles.ctaButton}
        >
            <Text style={TextStyles.btnText}>
              {connectedDevice ? "Disconnect" : "Scan For Devices"}
            </Text>
          </TouchableOpacity></> :
    <>
    <View style={SectionStyles.rect5}>
          <Text style={TextStyles.mainText}>
            Please enter your authorized email to access the app.
          </Text>
        </View>

  
        <TextInput style={TextStyles.inputStyle}
        placeholder="Authorized Email"
        onChangeText={(text) => setAuthedEmail(text)}
        keyboardType='email-address'
        autoCapitalize="none"
        autoCorrect={false}
        />
    

     <TouchableOpacity
        onPress={() => authEmail(authedEmail)}
        style={ButtonStyles.ctaButton}
      >
        <Text style={TextStyles.btnText}>
          {"Sign In"}
        </Text>
      </TouchableOpacity>
    
    </>
    
    }

      <Image source={require('./assets/MagnaWave.png')} style={ImageStyles.nameImage} />
      
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
        /> 
    </SafeAreaView>
  );
};

export default App;