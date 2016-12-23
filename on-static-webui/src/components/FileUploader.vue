<template>
    <div>
        <div v-show="showIsoUpload" class="input-group">
            <label id="file-browse" class="input-group-addon">
            Browse...<input @change="fileSelected" type="file" style="display: none">
</label>
<input type="text" class="form-control" disabled placeholder="iso file name">
</div>
<button v-show="showIsoUpload" @click="uploadFile" :disabled="disableFileUploadButton" type="button" class="btn btn-success btn-block">
            <span class="glyphicon glyphicon-ok"></span>
        </button>
</div>
</template>

<script>
    import 'bootstrap';

    import StaticRequester from 'common-src/StaticRequester';

    export default {
        name: 'file-uploader',
        props: {
            baseUrl: {
                type: String,
                default: ""
            }
        },
        methods: {
            uploadFile: function () {
                var self = this;
                console.log('uploading file');
                var reader = new FileReader();

                let xhr = new XMLHttpRequest();
                let uploader = xhr.upload;

                let fileName = this.fileToUpload.name;
                let fileSize = this.fileToUpload.size;
                let blockSize = 1 * 1024 * 1024;
                let uploadedSize = 0;
                let uploadProgress = 0;

                uploader.addEventListener('progress', function (event) {
                    uploadedSize = event.loaded;
                    uploadProgress = event.loaded * 100/event.total;
                    console.log(uploadedSize, ' has been sent', 'progress: ', uploadProgress);
                });

                uploader.addEventListener('load', function () {
                    console.log('upload finished');
                    self.getIsos();
                });

                xhr.open("PUT", baseUrl + "/iso?name=" + fileName);
                xhr.overrideMimeType("application/octet-stream");
                xhr.send(self.fileToUpload);
            },
            fileSelected: function (event) {
                console.log('file selected', event);
                console.log('file selected', event.target.files);
                let files = event.target.files;

                if (files.length) {
                    let file = files[0];
                    let fileName = file.name;

                    if (fileName.indexOf('.iso') > 0) {
                        this.fileToUpload = file;
                        this.disableFileUploadButton = false;
                    } else {
                        alert("please choose iso file which end with \'.iso\'");
                        this.disaleFileUploadButton = true;
                    }
                } else {
                    this.disableFileUploadButton = true;
                }
            },
            toggleShowUploadIso: function () {
                this.showIsoUpload = !this.showIsoUpload
            }
        },
        data() {
            return {
                disableFileUploadButton: true,
                fileToUpload: {}
            }
        }
    }

</script>

<style scoped>
h3 {
    text-align: center
}

#file-browse {
    color: blue
}

button {
    text-align: center
}
    </style>