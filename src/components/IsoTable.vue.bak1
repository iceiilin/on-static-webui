<template>
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title">{{ title }}</h3>
        </div>
        <ResourceTable :headerItems="isoKeys" :bodyItems="isos" @removeRow="removeIso">
        </ResourceTable>
        <button type="button" class="btn btn-success btn-block" @click="toggleShowUploadIso">
       <span class="glyphicon glyphicon-plus-sign"></span>
 </button>
        <!--<div v-show="showIsoUpload" class="input-group">
            <span class="input-group-addon">ISO File Name</span>
            <input type="text" class="form-control" placeholder="osname-version.iso">
        </div>-->
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

    import ResourceTable from './Table';

    import StaticRequester from 'common-src/StaticRequester';

    let baseUrl = 'http://10.62.59.150:7070'

    export default {
        name: 'IsoTable',
        props: {
            title: {
                type: String,
                default: "ISO File Management"
            }
        },
        mounted: function () {
            this.$ = new StaticRequester(baseUrl);

            this.getIsos();
        },
        components: {
            ResourceTable: ResourceTable
        },
        computed: {
            isoKeys: function () {
                if (this.isos.length === 0) {
                    return []
                } else {
                    return Object.keys(this.isos[0]);
                }
            }
        },
        methods: {
            getIsos: function () {
                var self = this;

                return self.$.getIsos()
                    .then((response) => {
                        console.log('Iso file list: ', response.data);
                        self.isos = response.data;
                        return response.data;
                    })
                    .catch((err) => {
                        console.log('Get ISO request failed: ', baseUrl)
                        console.log('err', err)
                    })
            },
            removeIso: function (id) {
                var self = this;
                console.log(id);
                console.log(this.isos[id]);
                let isoName = this.isos[id].name;

                return self.$.deleteIso(isoName)
                    .then(function () {
                        return self.getIsos();
                    })
            },
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
                isos: [],
                showIsoUpload: false,
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