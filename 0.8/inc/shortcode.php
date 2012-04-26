<?php
/*
 * shortcode functions
 */

add_shortcode('show_svg_editor', 'show_svg_editor');

function show_svg_editor($attrs){
	echo 'the shortcode comes from here.';
}