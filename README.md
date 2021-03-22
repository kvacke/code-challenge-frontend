# Doro Frontend Challenge: "Stock up!"

## Introduction

This project was my contribution to Doro's frontend challenge.  
The result is a React app hosted at https://doro-frontend.vercel.app

## The Challenge

To create a responsive, infinitely scrolling, lazy loading grid-view of images,  
fed by the photo api made available by Unsplash.com.  
An additional requirement was to show full-width view when an image is clicked and then offer additional image details  
and the ability to keep scrolling.

## My Solution

### Grid-view and infinite scrolling

In order to spend more time figuring out the _how_ instead of the _what_ I decided early on  
to try to imitate the neat masonry layout of the Unsplash feed.  
Once in place thanks to react-responsive-masonry and placeholder photos I read up on how the Intersection  
Observer API can be used to observe the viewport for any amount of a referenced element and used that  
along with a code snippet on how to handle observations along the Y coordinate to continuosly trigger a the photo API.

### Full-width view

I tinkered around with different ways of presenting the meta data of an image until settling  
on something similar to what's on Unsplash. In order to let the user scroll 'sideways', i.e. picture by  
picture in the full view I let the parent component (which holds the array of photos),  
simply hold the currently viewed image's index in their state and pass a function to the image viewer to increment  
or decrement it.

### Responsiveness

Thanks to react-responsive-masonry the column count changes based on intervals of window widths.  
For full-on mobile view I got rid of the masonry completely and opted for a more familiar instagrammy feed.  
Landscape view works fine but got less attention than portrait. It seems to okay however since most pictures
from Unsplash  
are taken in portrait mode.

### "Surprise us!"

To put a spin on what essentially became a clone of the Unsplash.com feed I decided to call EveryPixels  
stock photo-quality API with every picture and overlay the returned score along with a censoring black box on  
those which didn't make the cut. Unfortunately the EveryPixel API is limited at 100 requests per 24h so it doesn't  
take a lot of scrolling to deplete my quota. If the response contains an error (code 429 'Too many requests') a mock api  
is called instead with a random number above 50 to not clutter the UI with black boxes.

## APIs

### GET unsplash.com/photos

Given paramaters such as page number and an image count returns an array of image data and corresponding user data.

### GET everypixel.com/v1/quality_ugc

Given an image url parameter it returns a quality score.

Description of scoring from everypixel.com:

> User-Generated Photo Scoring is a model trained on a 347 000 of user photos from Instagram.  
> Estimation parameters for this model were prepared by a group of 10 professional photographers.  
> This model is designed to evaluate user photos taken both by a professional camera and by a camera of a smartphone.

## Noteable node packages

| Package                  |                  Description                  |
| ------------------------ | :-------------------------------------------: |
| react-responsive-masonry | Creates the responsive grid layout for images |
| everypixel.js            | Javascript queries against the EveryPixel API |
| react-responsive         |      Media queries for responsive layout      |
| Material UI Core         |      Loading spinner and modal component      |
| axios                    |              Makes HTTP requests              |
