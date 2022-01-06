import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import Modal from '../../../../components/modal/Modal';
import 'react-image-crop/dist/ReactCrop.css';

class PortalLogoLayoutNewCrop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            src: null,
            crop: {
                unit: '%',
                width: 30,
                aspect: 16 / 9,
            },
        };
    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => this.setState({ src: reader.result }));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(this.imageRef, crop, 'newFile.jpeg');
            this.setState({ croppedImageUrl });
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
                    window.URL.revokeObjectURL(this.fileUrl);
                    this.fileUrl = window.URL.createObjectURL(blob);
                    resolve(this.fileUrl);
                },
                'image/jpeg',
                1
            );
        });
    }

    render() {
        const { crop, croppedImageUrl, src } = this.state;

        return (
            <Modal
                modalClassName={'modal-lg'}
                title={'Crop image'}
                closeModal={this.props.toggleShowNewLogo}
                showConfirmAction={false}
            >
                {/*<div>*/}
                {/*    <input type="file" accept="image/*" onChange={this.onSelectFile} />*/}
                {/*</div>*/}
                {src && (
                    <ReactCrop
                        src={src}
                        crop={crop}
                        ruleOfThirds
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    />
                )}
                {croppedImageUrl && <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />}
            </Modal>
        );
    }
}

export default PortalLogoLayoutNewCrop;
