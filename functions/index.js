const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendHairRequest = functions.database.ref('stylists/{uid}/notifications/requests/{pushId}/message').onWrite((change, context) => {
    var valueObject = change.after.val()

    console.log("value of pushid", context.params.pushId)
    

    const payload = {
        data: {
            type: "hairRequest"
        },
    }
    const options = {

    }

    return admin.messaging().sendToTopic("hairRequests", payload, options)
})

exports.sendReply = functions.database.ref('customers/{uid}/requests/{pushId}').onWrite((change, context) =>{
    var valueObject = change.after.val();

    const payload = {
        data: {
            type: valueObject.status.toString()
        }
    }

    const options = {

    }

    return admin.messaging().sendToTopic("hairRequestReplies", payload, options)
})
