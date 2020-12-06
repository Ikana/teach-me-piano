# Teach-me-piano

## Objective

![](assets/200.gif)

Even before the pandemic, I wanted to learn how to play the piano. Then we were all stuck inside our house, and as to pass the time, I started to learn how to do machine learning to combine my two newfound hobbies and use previous programming knowledge. 

## Learning Objectives

1. Learn how to use the raspberry PyCamera
1. Learn to use Jupyter
1. Learn to use Pytorch

## Steps

### App for capturing images for classifier 

1. Create a server for image clasifier
    * Expose the camera as a stream
    * Create an API to save a camera pic
1. Create client
    * Expose the stream and display it in the client
    * Execute the API creation endpoint
1. Capture 1000 images per note

### Train clasifier

1. Use pytorch to create clasifier
1. Package clasifer for REST

### App for exposing classifier

1. Create stream and expose it to the client
1. Create client to take image and compare it to the classifier
