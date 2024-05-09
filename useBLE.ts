/* eslint-disable no-bitwise */
import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";

import * as ExpoDevice from "expo-device";
import base64 from "react-native-base64";

const MWserviceUUID = "86aba96c-6941-437f-a594-0ac4ee690a7a";
const MWoutputUUID = "b4bd87a3-6222-4468-a208-84ee0078eef7";
const MWinputUUID = "6e2adbf6-19b5-42c8-93fb-e34560015b59";
const increase = "AA==";
const decrease = "AQ==";
const changeMode = "Ag==";
const startSession = "BA==";
const pauseSession = "Aw==";
const changeSides = "BQ==";
const disconnectMachine = "Bg==";


interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForPeripherals(): void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  increaseTimerValue: () => void;
  decreaseTimerValue: () => void;
  increasePowerValue: () => void;
  decreasePowerValue: () => void;
  increaseValue: () => void;
  decreaseValue: () => void;
  sessionStart: () => void;
  sessionPause: () => void;
  modeChange: () => void;
  sideChange: () => void;
  authEmail(email: string): void;
  connectedDevice: Device | null;
  allDevices: Device[];
  powerLevel: number;
  minutes: number;
  seconds: number;
  editMode: number;
  dualSide: number;
  errorCode: number;
  running: number;
  mydata: string;
  errorOne: string;
  authenticated: boolean;
}

