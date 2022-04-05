# About
Open is a mobile platform for women+ and partners who are experiencing fertility challenges and who are looking for a supportive community.

## Key Features
1. Audio recording, so users can record their story they want to share
2. A feed showing other users and their stories
3. In-app messaging, for when users feel like they want to connect with someone 

### Future Features
1. Interactive map showing other active users, to show that no one is alone in this
2. A calendar to schedule events and group sessions
3. In-app video chatting 

### Tech Stack
Open is built with React Native and Expo for the front end design. We used the Firestore database from Firebase to store users’ information and messages for real-time updates. Users’ images and audio clips were sent to Cloudinary for efficient database storage management. Firebase authentication was used for sign up and log in functions. The chat feature was built by using React Native Gifted Chat and the audio recorder and player were built by using Expo Audio.

![intro](https://user-images.githubusercontent.com/81700027/161851712-ac85d63a-b6f2-479d-9b74-bde00275d0e7.png)

![open-app](https://user-images.githubusercontent.com/81700027/161848243-1b91441c-242e-477b-965d-4047193d3058.gif)

Boilerplate article for how we got started:
https://blog.jscrambler.com/how-to-integrate-firebase-authentication-with-an-expo-app

GitHub source code Boilerplate:
https://github.com/amandeepmittal/react-native-examples/tree/main/expo-firebase-auth-example

Installations to get started with this boilerplate:
1. npm install @react-navigation/native @react-navigation/stack
2. expo install firebase dotenv expo-constants react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
