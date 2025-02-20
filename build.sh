#!/bin/bash

path_to_tmonkey_script="tmonkey.js"

current_date=$(date +"%Y-%m-%d")

tsc

echo "// ==UserScript==
// @name         FaustCore
// @version      $current_date
// @description  Adds support for Faust mods
// @author       Faust
// @match        https://esonline.su/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==
" >$path_to_tmonkey_script

{
    echo "(function() {"
    cat ./dist/main.js
    echo ""
    echo "})();"
} >>$path_to_tmonkey_script

