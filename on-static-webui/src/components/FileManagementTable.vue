<template>
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title">{{ title }}</h3>
        </div>

        <ResourceTable :headerItems="fileKeys" :bodyItems="files" @removeRow="removeFile"></ResourceTable>

        <button type="button" class="btn btn-success btn-block" @click="clickAddFile">
            <span v-if="!showFileUpload" class="glyphicon glyphicon-plus-sign"></span>
            <span v-else class="glyphicon glyphicon-minus-sign"></span>
        </button>
        
        <FileUploader id="fileUpload" v-show="showFileUpload" :baseUrl="baseUrl" :fileUploadUrl="fileUploadUrl" :supportedFileTypes="supportedFileTypes" @finished="uploadFinished"></FileUploader>
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
            fileUploadUrl: {
                type: String,
                default: 'iso?name='
            },
            fileDeleteUrl: {
                type: String,
                default: 'iso?name='
            },
            fileListUrl: {
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

            this.getFiles();
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
            getFiles: function () {
                var self = this;

                return self.$.get(this.fileListUrl)
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
            removeFile: function (id) {
                var self = this;
                console.log(id);
                console.log(this.files[id]);
                let fileName = this.files[id].name;

                return self.$.delete(this.fileDeleteUrl + fileName)
                    .then(function () {
                        return self.getFiles();
                    })
            },
            uploadFinished: function () {
                this.getFiles();
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