function useBLE(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [powerLevel, setPowerLevel] = useState<number>(0);
  const [running, setRunning] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [editMode, setEditMode] = useState<number>(0);
  const [dualSide, setDualSide] = useState<number>(0);
  const [errorCode, setErrorCode] = useState<number>(0);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [mydata, setMyData] = useState<string>("-");
  const [errorOne, setErrorOne] = useState<string>("--");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout| null>(null);

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const authEmail = async (email: string) => {
  
    fetch('https://bleapi-2e4a5478bc86.herokuapp.com/validate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'item': email })
    })
    .then((response) => response.json())
    .then((response) => {
  
      if(response.id){
       
        setAuthenticated(true);
      } else {
        console.log(response.error);
        setAuthenticated(false);
      }
     
      return;
    });
  };


  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {

      if (error) {
        console.log(error);
      }
      if (device && device.name != null) {

        if(device.serviceUUIDs && device.serviceUUIDs[0] ==  MWserviceUUID)
          setAllDevices((prevState: Device[]) => {
            if (!isDuplicteDevice(prevState, device)) {
              return [...prevState, device];
            }
            return prevState;
        });
      }
    });

    // Android
  // const connectToDevice = async (device: Device) => {
    
  //   try {
  //     bleManager.stopDeviceScan();
  //     const deviceConnection = await bleManager.connectToDevice(device.id);
  //     setConnectedDevice(deviceConnection);
  //     await deviceConnection.discoverAllServicesAndCharacteristics();
  //     // console.log(await bleManager.characteristicsForDevice(device.id, MWserviceUUID ));
      
  //     startStreamingData(deviceConnection);
  //   } catch (e) {
  //     console.log("FAILED TO CONNECT", e);
  //   }
  // };

  // iOS
  const connectToDevice = async (device: Device) => {
    try {
      bleManager.stopDeviceScan();
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();

     await deviceConnection.readCharacteristicForService(
        MWserviceUUID,
        MWoutputUUID
      ).then((characteristic) => {
        setMyData(characteristic.deviceID);
      });
      
      let count = 0;
      const intervalId = setInterval(() => {

        deviceConnection.readCharacteristicForService(
          MWserviceUUID,
          MWoutputUUID
        ).then((characteristic) => {
          
          if(characteristic.value){

            const rawData = base64.decode(characteristic.value);
            count = count + 1;

            setErrorOne(characteristic.value + "count" + count);
            setDualSide(rawData[0].charCodeAt(0));
            setPowerLevel(rawData[1].charCodeAt(0));
            setMinutes(rawData[2].charCodeAt(0));
            setSeconds(rawData[3].charCodeAt(0));
            setEditMode(rawData[4].charCodeAt(0));
            setRunning(rawData[5].charCodeAt(0));
            setErrorCode(rawData[6].charCodeAt(0));
          }

        });

        
      }, 500); 

      setIntervalId(intervalId);
      
      const cleanup = () => clearInterval(intervalId);
      deviceConnection.onDisconnected(() => {
        cleanup();
        setConnectedDevice(null);
        setAllDevices([]);
      });
  
    // startStreamingData(deviceConnection);
    } catch (e) {
      console.log("FAILED TO CONNECT", e);
    }
  };


  const disconnectFromDevice = () => {
    if (connectedDevice) {
      connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, disconnectMachine ) 
      .then((characteristic) => {
        console.log(characteristic.value);
      })
      .then(() => {
        if (intervalId) {
          clearInterval(intervalId);
          setIntervalId(null);
        }
        setConnectedDevice(null);
        setAllDevices([]);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const onMachineUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null
  ) => {

    if(connectedDevice) {
      connectedDevice.readCharacteristicForService(
        MWserviceUUID,
        MWoutputUUID
      );
    }

    if (error) {
      console.log(error);
      return -1;
    } else if (!characteristic?.value) {
      console.log("No Data was recieved");
      return -1;
    }

    const rawData = base64.decode(characteristic.value);

    setDualSide(rawData[0].charCodeAt(0));
    setPowerLevel(rawData[1].charCodeAt(0));
    setMinutes(rawData[2].charCodeAt(0));
    setSeconds(rawData[3].charCodeAt(0));
    setEditMode(rawData[4].charCodeAt(0));
    setRunning(rawData[5].charCodeAt(0));
    setErrorCode(rawData[6].charCodeAt(0));
  };

  const startStreamingData = async (device: Device) => {
    if (device) {
    
      device.monitorCharacteristicForService(
        MWserviceUUID,
        MWoutputUUID,
        onMachineUpdate
      );
    } else {
      setErrorOne("no device Connected");
      console.log("No Device Connected");
    }
  };

  const increaseTimerValue = () => {
    if (connectedDevice) {
      if(editMode > 0) {
          connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, increase )
        .then((characteristic) => {
          console.log(characteristic.value);
          return
        }); 
      } else {
        connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, changeMode )
      .then((characteristic) => {
        console.log(characteristic.value);
        setTimeout(increaseValue,
          500
        );
       ;
      }); 
      }
     
    }
  };

  const decreaseTimerValue = () => {
    if (connectedDevice) {
      if(editMode > 0) {
          connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, decrease )
        .then((characteristic) => {
          console.log(characteristic.value);
          return
        }); 
      } else {
        connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, changeMode )
      .then((characteristic) => {
        console.log(characteristic.value);
        setTimeout(decreaseValue,
          500
        );
       ;
      }); 
      }
     
    }
  };

  const increasePowerValue = () => {
    if (connectedDevice) {
      if(editMode > 0) {
        connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, changeMode )
        .then((characteristic) => {
          console.log(characteristic.value);
          setTimeout(increaseValue,
            500
          );
         ;
        }); 

      } else {
        connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, increase )
        .then((characteristic) => {
          console.log(characteristic.value);
          return
        }); 
      }
     
    }
  };

  const decreasePowerValue = () => {
    if (connectedDevice) {
      if(editMode > 0) {
        connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, changeMode )
        .then((characteristic) => {
          console.log(characteristic.value);
          setTimeout(decreaseValue,
            500
          );
         ;
        }); 
      } else {
        connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, decrease )
        .then((characteristic) => {
          console.log(characteristic.value);
          return
        }); 
      }
     
    }
  };

  const increaseValue = () => {
    if (connectedDevice) {
      connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, increase )
      .then((characteristic) => {
        console.log(characteristic.value);
        return
      }); 
    }
  };

  const decreaseValue = () => {
    if (connectedDevice) {
      connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, decrease )
      .then((characteristic) => {
        console.log(characteristic.value);
        return
      });
    }
  };

  const sessionStart = () => {
    if (connectedDevice) {
      connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, startSession )
      .then((characteristic) => {
        console.log(characteristic.value);
        return
      }); 
    }
  };

  const sessionPause = () => {
    if (connectedDevice) {
      connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, pauseSession )
      .then((characteristic) => {
        console.log(characteristic.value);
        return
      });
    }
  };

  const modeChange = () => {
    if (connectedDevice) {
      connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, changeMode )
      .then((characteristic) => {
        console.log(characteristic.value);
        return;
      }); 
    }
  };

  const sideChange = () => {
    if (connectedDevice) {
      connectedDevice.writeCharacteristicWithResponseForService(MWserviceUUID, MWinputUUID, changeSides )
      .then((characteristic) => {
        console.log(characteristic.value);
        return;
      }); 
    }
  };


  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    increaseTimerValue,
    decreaseTimerValue,
    increasePowerValue, 
    decreasePowerValue, 
    increaseValue,
    decreaseValue,
    disconnectFromDevice,
    sessionStart,
    sessionPause,
    modeChange,
    sideChange,
    authEmail,
    allDevices,
    connectedDevice,
    powerLevel,
    minutes,
    seconds,
    editMode,
    dualSide,
    errorCode,
    running,
    mydata,
    errorOne,
    authenticated,
  };
}

export default useBLE;