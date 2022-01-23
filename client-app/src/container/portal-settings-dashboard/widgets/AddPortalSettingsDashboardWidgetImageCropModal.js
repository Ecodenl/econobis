import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import Modal from '../../../components/modal/Modal';
import 'react-image-crop/dist/ReactCrop.css';

class AddPortalSettingsDashboardWidgetImageCropModal extends Component {
    constructor(props) {
        super(props);

        this.aspect = 16 / 9;
        this.aspectString = '16:9';
        this.cropStyle = { height: '225px', margin: '25px', verticalAlign: 'top' };

        this.state = {
            src: props.image.preview,
            crop: {
                unit: '%',
                width: 100,
                aspect: this.aspect,
            },
        };
    }

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // this.setState({ crop });
        this.setState({ crop: percentCrop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImage = await this.getCroppedImg(this.imageRef, crop, this.props.image.name);
            this.setState({ croppedImage });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(
                blob => {
                    if (!blob) {
                        //reject(new Error('Canvas is empty'));
                        console.error('Canvas is empty');
                        return;
                    }
                    blob.name = fileName;
                    blob.preview = window.URL.createObjectURL(blob);
                    resolve(blob);
                },
                'image/png',
                1
            );
        });
    }

    render() {
        const { crop, croppedImage, src } = this.state;

        return (
            <div className={'portal-layout-crop'}>
                <Modal
                    modalClassName={'modal-portal-layout-crop'}
                    title={'Bijsnijden image (' + this.props.image.name + ') verhouding ' + this.aspectString}
                    closeModal={this.props.closeShowCropWidgetImage}
                    confirmAction={() => this.props.cropLogo(croppedImage)}
                    buttonConfirmText={'Bevestig'}
                >
                    {src && (
                        <ReactCrop
                            src={src}
                            style={{ margin: '25px', verticalAlign: 'top' }}
                            crop={crop}
                            ruleOfThirds
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                        />
                    )}
                    {croppedImage && <img alt="Crop" style={this.cropStyle} src={croppedImage.preview} />}
                </Modal>
            </div>
        );
    }
}

export default AddPortalSettingsDashboardWidgetImageCropModal;
