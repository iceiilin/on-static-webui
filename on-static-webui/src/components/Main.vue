<template>
    <div class="container">
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <a class="navbar-brand" href="#" style="color: white">on-static web ui</a>
</nav>

<div class="row">
    <div class="col-md-12">
        <IsoTable title="Image Management">
        </IsoTable>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <IsoTable>
        </IsoTable>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <IsoTable title="Microkernel File Management">
        </IsoTable>
    </div>
</div>
</div>

</template>

<script>
    import { alert } from 'vue-strap';

    import IsoTable from './IsoTable';

    import StaticRequester from 'common-src/StaticRequester';

    import 'bootstrap';

    let baseUrl = 'http://10.62.59.150:7070'

    export default {
        name: 'main',
        components: {
            IsoTable: IsoTable,
            Alert: alert
        },
        methods: {
            getIsos: function () {
                var self = this;

                self.$ = new StaticRequester(baseUrl);

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
            }
        },
        mounted: function () {
            var self = this;
            self.getIsos();
            // setInterval(function(){
            //     self.getIsos();
            // }, 3000);
        },
        computed: {
            isoKeys: function () {
                console.log(this.isos);
                console.log(this.isos.length, typeof this.isos)
                if (this.isos.length === 0) {
                    return []
                } else {
                    return Object.keys(this.isos[0]);
                }
            }
        },
        data: function () {
            return {
                isos: [{ size: 100, name: 'test' }]
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    </style>