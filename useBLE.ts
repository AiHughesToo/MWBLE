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
  increaseValue: () => void;
  decreaseValue: () => void;
  sessionStart: () => void;
  sessionPause: () => void;
  modeChange: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  powerLevel: number;
  minutes: number;
  seconds: number;
  editMode: number;
  dualSide: number;
  errorCode: number;
}

function useBLE(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [powerLevel, setPowerLevele] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [editMode, setEditMode] = useState<number>(0);
  const [dualSide, setDualSide] = useState<number>(0);
  const [errorCode, setErrorCode] = useState<number>(0);

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

  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
        console.log("Im scanning for devices");

      if (error) {
        console.log(error);
      }
      if (device && device.name != null) {
          console.log(device.name);
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      console.log(await bleManager.characteristicsForDevice(device.id, MWserviceUUID ))
    
      bleManager.stopDeviceScan();
      startStreamingData(deviceConnection);
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
        setConnectedDevice(null);
      })
      .catch((error) => {
        console.log(error);
      });
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
        return
      }); 
    }
  };


  const onMachineUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null
  ) => {
    if (error) {
      console.log(error);
      return -1;
    } else if (!characteristic?.value) {
      console.log("No Data was recieved");
      return -1;
    }
    const rawData = base64.decode(characteristic.value);

    setErrorCode(rawData[6].charCodeAt(0));
    setPowerLevele(rawData[1].charCodeAt(0));
    setMinutes(rawData[2].charCodeAt(0));
    setSeconds(rawData[3].charCodeAt(0));
    setEditMode(rawData[4].charCodeAt(0));
    setDualSide(rawData[0].charCodeAt(0));
    
  };

  const startStreamingData = async (device: Device) => {
    if (device) {
      
      device.monitorCharacteristicForService(
        MWserviceUUID,
        MWoutputUUID,
        onMachineUpdate
      );
    } else {
      console.log("No Device Connected");
    }
  };

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    increaseValue,
    decreaseValue,
    disconnectFromDevice,
    sessionStart,
    sessionPause,
    modeChange,
    allDevices,
    connectedDevice,
    powerLevel,
    minutes,
    seconds,
    editMode,
    dualSide,
    errorCode,
  };
}

export default useBLE;