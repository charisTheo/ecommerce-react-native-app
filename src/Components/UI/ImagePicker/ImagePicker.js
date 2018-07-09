import {Platform, PermissionsAndroid} from 'react-native';
import RNImagePicker from 'react-native-image-picker';

/**
 * Overrides react-native-image-picker
 *
 * Attempts to fix:
 *
 * - https://github.com/react-community/react-native-image-picker/issues/385
 * - https://github.com/react-community/react-native-image-picker/issues/581
 */
export default class ImagePicker {
    /**
     * Error response helper
     *
     * @param callback
     * @param error
     */
    static invokeError(callback, error) {
        const response = {didCancel: false, error};

        callback(response);
    }

    /**
     * Permissions helper - as react-native-image-picker does not really handle the new Android permissions system,
     * we want to do a pre-check-and-request routine beforehand
     *
     * @param permissions
     * @param options
     * @returns {Promise}
     */
    static checkAndRequest(permissions, options) {
        return new Promise((resolve, reject) => {
            if (Platform.OS !== 'android') {
                resolve();
            }
            else {
                const permissionsPromises = Promise.all(permissions.map(PermissionsAndroid.check));

                permissionsPromises
                    .then(results => {
                        const granted = results.indexOf(false) === -1;

                        if (granted) {
                            resolve();
                        }
                        else {
                            PermissionsAndroid
                                .requestMultiple(permissions)
                                .then(results => {
                                    const granted = !(Object.values(results).some(value => value !== 'granted'));

                                    if (granted) {
                                        resolve();
                                    }
                                    else {
                                        const errorMessage = (
                                            options.hasOwnProperty('permissionDenied') &&
                                            typeof options.permissionDenied.text === 'string'
                                        ) ?
                                            options.permissionDenied.text :
                                            'To be able to take pictures with your camera and choose images from your library.';

                                        reject(errorMessage);
                                    }
                                })
                                .catch(reject)
                                .done();
                        }
                    })
                    .catch(reject)
                    .done();
            }
        });
    }

    /**
     * Overrides react-native-image-picker showImagePicker()
     * (see https://github.com/react-community/react-native-image-picker/issues/385)
     *
     * @param options
     * @param callback
     */
    static showImagePicker(options, callback) {
        ImagePicker
            .checkAndRequest([
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.CAMERA
            ], options)
            .then(() => {
                RNImagePicker.showImagePicker(options, callback);
            })
            .catch(error => ImagePicker.invokeError(callback, error))
            .done();
    };

    /**
     * Overrides react-native-image-picker launchCamera()
     * (see https://github.com/react-community/react-native-image-picker/issues/385)
     *
     * @param options
     * @param callback
     */
    static launchCamera(options, callback) {
        ImagePicker
            .checkAndRequest([PermissionsAndroid.PERMISSIONS.CAMERA], options)
            .then(() => {
                RNImagePicker.launchCamera(options, callback);
            })
            .catch(error => ImagePicker.invokeError(callback, error))
            .done();
    };

    /**
     * Overrides react-native-image-picker launchImageLibrary()
     * (see https://github.com/react-community/react-native-image-picker/issues/385)
     *
     * @param options
     * @param callback
     */
    static launchImageLibrary(options, callback) {
        // Warning: we need to request both permissions because react-native-image-picker assumes (wrongly) that
        // both are needed to launch the library.
        ImagePicker
            .checkAndRequest([
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.CAMERA
            ], options)
            .then(() => {
                RNImagePicker.launchImageLibrary(options, callback);
            })
            .catch(error => ImagePicker.invokeError(callback, error))
            .done();
    };
}