const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.myFunction = functions.firestore
  .document('chat/{message}')
  .onCreate((snapshot, context) => {
    const { username, text } = snapshot.data();

    return admin.messaging().sendToTopic('chat', {
      notification: {
        title: username,
        body: text,
        clickAction: 'FLUTTER_NOTIFICATION_CLICK'
      }
    });
  });