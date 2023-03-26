# Chat App

This is a simple chat application built using React and Firebase.
This app is hosted on Firebase. You can access it at [here](https://react-chat-app-17a59.web.app).

## Features

- User authentication with Firebase Auth
- Real-time chat with Firebase Cloud Firestore
- Display list of friends with their profile picture, name and last message
- Select a friend to start a chat with

## Installation

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Create a Firebase project and enable the Cloud Firestore and Authentication services.
4. In the Firebase console, go to Project Settings > General and copy the Firebase SDK snippet for Web.
5. In the `src/firebase.js` file, replace the `apiKey`, `authDomain`, `projectId` and `storageBucket` values with the corresponding values from the Firebase SDK snippet.
6. Run the app using `npm start`.

## Usage

1. Sign up or log in with your Google account.
2. On the home page, you can see a list of your friends with their profile picture, name and last message.
3. Click on a friend to start a chat with them.
4. Type a message in the input field and press Enter or click the Send button to send the message.
5. You can see the chat history with the selected friend in the chat area.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions or improvements.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Demo

You can see a live demo of the app [here](https://youtu.be/e7L6wH7wBS8).

## Acknowledgements

This project was built with the help of the following resources:

- [React documentation](https://reactjs.org/docs/getting-started.html)
- [Firebase documentation](https://firebase.google.com/docs)
- [React Context API tutorial](https://www.smashingmagazine.com/2020/01/introduction-react-context-api)
- [ESLint documentation](https://eslint.org/docs/user-guide/getting-started)

## Additional Information

This project was created by [Revanth](https://github.com/revanth-03). You can contact me at [email](revanthsrinivaslu03@gmail.com).
