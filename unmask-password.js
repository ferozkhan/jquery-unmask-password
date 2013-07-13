/*

The MIT License (MIT)

Copyright (c) 2013 Feroz Khan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function($){

    $.extend($.fn, {
        /**
         *      @method maskUnmaskPassword
         *      @param  options {Object}    Optional
         */
        maskUnmaskPassword: function( options ) {
            var $password_field = $( this );

            // updating pluging settings by merging default settings
            // with user settings.
            var settings = $.extend( true, {}, $.fn.maskUnmaskPassword.default_options, options );

            // applying plugin to input field.
            init($password_field, settings);

            // To fake a click on mask icon, since its a background, click position need
            // to be calculated. In the below line we can say 8 is mask icon width.
            $password_field.on( "click", function( evt ) {
                if( evt.offsetX > 205 ) {
                    $password_field.attr("type", function() {
                        var type = $password_field.attr("type") === "password" ? "text" : "password";
                        var mask = $password_field.attr("type") === "password" ? settings.lock_icon : settings.unlock_icon;
                        $password_field.css({
                            background: "url('" + mask +  "') no-repeat right center transparent"
                        });

                        return type;
                    });
                }
            });

            // Switching cursor style based on area it is moving inside
            // password field.
            $password_field.on( "mousemove", function( evt ) {
                $password_field.css( "cursor", evt.offsetX > 205 ? "pointer" : "inherit" );
            });
        }
    });

    /**
     * Plugin default settings
     **/
    $.fn.maskUnmaskPassword.default_options = {
        unlock_icon: "https://s3-ap-southeast-1.amazonaws.com/0images/open_eye.png",
        lock_icon: "https://s3-ap-southeast-1.amazonaws.com/0images/close_eye.png"
    };

    /**
     *      @method init
     *      @param  password_field  {Object}
     *      @param  settings    {Object}
     */
    function init( password_field, settings ) {
        password_field.css({
            background: "url('" + settings.unlock_icon + "') no-repeat right center transparent"
        });
    }

}(jQuery));
