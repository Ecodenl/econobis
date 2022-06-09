import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import Modal from '../../modal/Modal';
import 'react-image-crop/dist/ReactCrop.css';

class PortalLogoLayoutNewCrop extends Component {
    constructor(props) {
        super(props);

        this.imageRef = {};

        switch (this.props.imageLayoutItemName) {
            case 'logo-administration':
                this.aspectString = '2:1';
                this.crop = { unit: 'px', height: 200, aspect: 2 / 1 };
                this.cropStyle = { margin: '10px', border: '1px #000 dashed', verticalAlign: 'top' };
                break;
            case 'logo-login':
                // this.aspectString = '1:1';
                // this.crop = { unit: 'px', width: 200, aspect: 1 / 1 };
                this.aspectString = 'geen';
                this.crop = { unit: '%', width: '100', height: '100' };
                this.cropStyle = { margin: '10px', border: '1px #000 dashed', verticalAlign: 'top' };
                break;
            case 'logo-header':
                this.aspectString = '2:1';
                this.crop = { unit: 'px', height: 100, aspect: 2 / 1 };
                this.cropStyle = { margin: '10px', border: '1px #000 dashed', verticalAlign: 'top' };
                break;
            case 'image-bg-login':
                this.aspectString = '16:9';
                this.crop = { unit: 'px', width: 800, aspect: 16 / 9 };
                this.cropStyle = { margin: '10px', border: '1px #000 dashed', verticalAlign: 'top' };

                break;
            case 'image-bg-header':
                this.aspectString = '16:9';
                this.crop = { unit: 'px', height: 128, aspect: 16 / 9 };
                this.cropStyle = { margin: '10px', border: '1px #000 dashed', verticalAlign: 'top' };
                break;
            case 'image-widget':
                this.aspectString = '3:1';
                this.crop = { unit: 'px', width: 453, aspect: 3 / 1 };
                this.cropStyle = { margin: '10px', border: '1px #000 dashed', verticalAlign: 'top' };
                break;
            default:
                this.aspectString = '1:1';
                this.crop = { unit: '%', width: 100, aspect: 1 / 1 };
                this.cropStyle = { width: '200px', margin: '10px', border: '1px #000 dashed', verticalAlign: 'top' };
                break;
        }

        this.state = {
            src: props.image.preview,
            crop: this.crop,
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
        // const pixelRatio = window.devicePixelRatio;
        const pixelRatio = 1;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        // todo cleanup later
        // console.log('image.naturalWidth: ' + image.naturalWidth);
        // console.log('image.width: ' + image.width);
        // console.log('scaleX: ' + scaleX);
        // console.log('image.naturalHeight: ' + image.naturalHeight);
        // console.log('image.height: ' + image.height);
        // console.log('scaleY: ' + scaleY);
        // console.log('pixelRatio: ' + pixelRatio);
        // console.log('crop.width: ' + crop.width);
        // console.log('crop.height: ' + crop.height);
        // console.log('canvas.width: ' + canvas.width);
        // console.log('canvas.height: ' + canvas.height);

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
            const type = this.props.image.type ? this.props.image.type : 'image/png';

            canvas.toBlob(
                blob => {
                    if (!blob) {
                        //reject(new Error('Canvas is empty'));
                        console.error('Canvas is empty');
                        return;
                    }
                    blob.name = fileName;
                    blob.preview = window.URL.createObjectURL(blob);
                    (blob.cropWidth = canvas.width), (blob.cropHeight = canvas.height), resolve(blob);
                },
                type,
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
                    closeModal={this.props.closeShowCrop}
                    confirmAction={() => this.props.cropLogo(croppedImage)}
                    buttonConfirmText={'Bevestig'}
                >
                    {src && (
                        <>
                            <div>
                                <strong>
                                    {'Origineel ' +
                                        (this.imageRef.width ? this.imageRef.width : '') +
                                        ' x ' +
                                        (this.imageRef.height ? this.imageRef.height : '')}
                                </strong>
                            </div>
                            <ReactCrop
                                src={src}
                                style={{ margin: '10px' }}
                                // imageStyle={{ verticalAlign: 'middle', display: 'inline-block' }}
                                crop={crop}
                                ruleOfThirds
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                            />
                        </>
                    )}
                    {croppedImage && (
                        <>
                            <div>
                                <strong>
                                    {'Bijgewerkt ' +
                                        (croppedImage.cropWidth ? croppedImage.cropWidth : '') +
                                        ' x ' +
                                        (croppedImage.cropHeight ? croppedImage.cropHeight : '')}
                                </strong>
                            </div>
                            <img alt="Crop" style={this.cropStyle} src={croppedImage.preview} />
                        </>
                    )}
                </Modal>
            </div>
        );
    }
}

export default PortalLogoLayoutNewCrop;
