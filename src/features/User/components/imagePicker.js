import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { Container, Thumbnail } from 'native-base'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

class imagePicker extends React.Component{
    constructor(){
        super();
        this.state = {
            imageSource: null,
            data: null,
            filename: null
        }
    }

    selectPhotoTapped() {

        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            },
            mediaType: 'photo'
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (!response.uri) {
                return;
            }
            let source = { uri: response.uri };

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            this.setState({
                imageSource: source,
                data: response.data,
                filename: response.fileName
            });
        })
    }
    uploadPhoto(){
        RNFetchBlob.fetch('POST', 'http://192.168.1.28/My_SQL/upload.php', {
            Authorization : "Bearer access-token",
            otherHeader : "foo",
            'Content-Type' : 'multipart/form-data',
        }, [
            { name : 'fileToUpload', filename : this.state.filename, type: 'image/jpeg', data: this.state.data},
            console.log('Data',this.state.data)
        ]).then((resp) => {
            console.log('resp ='+ resp);
        }).catch((err) => {
            console.log('errror = '+ err);
        })
    }

    render (){

        return(
            <Container style={styles.container}>
                <Image  style={{width: 300, height: 300, borderRadius: 80}}
                        source={this.state.imageSource != null ? this.state.imageSource :
                            require('../../../../pulic/assets/images/user.png')}/>
                <TouchableOpacity style={styles.button} onPress={this.selectPhotoTapped.bind(this)}>
                   <Text> {'เลือกรูปภาพ'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.uploadPhoto.bind(this)}>
                    <Text> {'อัพโหลด'}</Text>
                </TouchableOpacity>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 250,
        height: 50,
        backgroundColor: '#636863',
        justifyContent: 'center',
        marginTop: 10
    }
});
export default imagePicker;