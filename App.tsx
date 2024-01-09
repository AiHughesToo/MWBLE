import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, Image} from "react-native";
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
    errorCode,
    disconnectFromDevice,
    increaseValue,
    decreaseValue,
    sessionStart,
    sessionPause,
    modeChange,
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

  return (
    <SafeAreaView style={SectionStyles.container}>
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

                      <View style={SectionStyles.rect}>
                        <Text style={TextStyles.mainText}>{ editMode > 0 ? "Timer >" : "Timer" }</Text>
                        <Text style={TextStyles.headingText}>{minutes}:{seconds.toString().padStart(2,'0')}</Text>
                        <Text style={TextStyles.mainText}>{ editMode > 0 ? "Power" : "Power >" }</Text>
                        <Text style={TextStyles.headingText}>{powerLevel}</Text>
                      </View>
      
                      <View style={SectionStyles.rect2Row}>
                        <View style={SectionStyles.rect2}>
                          <TouchableOpacity
                            onPress={sessionStart}
                            style={ButtonStyles.button}
                          >
                            <Text style={TextStyles.btnText}>START</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={sessionPause}
                            style={ButtonStyles.button2}
                          >
                            <Text style={TextStyles.btnText}>STOP</Text>
                          </TouchableOpacity>
                        </View>
                    
                        <View style={SectionStyles.rect3}>
                          <TouchableOpacity
                            onPress={increaseValue}
                            style={ButtonStyles.button}
                          >
                            <Text style={TextStyles.btnText}>UP</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={decreaseValue}
                            style={ButtonStyles.button}
                          >
                            <Text style={TextStyles.btnText}>DOWN</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View >
                      <TouchableOpacity
                            onPress={modeChange}
                            style={ButtonStyles.button}
                          >
                            <Text style={TextStyles.btnText}>MODE</Text>
                          </TouchableOpacity>
                      </View>
                      <View >
                        {dualSide > 0 && (
                        <TouchableOpacity
                            onPress={decreaseValue}
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
          <View style={SectionStyles.container}>
            <View style={ImageStyles.logoContainer}> 
              <Image source={require('./assets/adaptive-icon.png')} style={ImageStyles.logoImage} />
            </View>
            <View style={SectionStyles.rect}>
            <Text style={TextStyles.BgText}>
              Please Connect to your MagnaWave Device
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