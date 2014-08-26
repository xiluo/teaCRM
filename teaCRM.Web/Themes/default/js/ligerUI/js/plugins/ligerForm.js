/**
* jQuery ligerUI 1.0.2
* 
* Author leoxie [ gd_star@163.com ] 
* 
*/

(function ($)
{
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Form = { 
        width: null
    };

    ///	<param name="$" type="jQuery"></param>
    $.fn.ligerForm = function (p)
    { 
        p = $.extend({}, $.ligerDefaults.Form, p || {});
        return this.each(function() {
            $("input[ltype=text],input[ltype=password]", this).ligerTextBox();

            $("input[ltype=select],select[ltype=select]", this).ligerComboBox();

            $("input[ltype=spinner]", this).ligerSpinner();

            $("input[ltype=date]", this).ligerDateEditor();

            $("input[ltype=radio]", this).ligerRadio();

            $('input[ltype=checkbox]', this).ligerCheckBox();
        });
    };

})(jQuery);