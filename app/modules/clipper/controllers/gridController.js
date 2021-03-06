angular
    .module('hash.clipper')
    .controller("gridController", function($scope, $http) { 

    var url = 'https://inep-hash-data-api-dev.herokuapp.com/articles';
    $scope.novidades= [];
    $http({
        url: url,
        method:'GET'
    })
    .then(function (response) {
        angular.extend($scope.novidades, response.data.data);
    },
    function (err) {
        console.log(err);
    });
    $scope.extractHostname = function (url) {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("://") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }

        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];

        return hostname;
    };

    $scope.filtering = function() {
        //pegando os valores pro filtro composto
        var pesquisa = document.getElementById("taggy").value
        var tempo = document.getElementById("selData").value;
        // var categoria = document.getElementById("selCat").value;
        // var produto = document.getElementById("selProd").value;
        // var conteudo = document.getElementById("selCont").value;
        // var alcance = document.getElementById("selAlc").value;
        // var regiao = document.getElementById("selReg").value;
        filterManager = createFilterManager($scope.novidades);

        //tratando cada valor obtido pra inserir um filtro
        if(tempo != 'undefined'){
            //pegar data atual no formato correto pra ser referência 
            dataFilter = {
                "attr":"dateCreated",
                "type":"data",
                "values":["2017-07-30T00:00:00.000000","2017-07-31T00:00:00.000000"],
                "operator":"between"
            };
            addFilter(filterManager,dataFilter);
        };
        if(pesquisa!='undefined'){
            textFilter = {
                "attr":"description",  
                "type":"text",
                "values":"educação",
                "operator":"contains"
            }
        addFilter(filterManager,textFilter);
        }
        // if(categoria!='undefined'){
        // };

        // if(produto!='undefined'){

        // };

        // if(conteudo!='undefined'){

        // };

        // if(alcance!='undefined'){

        // };

        // if(região!='undefined'){

        // };
        console.log(getData(filterManager).length);
        data = getData(filterManager);
    };
})
