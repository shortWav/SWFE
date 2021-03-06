;( function (){

    "use strict";

    angular.module('App')
    .controller('RegisterCtrl', ['$scope', '$http', 'PARSE', 'UsersFactory', '$timeout', '$q', '$log', '$mdUtil','$mdSidenav', '$state', '$mdDialog',
      function ($scope, $http, PARSE, UsersFactory, $timeout, $q, $log, $mdUtil, $mdSidenav, $state, $mdDialog) {

        $scope.alert = '';
  $scope.showAlert = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.body))
        .title('Please read the Disclaimer')
        .content('shortWav disclaims any and all responsibility or liability for any harm resulting from your use of shortWav or any External Services.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };

        // nav toggles
      $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');


      function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
              $mdSidenav(navID)
                .toggle();
            },300);
        return debounceFn;
      }

        // Register Listener

        $scope.register = function(newListener){

          UsersFactory.registerListener(newListener);
        };

        // Register Artist
        $scope.artistRegister = function(newArtist){
            UsersFactory.registerArtist(newArtist);
        };

        $scope.authenticate = function(provider) {
          $auth.authenticate(provider);
        };

        $scope.startOauth = function(){
           UsersFactory.startOauth().success( function(){
            $state.go('register-artist');
           });
        };



        // State Selector
        $scope.userState = '';
        $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
            'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
            'WY').split(' ').map(function (state) { return { abbrev: state }; });

        var self = $scope;



        // Countries autocomplete stuff


            //--------------- \\

        self.countries = loadAll();
        self.selectedItem  = null;
        self.searchText    = null;
        self.querySearch   = querySearch;

         function querySearch (query) {
          var results = query ? self.countries.filter( createFilterFor(query) ) : [];
          return results;
        }

            function loadAll() {
                    /*jshint multistr: true */
              var allCountries = 'Afghanistan, Albania, Algeria, Andorra, Angola, Antigua Deps, \
                    Argentina, Armenia, Australia, Austria, Azerbaijan, Bahamas, Bahrain, Bangladesh, Barbados, Belarus, \
                    Belgium, Belize, Benin, Bhutan, Bolivia, Bosnia Herzegovina, Botswana, Brazil, Brunei, Bulgaria, Burkina, Burundi, Cambodia, \
                    Cameroon, Canada, Cape Verde, Central African Rep, Chad, Chile, China, Colombia, Comoros, Congo Democratic Rep, Costa Rica, Croatia, Cuba, \
                    Cyprus, Czech Republic, Denmark, Djibouti, Dominica, Dominican Republic, East Timor, Ecuador, Egypt, El Salvador, Equatorial Guinea, \
                    Eritrea, Estonia, Ethiopia, Fiji, Finland, \
                    France, \
                    Gabon, \
                    Gambia, \
                    Georgia, \
                    Germany, \
                    Ghana, \
                    Greece, \
                    Grenada, \
                    Guatemala, \
                    Guinea, \
                    Guinea-Bissau, \
                    Guyana, \
                    Haiti, \
                    Honduras, \
                    Hungary, \
                    Iceland, \
                    India, \
                    Indonesia, \
                    Iran, \
                    Iraq, \
                    Ireland, \
                    Israel, \
                    Italy, \
                    Ivory Coast, \
                    Jamaica, \
                    Japan, \
                    Jordan, \
                    Kazakhstan, \
                    Kenya, \
                    Kiribati, \
                    Korea South. \
                    Kosovo, \
                    Kuwait, \
                    Kyrgyzstan, \
                    Laos, \
                    Latvia, \
                    Lebanon, \
                    Lesotho, \
                    Liberia, \
                    Libya, \
                    Liechtenstein, \
                    Lithuania, \
                    Luxembourg, \
                    Macedonia, \
                    Madagascar, \
                    Malawi, \
                    Malaysia, \
                    Maldives, \
                    Mali, \
                    Malta, \
                    Marshall Islands, \
                    Mauritania, \
                    Mauritius, \
                    Mexico, \
                    Micronesia, \
                    Moldova, \
                    Monaco, \
                    Mongolia, \
                    Montenegro, \
                    Morocco, \
                    Mozambique, \
                    Myanmar{Burma}, \
                    Namibia, \
                    Nauru, \
                    Nepal, \
                    Netherlands, \
                    New Zealand, \
                    Nicaragua, \
                    Niger, \
                    Nigeria, \
                    Norway, \
                    Oman, \
                    Pakistan, \
                    Palau, \
                    Panama, \
                    Papua New Guinea, \
                    Paraguay, \
                    Peru, \
                    Philippines, \
                    Poland, \
                    Portugal, \
                    Qatar, \
                    Romania, \
                    Russian Federation, \
                    Rwanda, \
                    St Kitts & Nevis, \
                    St Lucia, \
                    Saint Vincent & the Grenadines, \
                    Samoa, \
                    San Marino, \
                    Sao Tome and Principe, \
                    Saudi Arabia, \
                    Senegal, \
                    Serbia, \
                    Seychelles, \
                    Sierra Leone, \
                    Singapore, \
                    Slovakia, \
                    Slovenia, \
                    Solomon Islands, \
                    Somalia, \
                    South Africa, \
                    South Sudan, \
                    Spain, \
                    Sri Lanka, \
                    Sudan, \
                    Suriname, \
                    Swaziland, \
                    Sweden, \
                    Switzerland, \
                    Syria, \
                    Taiwan, \
                    Tajikistan, \
                    Tanzania, \
                    Thailand, \
                    Togo, \
                    Tonga, \
                    Trinidad and Tobago, \
                    Tunisia, \
                    Turkey, \
                    Turkmenistan, \
                    Tuvalu, \
                    Uganda, \
                    Ukraine, \
                    United Arab Emirates, \
                    United Kingdom, \
                    United States, \
                    Uruguay, \
                    Uzbekistan, \
                    Vanuatu, \
                    Vatican City, \
                    Venezuela, Vietnam, Yemen, Zambia, Zimbabwe';
              return allCountries.split(/, +/g).map( function (country) {
                return {
                  value: country.toLowerCase(),
                  display: country
                };
              });
            }


            function createFilterFor(query) {
              var lowercaseQuery = angular.lowercase(query);
              return function filterFn(country) {
                return (country.value.indexOf(lowercaseQuery) === 0);
              };
            }



            // -------------------------------- \\


    }]);

}());
