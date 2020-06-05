/* @flow */
export const theme = {
  colors: {
    $white-1: white;
$white-2: darken(white, 2%);
$white-3: darken(white, 6%);
$white-4: darken(white, 10%);
$white-5: darken(white, 14%);
$white-6: darken(white, 18%);
$white-7: darken(white, 22%);
$white-8: darken(white, 26%);
$white-9: darken(white, 30%);

$gray-base: #545866;
$gray-1: lighten($gray-base, 20%);
$gray-2: lighten($gray-base, 15%);
$gray-3: lighten($gray-base, 10%);
$gray-4: lighten($gray-base, 5%);
$gray-5: $gray-base;
$gray-6: darken($gray-base, 5%);
$gray-7: darken($gray-base, 10%);
$gray-8: darken($gray-base, 15%);
$gray-9: darken($gray-base, 20%);

$brand-blue-light: #3a79c2;
$brand-blue: #2f619c;
$brand-orange: #ea6842;

$blue-light: lighten(#1da0f2, 15%);
$blue: #1da0f2;
$blue-dark: darken(#1da0f2, 15%);

$yellow-light: lighten(#ffdd66, 15%);
$yellow: #ffdd66;
$yellow-dark: darken(#ffdd66, 15%);

$green-light: lighten(#399c81, 15%);
$green: #399c81;
$green-dark: darken(#399c81, 15%);

$red: #e65835;
$red-light: lighten($red, 15%);
$red-dark: darken($red, 15%);

$pink: #ad3f95;

$purple: #544aa6;
$orange: #eeb457;
$aqua: #252525;
$slate: #737373;
$transparent-light: rgba(255, 255, 255, 0.2);

// Color Uses

$filter-node-background: $green;
$filter-node-foreground: $white-1;
$table-stripe-color: rgba(0, 0, 0, 0.02);
$table-stripe-hover: rgba(0, 0, 0, 0.06);

// Gradients

$chrome-gradient: linear-gradient(to bottom, #f0efee, #e6e5e4);
$gray-to-white: linear-gradient(#f0f0f0, white);
$chrome-border: $white-5;
}
}
