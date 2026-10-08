#!/usr/bin/env bash
# Run one smoke test on a development site (tests create and delete their own data):
#   tests/smoke/run.sh tests/smoke/checkout.php
# WP_LOAD defaults to the wp-load.php four folders up (plugin inside wp-content/plugins/).
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WP_LOAD="${WP_LOAD:-$DIR/../../../../../wp-load.php}"
php -r '
define( "WP_USE_THEMES", false );
$_SERVER["HTTP_HOST"] = getenv( "WP_HOST" ) ?: "localhost";
require $argv[1];
wp_set_current_user( 1 );
require $argv[2];
require $argv[3];
' "$WP_LOAD" "$DIR/helpers.php" "$1"
