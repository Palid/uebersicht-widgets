import yaml from "./lib/vendor/js-yaml.min.js";
import { Device } from "./src/Device.jsx";
import { BluetoothDevice } from "./src/BluetoothDevice.jsx";

export const command = `system_profiler SPBluetoothDataType`;

export const className = `
bottom: 10%;
left: 2.5%
`;

export const render = ({ output, devices, error }) => {
  return error ? (
    <>
      <div>{error}</div>
    </>
  ) : (
    <div>
      {devices.map((device) => (
        <Device bluetoothDevice={device} />
      ))}
      <p>{output}</p>
    </div>
  );
};

export const updateState = (event, previousState) => {
  const { type, output } = event;
  if (event.error) {
    return {
      devices: [],
      error: `Something went wrong while getting BT state.`,
    };
  }
  if (output) {
    const response = yaml.load(output);
    const devices = response?.Bluetooth?.Connected;
    if (devices) {
      const connectedDeviceNames = Object.keys(devices);
      const btDevices = [];
      for (const deviceName of connectedDeviceNames) {
        const device = devices[deviceName];
        btDevices.push(new BluetoothDevice(deviceName, device));
      }
      return {
        devices: btDevices,
      };
    }
    return { devices: [] };
  } else {
    return { devices: [] };
  }
};

// Once every five minutes
export const refreshFrequency = 1000 * 60 * 5;
