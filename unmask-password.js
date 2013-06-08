/*

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
         *  maskUnmaskPassword
         *  @param  
         *      options     a dictionary.        
         **/
        maskUnmaskPassword: function( options ) {
            var $password_field = $( this );
            
            // updating pluging settings by merging default settings
            // with user settings. 
            var settings = $.extend( true, {}, $.fn.maskUnmaskPassword.default, options );
            
            // applying plugin to input field.  
            init($password_field, settings);

            // To fake a click on mask icon, since its a background, click position need
            // to be calculated. In the below line we can say 8 is mask icon width.
            $password_field.on( "click", function( evt ) {
                var click_area = $password_field.width() - 8;
                if( evt.clientX > click_area ) {
                    $password_field.attr("type", function() {
                        var type = $password_field.attr("type") === "password" ? "text" : "password";
                        var mask = $password_field.attr("type") === "password" ? "close_eye.png" : "open_eye.png";
                        $password_field.css({
                            background: "url('" + settings.images_path + "/" + mask + "') no-repeat right center transparent"
                        });

                        return type;
                    });
                }
            });

            // Switching cursor style based on area it is moving inside
            // password field.
            $password_field.on( "mousemove", function( evt ) {
                var click_area = $password_field.width() - 8;
                $password_field.css( "cursor", evt.clientX > click_area ? "pointer" : "inherit" );
            });
        }
    });

    /**
     * Plugin default settings
     **/
    $.fn.maskUnmaskPassword.default = {
        help: false,
        help_text: "Click on eye to mask/unmask password",
        help_text_at: "bottom",
        help_text_cls: "help_text",
        images_path: "images"
    };

    /**
     * init
     * @param 
     *      obj         a dom object.
     *      settings    a dictionary.
     */
    function init( obj, settings ) {
        obj.css({
            background: "url('" + settings.images_path + "/open_eye.png') no-repeat right center transparent"
        });
        if( settings.help ) {
            settings.help_text = settings.help_text_at !== "bottom" ? settings.help_text : "<br>" + settings.help_text;
            obj.after( $( "<span>", {text: settings.help_text, class: settings.help_text_cls }));
        }
    }

}(jQuery));
