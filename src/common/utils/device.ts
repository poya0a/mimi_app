const getDeviceUUID = () => {
    // TODO Native Device Unique Id 필요
    return process.env.REACT_APP_DEVICE
};

export default {
    getDeviceUUID: getDeviceUUID,
}