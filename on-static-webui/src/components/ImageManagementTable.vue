<template>
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title">{{ title }}</h3>
        </div>

        <ResourceTable :headerItems="fileKeys" :bodyItems="files" @removeRow="removeImage"></ResourceTable>

        <button type="button" class="btn btn-success btn-block" @click="clickAddFile">
            <span v-if="!showFileUpload" class="glyphicon glyphicon-plus-sign"></span>
            <span v-else class="glyphicon glyphicon-minus-sign"></span>
        </button>
        
        <div class="input-group">
            <label class="input-group-addon">
                name
            </label>
            <input class="form-control" type="text">
            <label class="input-group-addon">
                version
            </label>
            <input class="form-control" type="text">
            <label class="input-group-addon">
                source
            </label>
            <input class="form-control" type="text">
        </div>
        <FileUploader id="fileUpload" v-show="showFileUpload" :baseUrl="baseUrl" :imageUploadUrl="imageUploadUrl" :supportedFileTypes="supportedFileTypes" @finished="uploadFinished"></FileUploader>
    </div>
</template>

<script>
    import 'bootstrap';

    import ResourceTable from './Table';
    import FileUploader from './FileUploader';

    import Requester from 'common-src/Requester';


    export default {
        name: 'FileTable',
        props: {
            title: {
                type: String,
                default: "File Management"
            },
            supportedFileTypes: {
                type: Array,
                default: function(){
                    return ['*']
                }
            },
            baseUrl: {
                type: String,
                default: 'http://10.62.59.150:7070'
            },
            imageUploadUrl: {
                type: String,
                default: 'iso?name='
            },
            imageDeleteUrl: {
                type: String,
                default: 'iso?name='
            },
            imageListUrl: {
                type: String,
                default: 'iso'
            },
            supportedFiles: {
                type: Array,
                default: function(){
                    return ['.iso']
                }
            }
        },
        mounted: function () {
            this.$ = new Requester(this.baseUrl);

            this.getImages();
        },
        components: {
            ResourceTable: ResourceTable,
            FileUploader: FileUploader
        },
        computed: {
            fileKeys: function () {
                if (this.files.length === 0) {
                    return []
                } else {
                    return Object.keys(this.files[0]);
                }
            }
        },
        methods: {
            getImages: function () {
                var self = this;

                return self.$.get(this.imageListUrl)
                    .then((response) => {
                        console.log('file list: ', response.data);
                        self.files = response.data;
                        return response.data;
                    })
                    .catch((err) => {
                        console.log('Get file request failed: ', this.baseUrl)
                        console.log('err', err)
                    })
            },
            removeImage: function (id) {
                var self = this;
                console.log(id);
                console.log(this.files[id]);
                let fileName = this.files[id].name;

                return self.$.delete(this.imageDeleteUrl + fileName)
                    .then(function () {
                        return self.getImages();
                    })
            },
            uploadFinished: function () {
                this.getImages();
            },
            clickAddFile: function () {
                this.showFileUpload = !this.showFileUpload
            }
        },
        data() {
            return {
                files: [],
                showFileUpload: false,
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
