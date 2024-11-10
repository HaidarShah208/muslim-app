import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

class NotificationService {
  configure() {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      requestPermissions: Platform.OS === 'ios',
      popInitialNotification: true,
    });

    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'default-channel-id',
          channelName: 'Default Channel',
          channelDescription: 'A default channel',
          soundName: 'azan.mp3',
          importance: 4,
          vibrate: true,
        },
        created => console.log(`createChannel returned '${created}'`),
      );
    }
  }

  scheduleNotification(id, title, message, date) {
    PushNotification.localNotificationSchedule({
      id: parseInt(id),
      channelId: 'default-channel-id',
      title,
      message,
      soundName: 'azan.mp3',
      date,
      allowWhileIdle: true,
    });
  }

  cancelNotification(id) {
    PushNotification.cancelLocalNotification({id: id.toString()});
  }

  cancelAllNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }
}

export default new NotificationService();
