using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class NotificationHub : Hub
    {
        public static List<string> NotificationList { get; set; } = new List<string>();

        // for new connection, send all notifications
        public List<string> GetNotifications()
        {
            return NotificationList;
        }

        // Only send the new notification
        public async Task NewNotification(string notification)
        {
            NotificationList.Add(notification);
            await Clients.All.SendAsync("updateNotification", notification);
                                        
        }
    }
}
