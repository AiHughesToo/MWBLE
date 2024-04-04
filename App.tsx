import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, Image, Linking} from "react-native";
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
    editMode,
    dualSide,
    running,
    errorCode,
    mydata,
    errorOne,
    disconnectFromDevice,
    increaseTimerValue,
    decreaseTimerValue,
    increasePowerValue,
    decreasePowerValue,
    sessionStart,
    sessionPause,
    sideChange,
  } = useBLE();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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
                        <Text style={TextStyles.BgText}>{mydata}</Text>
                        <Text style={TextStyles.BgText}>{connectedDevice.name}</Text>
                      </View>
                    
                      <View style={SectionStyles.rect}>
                        <Text style={TextStyles.headingText}>{minutes}:{seconds.toString().padStart(2,'0')}</Text>
                      </View>

                      <View style={SectionStyles.rect3}>
                          <TouchableOpacity
                            onPress={increaseTimerValue}
                            style={ButtonStyles.incrimentButton}
                          >
                            <Text style={TextStyles.incBtnText}>+</Text>
                          </TouchableOpacity>

                          <Text style={TextStyles.mainText}>TIMER</Text>
                          
                          <TouchableOpacity
                            onPress={decreaseTimerValue}
                            style={ButtonStyles.incrimentButton}
                          >
                            <Text style={TextStyles.incBtnText}>-</Text>
                          </TouchableOpacity>
                      </View>                      


                      <View style={SectionStyles.rect}>
                        <Text style={TextStyles.headingText}>{powerLevel}</Text>
                      </View>

                      <View style={SectionStyles.rect3}>
                          <TouchableOpacity
                            onPress={increasePowerValue}
                            style={ButtonStyles.incrimentButton}
                          >
                            <Text style={TextStyles.incBtnText}>+</Text>
                          </TouchableOpacity>

                          <Text style={TextStyles.mainText}>POWER</Text>
                          
                          <TouchableOpacity
                            onPress={decreasePowerValue}
                            style={ButtonStyles.incrimentButton}
                          >
                            <Text style={TextStyles.incBtnText}>-</Text>
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
                This Bluetooth remote app is for MagnaWave Julian and Julian Duo models manufactured after Jan 1 of 2023.
              </Text>
              <Text style={TextStyles.medText}>
                For instructions you can visit
              </Text>
              <TouchableOpacity onPress={handlePress}>
                  <Text style={{ color: 'white', textDecorationLine: 'underline', fontSize: 16 }}>
                    magnawavepemf.com/ble_instructions
                  </Text>
                </TouchableOpacity>
            </View>
            <View style={SectionStyles.rect}>
            <Text style={TextStyles.BgText}>
              Please connect to your MagnaWave device
            </Text>
            </View>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={ButtonStyles.ctaButton}
      >
        <Text style={TextStyles.btnText}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>
      <Text style={TextStyles.BgText}>{errorOne}</Text>
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