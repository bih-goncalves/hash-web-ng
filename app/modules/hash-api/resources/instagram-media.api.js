(function () {
  'use strict';

  angular
    .module('hash.api')
    .factory('InstagramMedia', function($resource, HASH_API_BASE_URI) {

      return $resource('', null, {
        count: {
          method: 'GET', 
          url:  HASH_API_BASE_URI + '/instagram/medias/count', 
          params: { 
            'period': null, // String
            'period[since]': null, // Date ISO String
            'period[until]': null, // Date ISO String
            'filter[with_tags]': [], // Array of String
            'filter[contain_tags]': [], // Array of String
            'filter[hashtags]': [], // Array of String
            'filter[users]': [], // Array of String 
            'filter[mentions]': [], // Array of String
            'filter[types]': [], // Array of String
            'last': null // Number
          },
          cache: true
        }
      });

    });

})();